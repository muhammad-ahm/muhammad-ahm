import 'dotenv/config';
import express from 'express';
import examRoutes from './routes/examRoutes.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = 4000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(__dirname + '/public'));

const logger = (req, res, next) => {
  req.msg = "<br>This is from logger middleware!";
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);

const auth = (req, res, next) => {
  if (req.query.username === "peter") {
    next();
  } else {
    res.send("Unauthorized Access");
  }
};

app.use('/api/exams', examRoutes);

app.get("/login", auth, (req, res) => {
  res.send(`Welcome to the dashboard!  ${req.msg}`);
});

app.get('/about', (req, res) => {
  res.send(`This is the about page. ${req.msg}`);
});

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
);

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
