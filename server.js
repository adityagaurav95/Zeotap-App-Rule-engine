const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ruleRoutes = require('./routes/ruleRoutes');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Use the port assigned by Render (via the environment variable) or default to 4000 locally
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

app.use('/api/rules', ruleRoutes);

// Start the server, bind to the port specified by the environment variable
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
