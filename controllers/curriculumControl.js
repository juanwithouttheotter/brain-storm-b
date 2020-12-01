const db = require("../models");

exports.create = async ({ body }, res) => {
    const Curriculum = new db.Curriculum(body);
    Curriculum
        .save()
        .then(() => {
            return res
                .status(201)
                .json({
                    success: true,
                    id: Curriculum._id,
                    message: 'Curriculum created!'
                })
                .end()
        })
        .catch(err => {
            return res
                .status(400)
                .json({
                    err,
                    message: 'User not created'
                })
                .end()
        });
}

exports.getById = async (req, res) => {
    await db.Curriculum.findById(req.params.id,
        (err, curriculum) => {
            if (err) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        error: err
                    })
                    .end()
            }
            if (!curriculum.length) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        error: 'Curriculum not found'
                    })
                    .end()
            }
            return res
                .status(200)
                .json({
                    success: true,
                    data: curriculum
                })
                .end()
        })
        .catch(err => console.log(err))
}

exports.getAll = async (req, res) => {
    await db.Curriculum.find({}, (err, curriculum) => {
        if (err) {
            return res
                .status(400)
                .json({
                    success: false,
                    error: err
                })
                .end()
        }
        if (!curriculum.length) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Curriculum not found'
                })
                .end()
        }
        return res
            .status(200)
            .json({
                success: true,
                data: curriculum
            })
            .end()
    })
        .catch(err => console.log(err));
}

exports.getCurriculumCreator = async (req, res) => {
    await db.Curriculum.findById(req.params.id)
        .populate("created_by")
        .then((curriculumCreator, err) => {
            if (err) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        error: err
                    })
                    .end()
            }
            if (!curriculumCreator) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        error: 'curriculum creator not found'
                    })
                    .end()
            }
            return res
                .status(200)
                .json({
                    success: true,
                    data: curriculumCreator
                })
                .end()
        })
        .catch(err => console.log(err));
}

exports.getLessons = async (req, res) => {
    await db.Curriculum.findById(req.params.id)
        .populate("created_by")
        .then((lessons, err) => {
            if (err) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        error: err
                    })
                    .end()
            }
            if (!lessons) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        error: 'curriculum creator not found'
                    })
                    .end()
            }
            return res
                .status(200)
                .json({
                    success: true,
                    data: lessons
                })
                .end()
        })
        .catch(err => console.log(err));
}

exports.update = async (req, res) => {
    await db.Curriculum.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, curriculum) => {
            if (err) {
                return res
                    .status(404)
                    .json({ err, message: 'Curriculum not found!' })
                    .end()
            }
            curriculum
                .then(() => {
                    return res
                        .status(200)
                        .json({
                            success: true,
                            id: curriculum._id,
                            message: 'Curriculum updated!'
                        })
                        .end()
                })
                .catch(error => {
                    return res
                        .status(404)
                        .json({
                            error,
                            message: 'Curriculum not updated!'
                        })
                        .end()
                })
        })
        .catch(err => console.log(err));
}