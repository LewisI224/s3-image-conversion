import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>S3 Image Conversion Test App</h1>
      <a href="/upload-image">Upload Image</a>
      <a>See All Images</a>
      <a>Edit Image</a>
      <a>Delete Image</a>
    </div>
  );
}
