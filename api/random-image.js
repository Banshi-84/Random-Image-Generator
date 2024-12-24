const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 5004;

// Pixabay API Key
const API_KEY = '47732950-a79c440ee5094b3a6a46366d1';

// Provide static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get a random image
app.get('/random-image', async (req, res) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=nature&image_type=photo`);
    const images = response.data.hits;
    if (images.length > 0) {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      res.json({ imageUrl: randomImage.largeImageURL });
    } else {
      res.status(404).json({ message: 'Failed to find it.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'EError occurred.' });
  }
});

// Server startup
app.listen(PORT, () => {
  console.log(`There is http://localhost:${PORT} in the server.`);
});
