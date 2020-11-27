const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    title: {
        type: String,
        required: "Title is required"
    },
    topic: {
        type: String,
        required: "Topic is required",
        trim: true
    },
    demographics: {
        grade_level: {
            type: String,
            enum: ["Pre-k", "Kinder", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"]
        },
        duration: {
            type: Number,
            min: 0,
            max: 120,
            required: "Duration of lesson is required"
        }
    },
    lesson_plan: {
        standards: {
            type: String,
            required: "Standards are required"
        },
        instructions: {
            type: String,
            maxlength: 5000
        },
        resources: [{
            name: String,
            description: {
                type: String,
                maxlength: 500
            },
            link: {
                type: String,
                validate: {
                    validator: value => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
                    message: 'Must be a Valid URL'
                }
            }
        }],
        modifications: {
            type: String,
            maxlength: 500
        },
        accommodations: {
            type: String,
            maxlength: 500
        }
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;