const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        first: {
            type: String,
            required: "First name is required",
            trim: true
        },
        last: {
            type: String,
            require: "Last name is required"
        }
    },
    email: {
        type: String,
        required: "Email is required",
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        required: "Password is requried",
        trim: true,
        validate: [({ length }) => length >= 8, "Password should be 8 characters or more"]
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Educator"]
    },
    favorite: [{
        type: Schema.Types.ObjectId,
        ref: "Lesson"
    }],
    Curriculum: [{
        type: Schema.Types.ObjectId,
        ref: "Curriculum"
    }],
    userCreated: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;