import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal'; // Bawaan Breeze
import DangerButton from '@/Components/DangerButton'; // Bawaan Breeze
import SecondaryButton from '@/Components/SecondaryButton'; // Bawaan Breeze

export default function PostCard({ post, auth }) {
    const { data, setData, post: postComment, reset, processing } = useForm({
        body: '',
    });

    const isGuest = !auth?.user;

    const [confirmingPostDeletion, setConfirmingPostDeletion] = useState(false);

    const [commentToDelete, setCommentToDelete] = useState(null);

    // Handle Like Toggle
    const toggleLike = () => {
        if (isGuest) return router.get(route('login'));
        router.post(route('posts.like', post.id), {}, { preserveScroll: true });
    };

    // Handle Delete Post
    const deletePost = () => {
        router.delete(route('posts.destroy', post.id), {
            preserveScroll: true,
            onSuccess: () => setConfirmingPostDeletion(false),
        });
    };

    // Handle Add Comment
    const submitComment = (e) => {
        e.preventDefault();
        if (isGuest) return router.get(route('login'));

        postComment(route('comments.store', post.id), {
            preserveScroll: true,
            onSuccess: () => reset('body'),
        });
    };

    // hapus komentar dari Modal
    const executeDeleteComment = () => {
        if (!commentToDelete) return;

        router.delete(route('comments.destroy', commentToDelete), {
            preserveScroll: true,
            onSuccess: () => setCommentToDelete(null),
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden transition-colors duration-200">
            <div className="p-4 flex items-center justify-between">
                <div className="font-bold text-gray-800 dark:text-gray-200">{post.user.name}</div>
                {post.can_delete && (
                    <button onClick={() => setConfirmingPostDeletion(true)} className="text-red-500 text-sm font-semibold hover:underline">
                        Delete Post
                    </button>
                )}
            </div>

            <Modal show={confirmingPostDeletion} onClose={() => setConfirmingPostDeletion(false)}>
                <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure to delete this post?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Deleted posts cannot be restored.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setConfirmingPostDeletion(false)}>Cancel</SecondaryButton>
                        <DangerButton onClick={deletePost}>Delete Post</DangerButton>
                    </div>
                </div>
            </Modal>

            <Modal show={commentToDelete !== null} onClose={() => setCommentToDelete(null)}>
                <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure to delete this comment?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Deleted comments cannot be restored.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setCommentToDelete(null)}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton onClick={executeDeleteComment}>
                            Delete Comment
                        </DangerButton>
                    </div>
                </div>
            </Modal>

            {/* Image */}
            <img src={post.image_url} alt="Post Image" className="w-full object-cover max-h-[600px]" />

            {/* Actions: Like */}
            <div className="p-4 pb-2">
                <button onClick={toggleLike} className="flex items-center space-x-1 focus:outline-none">
                    <svg className={`w-7 h-7 ${post.is_liked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{post.likes_count} Likes</span>
                </button>
            </div>

            {/* Caption */}
            <div className="px-4 pb-2">
                <span className="font-bold mr-2 text-gray-900 dark:text-gray-100">{post.user.name}</span>
                <span className="text-gray-800 dark:text-gray-200">{post.caption}</span>
                <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">{post.created_at}</div>
            </div>

            {/* Comments Section */}
            <div className="px-4 pb-4">
                {post.comments.length > 0 && (
                    <div className="mt-2 space-y-1">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="text-sm flex justify-between group">
                                <div className="text-gray-800 dark:text-gray-200">
                                    <span className="font-bold mr-2 text-gray-900 dark:text-gray-100">{comment.user.name}</span>
                                    <span>{comment.body}</span>
                                </div>
                                {(auth.user && (comment.user_id === auth.user.id || post.can_delete)) && (
                                    <button
                                        onClick={() => setCommentToDelete(comment.id)}
                                        className="text-red-400 text-xs hidden group-hover:block hover:text-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Comment Form */}
            <form onSubmit={submitComment} className="border-t border-gray-100 dark:border-gray-700 p-3 flex">
                <input
                    type="text"
                    className="flex-1 border-none focus:ring-0 text-sm bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-50 dark:disabled:bg-gray-900"
                    placeholder={processing ? "Sending..." : "Add comment..."}
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                    disabled={processing} // Disable input saat loading
                />
                <button
                    type="submit"
                    disabled={!data.body || processing}
                    className={`font-semibold text-sm transition ${!data.body || processing ? 'text-blue-300 dark:text-blue-700 cursor-not-allowed' : 'text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'}`}
                >
                    Send
                </button>
            </form>
        </div>
    );
}