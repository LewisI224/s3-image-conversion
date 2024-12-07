'use client'
import { useEffect, useState } from "react";

export default function ListImages() {
    const [images, setImages] = useState<any>([])

    async function fetchImages() {

        const data = await fetch("/api/get-all-images")
        const json = await data.json()
        console.log(json)
        setImages(json)
    }


    useEffect(() => {
        fetchImages()
    }, [])

  return (
    <div>
        <h1>Images</h1>
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {images.map((image: any) => (
                    <tr key={image}>
                        <td>{image.Key}</td>
                        <td>{image.LastModified}</td>
                        <td>{image.Size}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}
