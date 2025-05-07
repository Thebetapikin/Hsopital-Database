const User = require('../Schema/model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Added missing import

const authController = {
    login: async (req, res) => {
        try {
            const { email, password, role } = req.body;
            
            // 1. Find user by email and role
            const user = await User.findOne({ email, role });
            if (!user) {
                return res.status(401).json({ error: 'Invalid login credentials' });
            }

            // 2. Compare passwords
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ error: 'Invalid login credentials' });
            }

            // 3. Generate token (using method from User model)
            const token = user.generateAuthToken();
            
            // 4. Send response (hide password)
            const userData = user.toObject();
            delete userData.password;
            
            res.json({ 
                user: userData,
                token,
                role: userData.role // Add this for clarity 
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = authController;