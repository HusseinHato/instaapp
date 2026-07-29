import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import CreatePost from '@/Components/CreatePost';
import PostCard from '@/Components/PostCard';

export default function Dashboard({ auth, posts }) {
    // Menangkap pesan sukses dari Controller (jika ada)
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">InstaApp Feed</h2>}
        >
            <Head title="Feed" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Alert Pesan Sukses */}
                    {flash?.message && (
                        <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-sm font-semibold">
                            {flash.message}
                        </div>
                    )}

                    {/* Form Upload */}
                    <CreatePost />

                    {/* Looping Postingan */}
                    <div>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <PostCard key={post.id} post={post} auth={auth} />
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-10 bg-white rounded-lg border border-gray-200">
                                Belum ada postingan. Jadilah yang pertama!
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}