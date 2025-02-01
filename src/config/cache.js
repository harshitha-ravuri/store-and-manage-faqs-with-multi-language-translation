const redis = require('redis');
const { REDIS_HOST, REDIS_PORT } = process.env;

// Create a Redis client
const client = redis.createClient({
  host: REDIS_HOST || '127.0.0.1',  // Default to localhost
  port: REDIS_PORT || 6379,         // Default to port 6379
});

// Handling Redis connection errors
client.on('error', (err) => {
  console.error('Redis Error: ', err);
});

// Function to set data in Redis cache
const setCache = (key, value, expiry = 3600) => {
  client.setex(key, expiry, JSON.stringify(value), (err, response) => {
    if (err) {
      console.error('Error setting cache:', err);
    } else {
      console.log(`Cache set for key: ${key}`);
    }
  });
};

// Function to get data from Redis cache
const getCache = (key, callback) => {
  client.get(key, (err, result) => {
    if (err) {
      console.error('Error getting cache:', err);
      callback(err, null);
    } else {
      if (result) {
        console.log(`Cache hit for key: ${key}`);
        callback(null, JSON.parse(result));
      } else {
        console.log(`Cache miss for key: ${key}`);
        callback(null, null);
      }
    }
  });
};

// Export functions
module.exports = { setCache, getCache };
