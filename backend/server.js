import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import passwordRoutes from "./routes/Password.js"; // ✅ import route file

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (for other collections if needed)
const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);
await client.connect();

const dbName = "passwordManager";
const db = client.db(dbName);
const collection2 = db.collection("loginUser");

const port = 3005;

// 🧠 Login route (main file me rehne do)
app.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const result = await collection2.insertOne(data);
    res.json({ success: true, result });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ success: false, error: "Failed to save user" });
  }
});

// ✅ Mount your password routes
app.use("/password", passwordRoutes);

// 🟢 Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
