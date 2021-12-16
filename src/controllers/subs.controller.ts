import { isEmpty } from "class-validator";
import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import { getRepository } from "typeorm";
import Post from "../entities/Post";
import fs from "fs";

export const createSub = async (req: Request, res: Response) => {
  // destructure the fields
  const { name, title, description } = req.body;

  // get user from session
  const user: any = req.user;
  // return an error if there is no authenticated user
  if (!user) return res.status(404).json({ error: "unauthenticated" });

  try {
    // validations
    let errors: any = {};
    if (isEmpty(name)) errors.name = "Name must not be empty";
    if (isEmpty(title)) errors.title = "Title must not be empty";

    // check if there's an existing sub already
    const sub = await getRepository(Subs)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "Subleddit name already exists";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    // create a sub
    const newSub = new Subs({ name, description, title, user });
    // save to the database
    await newSub.save();

    return res.status(200).json(newSub);
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const getSub = async (req: Request, res: Response) => {
  const { name } = req.params; // get the sub name from the request
  const user: any = req.user; //get authenticated user if available

  try {
    const sub = await Subs.findOneOrFail({ name }); // find the sub from the Subs
    const posts = await Post.find({
      where: { sub },
      relations: ["comments", "votes"],
      order: { createdAt: "DESC" },
    });

    sub.posts = posts;

    if (user) {
      sub.posts.forEach((post) => post.setUserVote(user));
    }

    return res.json(sub);
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const uploadSubImage = async (req: Request, res: Response) => {
  const user: any = req.user; // get the user from session
  const sub: Subs = user.sub;
  const type = req.body.type; // get the type (image/bannner) from req.body
  try {
    // return an error if the type isn't image or banner
    if (type !== "image" && type !== "banner") {
      fs.unlinkSync(req.file!.path); // delete the photo
      return res.status(400).json({ error: "invalid type" }); // return an error
    }

    let oldImageUrn: string = ""; // store the old image here

    if (type === "image") {
      oldImageUrn = sub.imageURN || ""; // store the old imageURN
      sub.imageURN = req.file!.filename; // add the imageURN to the sub
    } else if (type === "banner") {
      oldImageUrn = sub.bannerURN || ""; // store the old bannerURN
      sub.bannerURN = req.file!.filename; // add the new banner URN
    }

    await sub.save();

    if (oldImageUrn !== "") fs.unlinkSync(`public/images/${oldImageUrn}`); // filesystem made  me up lmao, windows = \\ ; linux = /

    return res.status(200).json(sub);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const deleteSubImage = async (req: Request, res: Response) => {
  const { name, type } = req.params;
  try {
    if (type !== "image" && type !== "banner") {
      return res.status(400).json({ error: "invalid type" }); // return an error
    }

    const sub = await Subs.findOneOrFail({ name });

    if (type === "image") {
      // delete

      sub.imageURN = "";
    } else if (type === "banner") {
      // delete
      sub.bannerURN = "";
    }

    await sub.save();

    return res.status(200).json(sub);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
