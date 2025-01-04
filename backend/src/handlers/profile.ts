import { Request, Response } from "express";
import slug from "slug";
import User from "../models/User";
import formidable from "formidable";
import { v4 as uuid } from "uuid";
import cloudinary from "../config/cloudinary";

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    // Check if handle already exists
    const handle = slug(req.body.handle, "");
    const handleExists = await User.findOne({ handle });
    if (handleExists && handleExists.email !== req.user!.email) {
      res.status(400).send({ message: "Handle already exists" });
      return;
    }

    req.user!.handle = handle;
    req.user!.description = req.body.description;
    req.user!.links = req.body.links;
    await req.user!.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send({ message: "Update Profile error" });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false });

  try {
    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(
        files.file && files.file[0] ? files.file[0].filepath : "",
        { public_id: uuid() },
        async function (error, result) {
          if (error) {
            res.status(500).send({ message: "Upload Image error" });
            return;
          }

          if (result) {
            req.user!.image = result.secure_url;
            await req.user!.save();
            res.send(req.user);
          }
        }
      );
    });
  } catch (error) {
    res.status(500).send({ message: "Upload Image error" });
  }
};

export const getUserByHandle = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ handle: req.params.handle }).select(
      "-_id -__v -password -email"
    );
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Get User By Handle error" });
  }
};

export const searchByHandle = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ handle: req.body.handle });
    if (user) {
      res.status(409).send({ message: "User already exists" });
      return;
    }
    res.send({ message: `${req.body.handle} is available` });
  } catch (error) {
    res.status(500).send({ message: "Search By Handle error" });
  }
};
