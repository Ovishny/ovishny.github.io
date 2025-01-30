const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// Initialize the app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors())
// MongoDB connection URI (use the URI you copied from MongoDB Atlas)
const uri = 'mongodb+srv://ovishny:Karatekid98@cluster0.mpf3mtc.mongodb.net/TFT?retryWrites=true&w=majority&appName=Cluster0'

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define a basic schema and model
const DataSchema = new mongoose.Schema({
  name: String,
  value: Number
});

const DataModel = mongoose.model('Data', DataSchema);
const Competitors = mongoose.model('Competitors', new mongoose.Schema({any:{}}), 'Competitors')

// Example API route to fetch data from MongoDB
app.get('/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/competitors', async (req, res) => {
    try {
      const data = await Competitors.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
