const bcrypt = require('bcryptjs');

let users = [];
let userIdCounter = 1;

const User = {
  create: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      _id: userIdCounter++,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      profileImage: userData.profileImage || '',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },
  findOne: async (query) => {
    return users.find(u => u.email === query.email);
  },
  findById: async (id) => {
    return users.find(u => u._id == id);
  },
  matchPassword: async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
};

module.exports = User;
