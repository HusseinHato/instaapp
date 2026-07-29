<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Like;

class LikeController extends Controller
{
    //
    /**
     * Toggle Like / Unlike
     */
    public function toggle(Post $post)
    {
        $userId = auth()->id();

        $existingLike = Like::where('user_id', $userId)
            ->where('post_id', $post->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            Like::create([
                'user_id' => $userId,
                'post_id' => $post->id,
            ]);
        }

        return back();
    }
}
