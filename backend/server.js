import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();

const port = process.env.PORT || 5000;
connectDb();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Api running on port ${port}`);
});
