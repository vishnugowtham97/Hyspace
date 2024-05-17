// components/FileUpload.js
import React, { useState } from "react";
import { useS3Upload } from "next-s3-upload";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { uploadToS3 } = useS3Upload();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = async () => {
    let { url } = await uploadToS3(file);
    console.log(url);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
