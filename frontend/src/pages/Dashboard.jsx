import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/resumes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/resumes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchResumes();
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Resumes</h1>
          <Link
            to="/builder"
            className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            <span>New Resume</span>
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
        ) : resumes.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No resumes yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Create your first resume to get started</p>
            <Link
              to="/builder"
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              <span>Create Resume</span>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-indigo-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{resume.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link
                    to={`/builder/${resume._id}`}
                    className="flex-1 flex items-center justify-center space-x-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => deleteResume(resume._id)}
                    className="flex items-center justify-center space-x-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-3 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
