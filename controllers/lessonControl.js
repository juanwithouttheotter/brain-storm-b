const db = require("../models");

exports.create = async ({body}, res) => {
    const Lesson = new db.Lesson(body);
    Lesson
    .save()
    .then( () => {
        return res.status(201).json({
            success: true,
            id: Lesson._id,
            message: 'Lesson created!',
        }).end()
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Lesson not created!',
        }).end()
    })
}

exports.update = async ({body}, res) => {
    const Lesson = new db.Lesson(body);
    
}