const redisClient = require('../config/redis');

const cacheMiddleware = async (req, res, next) => {
    const lang = req.query.lang || 'en';
    const cachedData = await redisClient.get(`faqs:${lang}`);

    if (cachedData) return res.status(200).json(JSON.parse(cachedData));
    next();
};

module.exports = cacheMiddleware;
