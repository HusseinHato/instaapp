import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function CreatePost() {
    const fileInputRef = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        caption: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // preserveScroll agar layar tidak melompat ke atas setelah upload
        post(route('posts.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                fileInputRef.current.value = null; // Reset input file
            },
        });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <form onSubmit={submit} encType="multipart/form-data">
                <div className="mb-4">
                    <textarea
                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        rows="3"
                        placeholder="Apa yang sedang kamu pikirkan?"
                        value={data.caption}
                        onChange={(e) => setData('caption', e.target.value)}
                    ></textarea>
                    {errors.caption && <div className="text-red-500 text-sm mt-1">{errors.caption}</div>}
                </div>

                <div className="flex items-center justify-between">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        accept="image/jpeg, image/png, image/webp"
                        onChange={(e) => setData('image', e.target.files[0])}
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold text-sm disabled:opacity-50"
                    >
                        {processing ? 'Posting...' : 'Post'}
                    </button>
                </div>
                {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
            </form>
        </div>
    );
}