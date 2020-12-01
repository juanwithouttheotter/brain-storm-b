const db = require("../models");

exports.create = async ({ body }, res) => {
    const Lesson = new db.Lesson(body);
    Lesson
        .save()
        .then(() => {
            return res
                .status(201)
                .json({
                    success: true,
                    id: Lesson._id,
                    message: 'Lesson created!'
                })
                .end()
        })
        .catch(err => {
            return res
                .status(400)
                .json({
                    err,
                    message: 'Lesson not created'
                })
                .end()
        });
}

exports.getById = async (req, res) => {
    await db.Lesson.findById(req.params.id,
        (err, lesson) => {
            if (err) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        error: err
                    })
                    .end()
            }
            if (!lesson.length) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        error: 'Lesson not found'
                    })
                    .end()
            }
            return res
                .status(200)
                .json({
                    success: true,
                    data: lesson
                })
                .end()
        })
        .catch(err => console.log(err))
}

exports.getAll = async (req, res) => {
    await db.Lesson.find({}, (err, lesson) => {
        if (err) {
            return res
                .status(400)
                .json({
                    success: false,
                    error: err
                })
                .end()
        }
        if (!lesson.length) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Lesson not found'
                })
                .end()
        }
        return res
            .status(200)
            .json({
                success: true,
                data: lesson
            })
            .end()
    })
        .catch(err => console.log(err));
}

exports.getLessonCreator = async (req, res) => {
    await db.Lesson.findById(req.params.id)
        .populate("created_by")
        .then((lessonCreator, err) => {
            if (err) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        error: err
                    })
                    .end()
            }
            if (!lessonCreator) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        error: 'lesson creator not found'
                    })
                    .end()
            }
            return res
                .status(200)
                .json({
                    success: true,
                    data: lessonCreator
                })
                .end()
        })
        .catch(err => console.log(err));
}

exports.update = async (req, res) => {
    await db.Lesson.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, lesson) => {
            if (err) {
                return res
                    .status(404)
                    .json({ err, message: 'Lesson not found!' })
                    .end()
            }
            lesson
                .then(() => {
                    return res
                        .status(200)
                        .json({
                            success: true,
                            id: lesson._id,
                            message: 'Lesson updated!'
                        })
                        .end()
                })
                .catch(error => {
                    return res
                        .status(404)
                        .json({
                            error,
                            message: 'Lesson not updated!'
                        })
                        .end()
                })
        })
        .catch(err => console.log(err));
}

exports.delete = async (req, res) => {
    await db.Lesson.findOneAndDelete({ _id: req.params.id }, 
        (err, lesson) => {
        if (err) {
            return res
                .status(400)
                .json({
                    success: false,
                    error: err
                })
                .end()
        }
        if (!lesson) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: `Lesson not found`
                })
                .end()
        }
        return res
            .status(400)
            .json({
                success: true,
                message: `This lesson was successfully deleted!`,
                data: lesson
            })
            .end()
    })
        .catch(err => console.log(err));
}