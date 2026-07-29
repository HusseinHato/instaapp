<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{
    //
    /**
     * Menambahkan komentar baru ke postingan
     */
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'body' => 'required|string|max:500',
        ]);

        $post->comments()->create([
            'user_id' => auth()->id(),
            'body' => $request->body,
        ]);

        return back();
    }

    /**
     * Menghapus komentar (Dengan Pengecekan Hak Akses)
     */
    public function destroy(Comment $comment)
    {
        $isCommentOwner = $comment->user_id === auth()->id();
        $isPostOwner = $comment->post->user_id === auth()->id();

        if (!$isCommentOwner && !$isPostOwner) {
            abort(403, 'Anda tidak memiliki hak akses untuk menghapus komentar ini.');
        }

        $comment->delete();

        return back();
    }
}
