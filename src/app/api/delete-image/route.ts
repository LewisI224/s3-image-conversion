import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";


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

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const key = formData.get("key") as string
        if (!key) {
            return NextResponse.json({error: "No key found in form data"}, { status: 400 })
        }
        console.log(key)
        const tagObjectCommand = new PutObjectCommand({
            Bucket: env.S3_BUCKET_NAME,
            Key: key,
            Tagging: "deleted"
        })
        await s3Client.send(tagObjectCommand)
        return NextResponse.json({message: "File tagged successfully"})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Internal Server Error"}, { status: 500 })
    };
}