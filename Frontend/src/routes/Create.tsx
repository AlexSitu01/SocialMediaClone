import { Navbar } from "../components/Navbar";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../lib/firebase/database";

export function Create() {
    const [imageFile, setImageFile] = useState<Blob| undefined>();
    const [imageFileString, setImageFileString] = useState<string>("")
    const [description, setDescription] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigate();

    const handleSubmit = async () => {
        if (!imageFile || !description.trim()) {
            alert("Please upload an image and write a description.");
            return;
        }

        setIsLoading(true);

        try {
            // sends post request to backend
            console.log("Trying")
            await createPost(imageFile, description);


            // Navigate after submission
            navigation("/profile");
        } catch (error) {
            console.error("Error submitting post:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // need to change this to save imageFile as Blob data
    const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {   
            const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setImageFileString(base64String);
                }
                reader.readAsDataURL(file)
                setImageFile(file);
            } catch (error) {
                console.error("Error while compressing the image:", error);
            }
        }
    };

    return (
        <div className="p-4">
            <Navbar />
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center space-y-4 w-[40%] h-[90%] bg-gradient-to-tr from-indigo-200 to-red-200 rounded-3xl p-6">
                    <div className="text-lg font-semibold">Create a Post</div>

                    {imageFile && (
                        <img className="w-[320px] h-[320px] object-cover" src={imageFileString} alt="Uploaded preview" />
                    )}

                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleImageInput}
                        accept="image/*"
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer px-4 py-2 bg-blue-200 hover:bg-blue-300 transition-colors rounded-2xl"
                    >
                        {imageFile ? "Change Image" : "Upload Image"}
                    </label>

                    <textarea
                        placeholder="Write a description..."
                        className="w-full h-32 p-2 rounded-xl resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Posting..." : "Submit Post"}
                    </button>
                </div>
            </div>
        </div>
    );
}
