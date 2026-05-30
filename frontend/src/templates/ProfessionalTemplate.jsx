import React from 'react';

const ProfessionalTemplate = ({ resume }) => {
  return (
    <div className="p-12">
      <div className="text-center mb-10 pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900">{resume.personalDetails.name || 'Your Name'}</h1>
        <div className="flex justify-center flex-wrap gap-6 mt-4 text-gray-700">
          {resume.personalDetails.email && <span>{resume.personalDetails.email}</span>}
          {resume.personalDetails.phone && <span>{resume.personalDetails.phone}</span>}
          {resume.personalDetails.linkedin && <span>{resume.personalDetails.linkedin}</span>}
        </div>
      </div>

      {resume.summary && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4">Professional Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-8">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold text-gray-900">{exp.title || 'Job Title'}</h3>
                <span className="text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-gray-700 font-medium mb-2">{exp.company || 'Company Name'}</p>
              {exp.description && <p className="text-gray-700">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold text-gray-900">{edu.school || 'School Name'}</h3>
                <span className="text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-gray-700">{edu.degree || 'Degree'}</p>
            </div>
          ))}
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4">Skills</h2>
          <div className="grid grid-cols-3 gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className="text-gray-700">{skill.name || 'Skill'}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
