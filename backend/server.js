import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import passwordRoutes from "./routes/Password.js"; // import route file
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = "owaisAli2736"; // use a random string here

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

//  Login route (main file me rehne do)
app.post("/login", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    //Check if user exists
    let user = await collection2.findOne({ email });

    if (!user) {
      // Encrypt password before saving
      const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

      user = { userName, email, password: hashedPassword };
      await collection2.insertOne(user);
    } else {
      // Compare password if user exists
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }
    }

    //  Generate JWT token
    const payload = { userName, email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    await collection2.updateOne({ email }, { $set: { token } });

    res.json({ success: true, message: "Login successful!", token });
  } catch (err) {
    console.error(" Error:", err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

//Mount your password routes
app.use("/password", passwordRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
