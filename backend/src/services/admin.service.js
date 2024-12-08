import AdminModel from "../models/admin.model.js";

const getModeratorCount = async () => {
  try {
    const count = await AdminModel.countDocuments({ role: "moderator" });
    return count;
  } catch (error) {
    throw error;
  }
};

export default { getModeratorCount };
