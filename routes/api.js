const router = require("express").Router();

const UserControl = require('../controllers/userControl');
const LessonControl = require('../controllers/lessonControl');

router.get('/', (req,res) => {
    return res.status(200).json({success: "true", message: "Welcome!"}).end();
});

router.post('/user/create', UserControl.create);
router.patch('/user/update/:id', UserControl.update);
router.delete('/user/delete', UserControl.delete);
router.get('/user/get/id/:id', UserControl.getId);
router.get('/user/get/all', UserControl.getAll);
router.get('/user/get/verify/:email/:password', UserControl.verifyUser);

router.post('/lessons/create', LessonControl.create);
router.patch('/lessons/update/:id', LessonControl.update);
router.delete('/lessons/delete/:id', LessonControl.delete);
router.get('/lessons/get/id/:id', LessonControl.getId);
router.get('/lessons/get/all', LessonControl.getAll);
router.get('/lessons/get/createdby/:id', LessonControl.getCreatedBy);

module.exports = router;