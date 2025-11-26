import express from 'express';
import cors from 'cors';
import { Low, JSONFile } from 'lowdb';
import { nanoid } from 'nanoid';

const app = express();
app.use(cors());
app.use(express.json());

const adapter = new JSONFile('db.json');
const db = new Low(adapter);

await db.read();
db.data ||= { users: [], tickets: [] };
await db.write();

// Signup
app.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;
  const existing = db.data.users.find(u => u.username === username);
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const newUser = { id: nanoid(), username, password, role };
  db.data.users.push(newUser);
  await db.write();
  res.json({ message: 'Account created', user: newUser });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = db.data.users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  res.json({ message: 'Login successful', user });
});

// Tickets
app.post('/tickets', async (req, res) => {
  const { studentId, title, description } = req.body;
  const ticket = { id: nanoid(), student
