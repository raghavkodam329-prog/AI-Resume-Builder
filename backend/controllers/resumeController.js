const Resume = require('../models/Resume');
const User = require('../models/User');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy-key' });

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    if (resume.userId != req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({ userId: req.user._id, ...req.body });
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    if (resume.userId != req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    if (resume.userId != req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await Resume.deleteOne({ _id: req.params.id });
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const generateAISummary = async (req, res) => {
  try {
    const { personalDetails, experience, skills } = req.body;
    const prompt = `Create a professional resume summary for a person with:
    Name: ${personalDetails?.name || 'Candidate'}
    Experience: ${JSON.stringify(experience || [])}
    Skills: ${JSON.stringify(skills || [])}
    Make it concise and professional (max 4-5 sentences).`;

    let summary;
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'dummy-key') {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });
      summary = response.choices[0].message.content;
    } else {
      summary = 'Experienced professional with a strong background in software development. Proven track record of delivering high-quality projects on time. Skilled in multiple programming languages and frameworks. Excellent team player with great communication skills.';
    }

    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating summary', error: error.message });
  }
};

const generateAIExperience = async (req, res) => {
  try {
    const { jobTitle, company, description } = req.body;
    const prompt = `Enhance this job experience description to be more professional and achievement-oriented. Use action verbs and quantify achievements where possible.
    Job Title: ${jobTitle}
    Company: ${company}
    Original Description: ${description}`;

    let enhancedDescription;
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'dummy-key') {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });
      enhancedDescription = response.choices[0].message.content;
    } else {
      enhancedDescription = description || 'Responsible for various tasks and projects at the company.';
    }

    res.json({ description: enhancedDescription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating experience', error: error.message });
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  generateAISummary,
  generateAIExperience,
};
