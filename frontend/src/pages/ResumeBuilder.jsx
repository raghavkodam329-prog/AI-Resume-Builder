import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Sparkles, Download, ArrowLeft, Palette } from 'lucide-react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import ModernTemplate from '../templates/ModernTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [resume, setResume] = useState({
    title: 'Untitled Resume',
    templateId: 'modern',
    personalDetails: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: '',
    },
    summary: '',
    objective: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  });

  const resumeRef = useRef();

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/resumes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResume(response.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (id) {
        await axios.put(`/api/resumes/${id}`, resume, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        const response = await axios.post('/api/resumes', resume, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate(`/builder/${response.data._id}`);
      }
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const generateSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/resumes/generate-summary',
        {
          personalDetails: resume.personalDetails,
          experience: resume.experience,
          skills: resume.skills,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResume({ ...resume, summary: response.data.summary });
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate summary');
    }
  };

  const downloadPDF = () => {
    const element = resumeRef.current;
    const options = {
      margin: 1,
      filename: `${resume.personalDetails.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  };

  const renderTemplate = () => {
    switch (resume.templateId) {
      case 'professional':
        return <ProfessionalTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'summary', label: 'Summary' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'templates', label: 'Templates' },
  ];

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <input
              type="text"
              value={resume.title}
              onChange={(e) => setResume({ ...resume, title: e.target.value })}
              className="text-xl font-semibold bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white"
              placeholder="Resume Title"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={saveResume}
              disabled={saving}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Download className="h-4 w-4" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-1/2 overflow-y-auto p-6 border-r border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'personal' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Details</h3>
              {Object.entries(resume.personalDetails).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      setResume({
                        ...resume,
                        personalDetails: { ...resume.personalDetails, [key]: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Professional Summary</h3>
                <button
                  onClick={generateSummary}
                  className="flex items-center space-x-1 bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Generate</span>
                </button>
              </div>
              <textarea
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white h-48"
                placeholder="Write a professional summary..."
              />
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h3>
                <button
                  onClick={() =>
                    setResume({
                      ...resume,
                      education: [...resume.education, { school: '', degree: '', field: '', startDate: '', endDate: '', description: '' }],
                    })
                  }
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  + Add
                </button>
              </div>
              {resume.education.map((edu, index) => (
                <div key={index} className="p-4 border rounded-lg dark:border-gray-600 space-y-3">
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => {
                      const newEdu = [...resume.education];
                      newEdu[index] = { ...edu, school: e.target.value };
                      setResume({ ...resume, education: newEdu });
                    }}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="School Name"
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...resume.education];
                      newEdu[index] = { ...edu, degree: e.target.value };
                      setResume({ ...resume, education: newEdu });
                    }}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Degree"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Experience</h3>
                <button
                  onClick={() =>
                    setResume({
                      ...resume,
                      experience: [...resume.experience, { title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' }],
                    })
                  }
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  + Add
                </button>
              </div>
              {resume.experience.map((exp, index) => (
                <div key={index} className="p-4 border rounded-lg dark:border-gray-600 space-y-3">
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => {
                      const newExp = [...resume.experience];
                      newExp[index] = { ...exp, title: e.target.value };
                      setResume({ ...resume, experience: newExp });
                    }}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...resume.experience];
                      newExp[index] = { ...exp, company: e.target.value };
                      setResume({ ...resume, experience: newExp });
                    }}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Company"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
                <button
                  onClick={() =>
                    setResume({
                      ...resume,
                      skills: [...resume.skills, { name: '', level: 'Intermediate' }],
                    })
                  }
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  + Add
                </button>
              </div>
              {resume.skills.map((skill, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => {
                      const newSkills = [...resume.skills];
                      newSkills[index] = { ...skill, name: e.target.value };
                      setResume({ ...resume, skills: newSkills });
                    }}
                    className="flex-1 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Skill name"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => {
                      const newSkills = [...resume.skills];
                      newSkills[index] = { ...skill, level: e.target.value };
                      setResume({ ...resume, skills: newSkills });
                    }}
                    className="px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
                <button
                  onClick={() =>
                    setResume({
                      ...resume,
                      projects: [...resume.projects, { name: '', description: '', techStack: '', link: '' }],
                    })
                  }
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  + Add
                </button>
              </div>
              {resume.projects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg dark:border-gray-600 space-y-3">
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => {
                      const newProjects = [...resume.projects];
                      newProjects[index] = { ...project, name: e.target.value };
                      setResume({ ...resume, projects: newProjects });
                    }}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Project Name"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Template</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'modern', name: 'Modern' },
                  { id: 'professional', name: 'Professional' },
                ].map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setResume({ ...resume, templateId: template.id })}
                    className={`p-4 border-2 rounded-lg text-center ${
                      resume.templateId === template.id
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Palette className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                    <span className="font-medium text-gray-900 dark:text-white">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-1/2 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-8">
          <div ref={resumeRef} className="bg-white shadow-lg mx-auto max-w-2xl">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
