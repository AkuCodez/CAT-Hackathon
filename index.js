const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client','views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'client','public')));

app.get('/', (req, res) => {
  res.render('home'); // Render the 'index.ejs' file
});

app.get('/signup', (req, res) => {
  res.render('signup'); 
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

