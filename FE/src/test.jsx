import { useState } from "react";

const Test = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUpload = () => {
        // Xử lý logic upload ảnh ở đây, ví dụ gửi dữ liệu đến API hoặc xử lý trên client-side
        console.log('Image uploaded:', image);
        // Reset state sau khi upload thành công (nếu cần)
        setImage(null);
    };

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">Admin Upload Ảnh</h1>
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4"
                />
                {image && (
                    <div className="mb-4">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded"
                            className="w-full rounded-lg"
                        />
                    </div>
                )}
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={!image}
                >
                    Upload Ảnh
                </button>
            </div>
        </div>
    );
};

export default Test;
