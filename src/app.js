const express = require('express');
const { readFileSync } = require('fs');

const port = 3000;
const app = express();

app.get("/", (req, res) => res.send(readFileSync('./src/pages/home.html', 'utf8')));
app.get("/about", (req, res) => res.send(readFileSync('./src/pages/about.html', 'utf8')));
app.get("/games", (req, res) => res.send(readFileSync('./src/pages/games.html', 'utf8')));

app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));