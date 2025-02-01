const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.connect()
    .then(() => console.log('✅ Redis Connected'))
    .catch(err => console.error('❌ Redis Error:', err));

module.exports = client;
