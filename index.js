const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./src/routes/apiRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
