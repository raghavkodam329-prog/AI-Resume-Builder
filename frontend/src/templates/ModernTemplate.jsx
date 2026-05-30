import React from 'react';

const ModernTemplate = ({ resume }) => {
  return (
    <div className="p-12">
      <div className="border-b-4 border-indigo-600 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{resume.personalDetails.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
          {resume.personalDetails.email && <span>{resume.personalDetails.email}</span>}
          {resume.personalDetails.phone && <span>{resume.personalDetails.phone}</span>}
          {resume.personalDetails.address && <span>{resume.personalDetails.address}</span>}
        </div>
      </div>

      {resume.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.title || 'Job Title'}</h3>
                  <p className="text-indigo-600">{exp.company || 'Company Name'}</p>
                </div>
                <span className="text-gray-500 text-sm">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.school || 'School Name'}</h3>
                  <p className="text-indigo-600">{edu.degree || 'Degree'}</p>
                </div>
                <span className="text-gray-500 text-sm">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                {skill.name || 'Skill'}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
