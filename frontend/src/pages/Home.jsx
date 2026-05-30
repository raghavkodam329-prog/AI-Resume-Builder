import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Download, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    { icon: FileText, title: 'Easy Builder', description: 'Intuitive form to create your perfect resume' },
    { icon: Sparkles, title: 'AI Powered', description: 'Generate professional summaries with AI' },
    { icon: Palette, title: 'Multiple Templates', description: 'Choose from modern, professional, and creative designs' },
    { icon: Download, title: 'PDF Export', description: 'Download your resume as a print-ready PDF' },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Build Your Perfect Resume with <span className="text-indigo-600">AI</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Create professional, ATS-friendly resumes in minutes with our AI-powered resume builder.
            </p>
            <Link
              to="/register"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl"
              >
                <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
