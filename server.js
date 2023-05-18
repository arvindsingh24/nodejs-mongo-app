const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for your data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Create an Express app
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Route to create a new user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});