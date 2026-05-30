let resumes = [];
let resumeIdCounter = 1;

const Resume = {
  create: async (resumeData) => {
    const newResume = {
      _id: resumeIdCounter++,
      ...resumeData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    resumes.push(newResume);
    return newResume;
  },
  find: async (query) => {
    return resumes.filter(r => r.userId == query.userId);
  },
  findById: async (id) => {
    return resumes.find(r => r._id == id);
  },
  findByIdAndUpdate: async (id, updateData) => {
    const index = resumes.findIndex(r => r._id == id);
    if (index !== -1) {
      resumes[index] = { ...resumes[index], ...updateData, updatedAt: new Date() };
      return resumes[index];
    }
    return null;
  },
  deleteOne: async (query) => {
    const index = resumes.findIndex(r => r._id == query._id);
    if (index !== -1) {
      resumes.splice(index, 1);
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }
};

module.exports = Resume;
