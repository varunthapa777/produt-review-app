import Admin from "../models/admin.model.js";
import userService from "../services/user.service.js";
import productService from "../services/product.service.js";
import adminService from "../services/admin.service.js";
const LoginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findByCredentials(username, password);

    const token = await admin.generateAuthToken();

    res.cookie("adminToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 3600000),
    });
    res.send({ admin, adminToken: token });
  } catch (e) {
    res.status(400).send({ error: "Invalid Credentials" });
  }
};

const LogoutAdmin = async (req, res) => {
  try {
    const token =
      req.cookies?.adminToken || req.headers.authorization?.split(" ")[1];
    res.clearCookie("adminToken");
    await userService.blackListToken(token);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getDashBoardData = async (req, res) => {
  try {
    const totalUsers = await userService.getUserCount();
    const totalModerators = await adminService.getModeratorCount();
    const reviewsByStatus = await productService.getReviewCountByStatus();
    const productStatus = await productService.getProductStatus(req.admin._id);
    res.status(200).json({
      totalUsers,
      totalModerators,
      reviewsByStatus,
      productStatus,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await productService.getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default { LoginAdmin, LogoutAdmin, getDashBoardData, getReviews };
