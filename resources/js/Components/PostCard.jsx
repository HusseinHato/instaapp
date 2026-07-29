import { useForm, router } from '@inertiajs/react';

export default function PostCard({ post, auth }) {
    const { data, setData, post: postComment, reset, processing } = useForm({
        body: '',
    });

    // Handle Like Toggle
    const toggleLike = () => {
        router.post(route('posts.like', post.id), {}, { preserveScroll: true });
    };

    // Handle Delete Post
    const deletePost = () => {
        if (confirm('Yakin ingin menghapus postingan ini?')) {
            router.delete(route('posts.destroy', post.id), { preserveScroll: true });
        }
    };

    // Handle Add Comment
    const submitComment = (e) => {
        e.preventDefault();
        postComment(route('comments.store', post.id), {
            preserveScroll: true,
            onSuccess: () => reset('body'),
        });
    };

    // Handle Delete Comment
    const deleteComment = (commentId) => {
        if (confirm('Hapus komentar ini?')) {
            router.delete(route('comments.destroy', commentId), { preserveScroll: true });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
            {/* Header: User & Delete Button */}
            <div className="p-4 flex items-center justify-between">
                <div className="font-bold text-gray-800">{post.user.name}</div>
                {post.can_delete && (
                    <button onClick={deletePost} className="text-red-500 text-sm font-semibold hover:underline">
                        Hapus Post
                    </button>
                )}
            </div>

            {/* Image */}
            <img src={post.image_url} alt="Post Image" className="w-full object-cover max-h-[600px]" />

            {/* Actions: Like */}
            <div className="p-4 pb-2">
                <button onClick={toggleLike} className="flex items-center space-x-1 focus:outline-none">
                    <svg className={`w-7 h-7 ${post.is_liked ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span className="font-semibold text-gray-700">{post.likes_count} Likes</span>
                </button>
            </div>

            {/* Caption */}
            <div className="px-4 pb-2">
                <span className="font-bold mr-2">{post.user.name}</span>
                <span className="text-gray-800">{post.caption}</span>
                <div className="text-gray-400 text-xs mt-1">{post.created_at}</div>
            </div>

            {/* Comments Section */}
            <div className="px-4 pb-4">
                {post.comments.length > 0 && (
                    <div className="mt-2 space-y-1">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="text-sm flex justify-between group">
                                <div>
                                    <span className="font-bold mr-2">{comment.user.name}</span>
                                    <span>{comment.body}</span>
                                </div>
                                {/* Hak akses hapus komentar: Pemilik komentar atau pemilik post */}
                                {(comment.user_id === auth.user.id || post.can_delete) && (
                                    <button onClick={() => deleteComment(comment.id)} className="text-red-400 text-xs hidden group-hover:block">
                                        Hapus
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Comment Form */}
            <form onSubmit={submitComment} className="border-t border-gray-100 p-3 flex">
                <input
                    type="text"
                    className="flex-1 border-none focus:ring-0 text-sm"
                    placeholder="Tambahkan komentar..."
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                />
                <button type="submit" disabled={!data.body || processing} className="text-indigo-600 font-semibold text-sm disabled:opacity-50">
                    Kirim
                </button>
            </form>
        </div>
    );
}