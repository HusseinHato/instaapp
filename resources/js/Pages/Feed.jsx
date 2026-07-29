import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CreatePost from '@/Components/CreatePost';
import PostCard from '@/Components/PostCard';

export default function Feed({ auth, posts }) {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">Feed</h2>}>
            <Head title="Feed" />

            {visible && (
                <div className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-3 rounded shadow-lg z-50 flex gap-2 text-sm">
                    {flash.message}
                </div>
            )}

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    {auth.user && <CreatePost />}

                    <div>
                        {posts.length > 0 ? (
                            posts.map((post) => <PostCard key={post.id} post={post} auth={auth} />)
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                There is no post.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}