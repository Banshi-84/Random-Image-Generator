const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=nature&image_type=photo`);
    const images = response.data.hits;
    if (images.length > 0) {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      res.status(200).json({ imageUrl: randomImage.largeImageURL });
    } else {
      res.status(404).json({ message: 'Failed to find an image.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching the image.' });
  }
};