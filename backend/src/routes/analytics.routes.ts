import { Router } from "express";
import User from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";

const routerAnalytics = Router();

/**
 * @swagger
 * /api/user/click/{handle}:
 *   post:
 *     summary: Track click on a user's social network link
 *     parameters:
 *       - in: path
 *         name: handle
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 */
routerAnalytics.post(
  "/user/click/:handle",
  asyncHandler(async (req, res) => {
    const { handle } = req.params;
    const { linkName } = req.body;

    if (!linkName) {
      res.status(400).json({ message: "linkName is required" });
      return;
    }

    const user = await User.findOne({ handle });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Find the link and increment click
    let linkUpdated = false;
    user.links = user.links.map((link) => {
      if (link.name.toLowerCase() === linkName.toLowerCase()) {
        link.clicks = (link.clicks || 0) + 1;
        linkUpdated = true;
      }
      return link;
    });

    if (!linkUpdated) {
      res.status(404).json({ message: "Link not found for this user" });
      return;
    }

    await user.save();

    res.status(200).json({ message: "Click tracked successfully" });
  })
);

export default routerAnalytics;
