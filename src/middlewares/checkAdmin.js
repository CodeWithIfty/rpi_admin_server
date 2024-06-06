const checkAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "You do not have permission to access this resource",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return res.status(500).json({ message: "Error checking admin status" });
  }
};

module.exports = checkAdmin;
