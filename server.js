const express = require("express");
const app = express();
const PORT = 3001;
const api = require('./routes/apiRoute');
const html = require('./routes/htmlRoute');
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);
app.use('/', html);
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  }
);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    console.log("404")
  } 
);


//listener
app.listen(PORT, () {
    console.log(`App listening on: http://localhost:${PORT}`)
  });