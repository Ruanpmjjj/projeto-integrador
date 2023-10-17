const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export function uploadImage(imageUploaded) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUploaded,
      { width: 1360, height: 768, crop: "fill" },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
}