const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const axios = require('axios');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const callGroqAPI = async (prompt) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile', // using currently supported model
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    throw new Error('Failed to generate AI response');
  }
};

// 1. Explain code with time complexity and optimization
router.post('/explain-code', protect, async (req, res) => {
  try {
    const { code, language } = req.body;
    const prompt = `Explain the following ${language} code in simple terms. Also provide its Time and Space Complexity, and suggest any possible optimizations:\n\n${code}`;
    const explanation = await callGroqAPI(prompt);
    res.json({ explanation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Generate interview questions based on role/topic
router.post('/generate-interview', protect, async (req, res) => {
  try {
    const { role, topic, difficulty } = req.body;
    const prompt = `Generate 5 interview questions for a ${role} position focusing on the topic of ${topic} with a ${difficulty} difficulty level. Include brief expected answers.`;
    const questions = await callGroqAPI(prompt);
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Analyze resume and give ATS score + improvements
router.post('/analyze-resume', protect, async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;
    const prompt = `Act as an expert ATS (Applicant Tracking System) and senior recruiter. Analyze the following resume text for the role of ${targetRole}. 
    Provide:
    1. An estimated ATS match score out of 100.
    2. Strengths of the resume.
    3. Weaknesses/Missing keywords.
    4. Actionable improvements.
    
    Resume Text:
    ${resumeText}`;
    
    const analysis = await callGroqAPI(prompt);
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Generate career roadmap based on skills and target role
router.post('/career-roadmap', protect, async (req, res) => {
  try {
    const { currentSkills, targetRole } = req.body;
    const prompt = `Generate a structured, step-by-step career roadmap for someone who currently knows [${currentSkills}] and wants to become a ${targetRole}. 
    Break it down into phases (e.g., Phase 1: Basics, Phase 2: Advanced, etc.) and list specific topics/projects to learn in each phase.`;
    const roadmap = await callGroqAPI(prompt);
    res.json({ roadmap });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
