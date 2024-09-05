import express from "express";
import env from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowingRoutes from "./routes/borrowingRoutes.js";
import reportRoutes from "./routes/reportRotes.js";
import { connectDB } from "./config/dbConfig.js";
import { errorHandler } from "./middleware/errorHandling.js";
import { auth } from "./middleware/authMiddleware.js";
const app = express();
env.config();

app.use(express.json());
connectDB();

app.use("/", authRoutes);
app.use(auth);
app.use("/books", bookRoutes);
app.use("/borrowing", borrowingRoutes);
app.use("/Reports", reportRoutes);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log("server is running");
});
