import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Bookmark", BookmarkSchema)