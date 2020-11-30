const db = require("../models");


exports.create = async ({ body }, res) => {
    const User = new db.User(body);
    User.save()
        .then(() => {
            return res
                .status(201)
                .json({
                    success: true,
                    id: User._id,
                    message: 'User created!'
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
    await db.User.findOne({ _id: req.params.id },
        (err, user) => {
            if (err) {
                return res
                    .status(400)
                    .json({ success: false, error: err })
                    .end()
            }
            if (!user.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Users not found` })
                    .end()
            }
            return res
                .status(200)
                .json({ success: true, data: user })
                .end()
        })
        .catch(err => console.log(err));
}

exports.getAll = async (req, res) => {
    await db.User.find({}, (err, user) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
                .end()
        }
        if (!user.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
                .end()
        }
        return res
            .status(200)
            .json({ success: true, data: user })
            .end()
    })
        .catch(err => console.log(err));
}

exports.getUserFavorite = async (req, res) => {
    await db.User.findOne({ _id: req.params.id })
        .populate("favorite")
        .then((userFavorite, err) => {
            if (err) {
                return res
                    .status(400)
                    .json({ success: false, error: err })
                    .end()
            }
            if (!userFavorite) {
                return res
                    .status(404)
                    .json({ success: false, error: `user favorites not found` })
                    .end()
            }
            return res
                .status(200)
                .json({ success: true, data: userFavorite })
                .end()
        })
        .catch(err => console.log(err));
}

exports.getUserCurriculum = async (req, res) => {
    await db.User.findOne({ _id: req.params.id })
        .populate("curriculum")
        .then((userCurriculum, err) => {
            if (err) {
                return res
                    .status(400)
                    .json({ success: false, error: err })
                    .end()
            }
            if (!userCurriculum) {
                return res
                    .status(404)
                    .json({ success: false, error: `user curriculum not found` })
                    .end()
            }
            return res
                .status(200)
                .json({ success: true, data: userCurriculum })
                .end()
        })
        .catch(err => console.log(err));
}

exports.update = async (req, res) => {
    await db.User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, user) => {
            if (err) {
                return res
                    .status(404)
                    .json({ err, message: 'User not found!' })
                    .end()
            }
            // the code below may be redundant error handling.
            user
                .then(() => {
                    return res
                        .status(200)
                        .json({
                            success: true,
                            id: user._id,
                            message: 'User updated!'
                        })
                        .end()
                })
                .catch(error => {
                    return res.status(404)
                        .json({
                            error,
                            message: 'User not updated'
                        })
                        .end()
                })
        })
        .catch(err => console.log(err));
}

exports.delete = async (req, res) => {
    await db.User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res
                .status(400)
                .json({
                    success: false,
                    error: err
                })
                .end()
        }
        if (!user) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: `User not found`
                })
                .end()
        }
        return res
            .status(400)
            .json({
                success: true,
                message: `this user was successfully deleted!`,
                data: user
            })
            .end()
    })
        .catch(err => console.log(err));
}