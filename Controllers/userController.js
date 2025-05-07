const User = require('../Schema/model'); 

const userController = {
    register: async (req, res) => {
        try {
          const user = new User(req.body);
          await user.save(); 
          const userWithoutPassword = user.toObject();
          delete userWithoutPassword.password;
          res.status(201).send(userWithoutPassword);
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
      },

  getUserByEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      
      res.send(user);
    } catch (err) {
      res.status(500).send({ error: 'Server error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        req.body,
        { new: true, runValidators: true }
      );
      if (!user) return res.status(404).send({ error: 'User not found' });
      res.send(user);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ email: req.params.email });
      if (!user) return res.status(404).send({ error: 'User not found' });
      res.send({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).send({ error: 'Server error' });
    }
  }
};

module.exports = userController; 