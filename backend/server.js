import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3901;
const DATA_FILE = path.join(__dirname, "contacts.json");

app.use(cors());
app.use(express.json());

function loadContacts() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveContacts(contacts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
}

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const contacts = loadContacts();
  const newContact = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };
  contacts.push(newContact);
  saveContacts(contacts);

  console.log(" Saved contact:", newContact);
  res.status(201).json({ success: true, message: "Message saved successfully!" });
});

app.get("/api/contact", (req, res) => {
  const contacts = loadContacts();
  res.json({ success: true, data: contacts });
});

app.get("/", (req, res) => res.send("Backend running successfully "));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running at http://0.0.0.0:${PORT}`);
});

