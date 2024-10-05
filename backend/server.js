import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import s3Router from "./routes/s3.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./routes/uploadThing.js";
import filesRouter from "./routes/getFiles.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: "*",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type"],
  })
);

app.use("/api/users", userRoutes);
app.use(
  "/api/upload",
  createRouteHandler({
    router: uploadRouter,
    config: { logLevel: "debug", isDev: true, },
  })
);
 
app.use("/api/files", filesRouter);
// app.use('/api/files', s3Router);

app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`Server is running on port ${port}`));
