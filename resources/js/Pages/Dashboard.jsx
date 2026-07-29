import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PostCard from '@/Components/PostCard';

export default function Dashboard({ auth, posts }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">

                    {/* Header Profil */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 flex items-center gap-4 transition-colors duration-200">
                        <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{auth.user.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{posts.length} Post</p>
                        </div>
                    </div>

                    <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-4">Your Post</h4>

                    {/* Looping Hanya Postingan User */}
                    <div>
                        {posts.length > 0 ? (
                            posts.map((post) => <PostCard key={post.id} post={post} auth={auth} />)
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                You don't have any post.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}