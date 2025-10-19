const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/me', async (req, res) => {
  try {
    const catResponse = await axios.get('https://catfact.ninja/fact', { timeout: 5000 });
    const catFact = catResponse.data.fact;

    const response = {
      status: "success",
      user: {
        email: "promiseduke@gmail.com",
        name: "Promise Duke ",
        stack: "Node.js/Express"
      },
      timestamp: new Date().toISOString(),
      fact: catFact
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (error) {
    res.status(502).json({
      status: "error",
      message: "Failed to fetch cat fact",
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
