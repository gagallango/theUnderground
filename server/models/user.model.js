const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favoriteGenre: {
        type: [String],
        enum: ["Narrative", "NonFiction", "Poetry"]
    },
    myReviews: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    profilePic: {
        type: String
    },
    userPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    verificationToken: String,
    recuperationToken: String
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User