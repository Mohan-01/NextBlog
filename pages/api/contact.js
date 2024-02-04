import { connectDatabase } from "../../lib/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !name.trim() ||
      !message ||
      !message.trim()
    ) {
      return res.status(422).json({ message: "Invalid input." });
    }

    const newMessage = {
      name,
      email,
      message,
    };

    let client;

    try {
      client = await connectDatabase();
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Could not connect to database." });
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage._id = result.insertedId;
    } catch (e) {
      return res.status(500).json({ message: "Could not insert data." });
    } finally {
      client.close();
    }

    res.status(201).json({ message: newMessage });
  }
}

export default handler;
