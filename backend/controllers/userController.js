// @desc    Authenticate user/set token
// route    POST /api/users/auth
// @access  Public
const authenticateUser = (req, res) => {
  res.status(200).json({ message: "Authenticate User" });
};

// @desc    Register User
// route    POST /api/users
// @access  Public
const registerUser = (req, res) => {
  res.status(200).json({ message: "Register User" });
};

// @desc    Logout User
// route    POST /api/users/auth
// @access  Public
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Authenticate User" });
};

// @desc    Get User Profile
// route    GET /api/users
// @access  Private
const getUserProfile = (req, res) => {
  res.status(200).json({ message: "Authenticate User" });
};

// @desc    Update User
// route    PUT /api/users
// @access  Private
const updateUserProfile = (req, res) => {
  res.status(200).json({ message: "Authenticate User" });
};

export { authenticateUser };
