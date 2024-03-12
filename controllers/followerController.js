const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");

const createFollowers = asyncHandler(async (req, res) => {
  const userIdToFollow = req.params._id;
  const loggedInUser = req.user; // Assuming you have user authentication in place

  // Check if user exists (error handling omitted for brevity)
  const userToFollow = await User.findById(userIdToFollow);

  // Check if already following
  if (userToFollow.followers.includes(loggedInUser._id)) {
    return res
      .status(400)
      .json({ message: "You are already following this user." });
  }

  try {
    // Update followers and followings arrays atomically using transactions or middleware
    await User.findByIdAndUpdate(userIdToFollow, {
      $push: { followers: loggedInUser._id },
    });
    await User.findByIdAndUpdate(loggedInUser._id, {
      $push: { followings: userToFollow._id },
    });

    res.status(200).json({ message: "Following successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error following user." });
  }
});

module.exports = createFollowers;
