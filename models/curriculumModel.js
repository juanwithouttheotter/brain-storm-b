const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurriculumSchema = new Schema({
    title: {
        type: String,
        required: "Title is required",
        trim: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: "Lesson"
    }]
});

const Curriculum = mongoose.model("Curriculum", CurriculumSchema);

module.exports = Curriculum;