import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const app = express();
const PORT = 3001;
const DB_FILE = './server/db.json';

app.use(cors());
app.use(express.json());

let db = { users: [], notebooks: [], materials: [] };
if (fs.existsSync(DB_FILE)) {
  try {
    db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    db = { users: [], notebooks: [], materials: [] };
  }
}
db.users ||= [];
db.notebooks ||= [];
db.materials ||= [];
function save() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const user = db.users.find(u => u.token === token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  next();
}

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  if (db.users.find(u => u.email === email)) return res.status(400).json({ error: 'User exists' });
  const user = { id: uuidv4(), email, password, token: uuidv4() };
  db.users.push(user);
  save();
  res.json({ token: user.token, user: { id: user.id, email: user.email } });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  user.token = uuidv4();
  save();
  res.json({ token: user.token, user: { id: user.id, email: user.email } });
});

app.get('/session', auth, (req, res) => {
  res.json({ user: { id: req.user.id, email: req.user.email } });
});

app.get('/notebooks', auth, (req, res) => {
  const notebooks = db.notebooks.filter(nb => nb.userId === req.user.id);
  res.json(notebooks);
});

app.post('/notebooks', auth, (req, res) => {
  const { name } = req.body;
  const now = new Date().toISOString();
  const notebook = { id: uuidv4(), userId: req.user.id, name, lastAccessed: now, createdAt: now, updatedAt: now };
  db.notebooks.push(notebook);
  save();
  res.json(notebook);
});

app.get('/notebooks/:id/materials', auth, (req, res) => {
  const notebookId = req.params.id;
  const materials = db.materials.filter(m => m.notebookId === notebookId);
  res.json(materials);
});

app.post('/notebooks/:id/materials', auth, (req, res) => {
  const notebookId = req.params.id;
  const mat = req.body;
  const now = new Date().toISOString();
  const material = { id: uuidv4(), notebookId, ...mat, createdAt: now, updatedAt: now };
  db.materials.push(material);
  save();
  res.json(material);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
