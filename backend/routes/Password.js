import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const router = express.Router();

// MongoDB Connection
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
await client.connect();

const dbName = "passwordManager";
const db = client.db(dbName);
const collection = db.collection("passwords");

// 🧩 GET all passwords
router.get("/getPassword", async (req, res) => {
  try {
    const findResult = await collection.find({}).toArray();
    res.json(findResult || []);
  } catch (err) {
    console.error("❌ Error fetching passwords:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🪄 POST - Save password
router.post("/save-password", async (req, res) => {
  try {
    const password = req.body;

    const result = await collection.insertOne(password);
    res.json({ success: true, result });
  } catch (err) {
    console.error("❌ Error saving password:", err);
    res.status(500).json({ success: false, error: "Failed to save password" });
  }
});

// 🗑 DELETE - Remove password by _id
router.delete("/deletePassword", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await collection.deleteOne({ id });
    res.json({ success: true, result });
  } catch (err) {
    console.error("❌ Error deleting password:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete password" });
  }
});

export default router;
