// index.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/deploy-my-vite-app', async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.render.com/v1/services/${process.env.APPKEY}/deploys`,
      {},
      {
        headers: {
          Authorization: process.env.APIKEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'Deployment triggered!', data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Deployment failed', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Deploy API running on http://localhost:${PORT}`);
});

