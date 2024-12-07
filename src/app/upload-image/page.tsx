'use client'
import { useState } from "react";

export default function UploadImage() {
    const [file, setFile] = useState<any>(null)
    const [uploading, setUploading] = useState(false)

    async function uploadToS3(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!file) {
            return
        }
        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)
        try {
            const response = await fetch("/api/upload-image", {
                method: "POST",
                body: formData
            })
            const data = await response.json()
            console.log(data.status)
            setUploading(false)
    
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setFile(file)
        }
    }
  return (
    <div>
        <form onSubmit={uploadToS3}>
            <h2>Upload Image</h2>
            <label htmlFor="file">Choose an image</label>
            <input type="file" id="file" name="file" onChange={handleFileChange} />
            <button type="submit" disabled={!file || uploading}>{uploading ? "Uploading..." : "Upload"}</button>
        </form>
    </div>
  );
}
