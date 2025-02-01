const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const faqRoutes = require('./routes/faqRoutes');

require('dotenv').config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', faqRoutes);

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
