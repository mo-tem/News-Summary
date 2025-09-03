const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const newsRoutes = require('./routes/news');
const summarizeRoutes = require('./routes/summarize');

app.use(express.json());
app.use('/news', newsRoutes);
app.use('/summarize', summarizeRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));