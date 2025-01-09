'use client'
import { useEffect, useState } from "react";

export default function ListImages() {
    const [images, setImages] = useState<any>([])

    async function fetchImages() {
        const data = await fetch("/api/get-all-images")
        const json = await data.json()
        setImages(json)
    }

    async function deleteImage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData()
        formData.append("key", ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value)
        await fetch("/api/delete-image", {
            method: "POST",
            body: formData
        })
    }

    useEffect(() => {
        fetchImages()
    }, [])

  return (
    <div>
        <h1>Images</h1>
        {images.map((image: any, index: number) => (
            <form key={image.Key} onSubmit={deleteImage}>
                <label>Image {index+1}</label>
                <input defaultValue={image.Key} disabled></input>
                <input defaultValue={image.Size} disabled></input>
                <input defaultValue={image.LastModified} disabled></input>
                <button type="submit">Delete</button>
            </form>
        ))}
    </div>
  );
}
