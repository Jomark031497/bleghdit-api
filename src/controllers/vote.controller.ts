import { Request, Response } from "express";
import Vote from "../entities/Vote";
import Post from "../entities/Post";
import Comment from "../entities/Comment";

export const vote = async (req: Request, res: Response) => {
  const { identifier, slug, commentIdentifier, value } = req.body;

  // validate if the value is -1(downvote),0(remove vote),  or 1(upvote)
  if (![-1, 0, 1].includes(value)) return res.status(400).json({ error: "invalid value" });

  try {
    const user: any = req.user; // get user from session
    let post = await Post.findOneOrFail({ identifier, slug }); // find post with the identifier and slug;
    let vote: Vote | undefined;
    let comment: Comment | undefined;

    if (commentIdentifier) {
      // if there is a commentIdentifier find vote by comment
      comment = await Comment.findOneOrFail({ identifier: commentIdentifier });
      vote = await Vote.findOne({ user, comment });
    } else {
      // else find vote by post
      vote = await Vote.findOne({ user, post });
    }

    if (!vote && value === 0) {
      // if no vote and value = 0 return an error
      return res.status(404).json({ error: "vote not found" });
    } else if (!vote) {
      // if no vote create it
      vote = new Vote({
        user,
        value,
      });
      if (comment) vote.comment = comment;
      else vote.post = post;
      await vote.save();
    } else if (value === 0) {
      // if vote exists and value is zero, remove vote from db
      await vote.remove();
    } else if (vote.value !== value) {
      // if vote and value have changed, update the vote
      vote.value = value;
      await vote.save();
    }

    post = await Post.findOneOrFail(
      { identifier, slug },
      { relations: ["comments", "comments.votes", "sub", "votes"] }
    );

    post.setUserVote(user);
    post.comments.forEach((c) => c.setUserVote(user));
    return res.json(post);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "something went wrong" });
  }
};
