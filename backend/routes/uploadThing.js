import { createUploadthing } from "uploadthing/express";
import File from "../models/fileModel.js";
import express from "express";

const f = createUploadthing();
const router = express.Router();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
    "application/pdf": {
      maxFileCount: 2,
      maxFileSize: "10MB",
    },
    "model/vnd.dwf": {
      maxFileCount: 4,
      maxFileSize: "20MB",
    },
    "image/vnd.dwg": {
      maxFileCount: 4,
      maxFileSize: "20MB",
    },
    blob: {
      maxFileCount: 4,
      maxFileSize: "20MB",
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data.file);
    // File.insertMany([
    //   data.file,
    //   (err, res) => {
    //     if (err) return handleError(err);
    //     else return console.log("Result: dONE", res);
    //   },
    // ]);
    const fileData = new File(data.file);

    fileData.save();
  }),
};
