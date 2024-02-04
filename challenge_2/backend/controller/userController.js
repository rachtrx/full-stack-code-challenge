const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = db.user;

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).send('Authentication failed');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    // console.log(`Valid password: ${validPassword}`);
    if (!validPassword) return res.status(401).send('Authentication failed');

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ accessToken: token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ message: "No token" });
  }
  console.log(token);
  const decoded = jwt.decode(token);
  console.log(decoded); 
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
        return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { login, verifyToken };