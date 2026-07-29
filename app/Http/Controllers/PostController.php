<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    //
    /**
     * Menampilkan feed postingan
     */
    public function index()
    {
        $posts = Post::with(['user:id,name', 'likes', 'comments.user:id,name'])
            ->withCount(['likes', 'comments'])
            ->latest()
            ->get()
            ->map(function ($post) {
                return $this->formatPost($post);
            });

        return Inertia::render('Feed', [
            'posts' => $posts
        ]);
    }

    public function dashboard()
    {
        $posts = Post::with(['user:id,name', 'likes', 'comments.user:id,name'])
            ->where('user_id', auth()->id())
            ->withCount(['likes', 'comments'])
            ->latest()
            ->get()
            ->map(function ($post) {
                return $this->formatPost($post);
            });

        return Inertia::render('Dashboard', [
            'posts' => $posts
        ]);
    }

    /**
     * Menyimpan postingan baru (Gambar + Text)
     */
    public function store(Request $request)
    {
        $request->validate([
            'caption' => 'required|string|max:1000',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048', // Max 2MB
        ]);

        $path = $request->file('image')->store('posts', 'public');

        $request->user()->posts()->create([
            'caption' => $request->caption,
            'image_path' => $path,
        ]);

        return back()->with('message', 'Postingan berhasil dibuat!');
    }

    /**
     * Menghapus postingan (Dengan Pengecekan Hak Akses)
     */
    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            abort(403, 'Anda tidak memiliki hak akses untuk menghapus post ini.');
        }

        if (Storage::disk('public')->exists($post->image_path)) {
            Storage::disk('public')->delete($post->image_path);
        }

        $post->delete();

        return back()->with('message', 'Postingan berhasil dihapus!');
    }

    private function formatPost($post)
    {
        $isLoggedIn = auth()->check();
        $userId = $isLoggedIn ? auth()->id() : null;

        return [
            'id' => $post->id,
            'caption' => $post->caption,
            'image_url' => asset('storage/' . $post->image_path),
            'created_at' => $post->created_at->diffForHumans(),
            'user' => $post->user,
            'likes_count' => $post->likes_count,
            'comments_count' => $post->comments_count,
            'comments' => $post->comments,
            'is_liked' => $isLoggedIn ? $post->likes->contains('user_id', $userId) : false,
            'can_delete' => $isLoggedIn ? $post->user_id === $userId : false,
        ];
    }
}
