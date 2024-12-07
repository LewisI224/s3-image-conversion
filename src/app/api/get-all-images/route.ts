import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { IMAGES_FOLDER } from "../../../../constants";

function getEnvs() {
    const S3_REGION = process.env.S3_REGION
    const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY
    const S3_SECRET_KEY = process.env.S3_SECRET_KEY
    const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
    if (!S3_REGION || !S3_ACCESS_KEY || !S3_SECRET_KEY || !S3_BUCKET_NAME) {
        throw new Error("Missing AWS_REGION, S3_ACCESS_KEY, or S3_SECRET_KEY or S3_BUCKET_NAME in environment variables")
    }
    return { S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME }
}

const env = getEnvs();
const s3Client = new S3Client({
    region: env.S3_REGION,
    credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_KEY
    }
})

export async function GET(request: Request) {
    try {
        const data = await s3Client.send(new ListObjectsCommand({
            Bucket: env.S3_BUCKET_NAME
        }))
        if(data.Contents) {
            const filter = new RegExp(IMAGES_FOLDER + "[^ ]")
            const images = data.Contents.filter((element: any) => filter.test(element.Key))
            return NextResponse.json(images)

        } else {
            throw new Error("No images found")
        }

    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Internal Server Error"}, { status: 500 })
    }

}