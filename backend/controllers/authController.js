// POST /api/auth/login
const loginUser = async (req, res) => {
  res.status(200).json({
    message: "Login successful",
    user: {
      uid: req.user.uid,
      email: req.user.email,
    },
  });
};

module.exports = { loginUser };
