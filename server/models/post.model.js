const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: [String],
        required: true
    },
    genre: {
        type: [String],
        enum: ["Narrative",
            "NonFiction",
            "Poetry"]
    },
    tags: Array,
    typology: {
        type: [String],
        enum: ['Descriptive', 'Narrative', 'Expository', 'Argumentative', 'Literature']
    },
    audio: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    cover: {
        type: String
    },
    creatorID: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true
})


const Post = mongoose.model("Post", postSchema)

module.exports = Post

// narrative: ['Adventure', 'Mystery', 'Science Fiction', 'Fantasy', 'Historical fiction', 'Contemporary fiction', 'Dilemma Stories', 'Film narratives', 'Myths', 'Legends', 'Fairy tales', 'Fables'],
// nonFiction: ['Discussion', 'Explanatory', 'Instructiona', 'Persuasion', 'Non-chronological', 'Recounts'],
// poetry: ['Narrative', 'Lyric', 'Epic', 'Satirical', 'Elegy', 'Dramatic', 'Speculative', 'Prose', 'Light', 'Slam']