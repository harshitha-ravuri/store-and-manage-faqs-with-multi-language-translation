const FAQ = require('../models/faqModel');
const redisClient = require('../config/redis');
const translateText = require('../config/translator');

// Create FAQ
exports.createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) return res.status(400).json({ message: '❌ Question and answer are required' });

        // Translate into multiple languages
        const translations = {
            hi: await translateText(answer, 'hi'),
            bn: await translateText(answer, 'bn')
        };

        const faq = new FAQ({ question, answer, translations });
        await faq.save();

        res.status(201).json({ message: '✅ FAQ created successfully', faq });
    } catch (error) {
        res.status(500).json({ message: '❌ Internal Server Error', error });
    }
};

// Get FAQs (with optional translation caching)
exports.getFAQs = async (req, res) => {
    try {
        const lang = req.query.lang || 'en';

        const cachedFAQs = await redisClient.get(`faqs:${lang}`);
        if (cachedFAQs) return res.status(200).json(JSON.parse(cachedFAQs));

        const faqs = await FAQ.find({});
        const translatedFAQs = faqs.map(faq => ({
            question: faq.question,
            answer: lang === 'en' ? faq.answer : faq.translations[lang] || faq.answer
        }));

        await redisClient.setEx(`faqs:${lang}`, 3600, JSON.stringify(translatedFAQs));
        res.status(200).json(translatedFAQs);
    } catch (error) {
        res.status(500).json({ message: '❌ Internal Server Error', error });
    }
};
