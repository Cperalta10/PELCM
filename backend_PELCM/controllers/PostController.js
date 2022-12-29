const { default: mongoose } = require("mongoose");
const Posts = require("../models/postModel");
const User = require("../models/User");

const createPost = async (req, res, next) => {
    const newPost = new Posts(req.body);

    try {
        await newPost.save();
        res.status(201).json({ message: "Post created!" });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getPost = async (req, res, next) => {
    const postId = req.params.id;

    try {
        const post = await Posts.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post doesn't exist." });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updatePost = async (req, res, next) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Posts.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(201).json({ message: "Post was updated successfully!" });
        } else {
            res.status(403).json({ message: "You don't have permission." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deletePost = async (req, res, next) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Posts.findById(postId);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json({ message: "Post was deleted successfully!" });
        } else {
            res.status(403).json({ message: "You don't have permission." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const likePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Posts.findById(postId);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json({ message: "Post liked!" });
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json({ message: "Post unliked." });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const currentUserPosts = await Posts.find({ userId: userId }); // returns all the post that include the userId
        const followingPosts = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId), // _id: ObjectId('#') <= lets it match up. W/o addig type objId it will not match.
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "followings",
                    foreignField: "userId",
                    as: "followingPosts",
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);

        res.status(200).json(
            currentUserPosts
                .concat(...followingPosts[0].followingPosts)
                .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
        );
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
    likePost,
    getTimelinePosts,
};
