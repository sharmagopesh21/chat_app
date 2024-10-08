import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // This will get select the non equal users

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidervar: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
