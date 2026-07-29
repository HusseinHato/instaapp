import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function CreatePost() {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        caption: '',
        image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setData('image', null);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                handleRemoveImage();
            },
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <form onSubmit={submit} encType="multipart/form-data">
                {/* Caption Input */}
                <div className="mb-3">
                    <textarea
                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-3 text-sm text-gray-800 placeholder-gray-400 resize-none"
                        rows="3"
                        placeholder="What are you thinking now?"
                        value={data.caption}
                        onChange={(e) => setData('caption', e.target.value)}
                    ></textarea>
                    {errors.caption && (
                        <div className="text-red-500 text-sm mt-1">{errors.caption}</div>
                    )}
                </div>

                {/* Image Preview Box */}
                {imagePreview && (
                    <div className="relative mb-3 rounded-lg overflow-hidden border border-gray-200">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full object-cover max-h-[600px]"
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-gray-800/80 hover:bg-gray-900 text-white rounded-full p-1 text-xs transition"
                            title="Remove photo"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleImageChange}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center space-x-1.5 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{imagePreview ? 'Change Photo' : 'Upload Image'}</span>
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={processing || (!data.caption && !data.image)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Posting...' : 'Post'}
                    </button>
                </div>

                {errors.image && (
                    <div className="text-red-500 text-sm mt-2">{errors.image}</div>
                )}
            </form>
        </div>
    );
}