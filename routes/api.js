const router = require("express").Router();

const UserControl = require('../controllers/userControl');
const CurriculumControl = require('../controllers/curriculumControl');
const LessonControl = require('../controllers/lessonControl');

router.get('/', (req,res) => {
    return res.status(200).json({success: "true", message: "Welcome!"}).end();
});

router.post('/user/create', UserControl.create);
router.get('/user/get/id/:id', UserControl.getById);
router.get('/user/get/all', UserControl.getAll);
router.get('/user/get/favorites/:id', UserControl.getUserFavorite);
router.get('/user/get/curriculum/:id', UserControl.getUserCurriculum);
router.patch('/user/update/:id', UserControl.update);
router.delete('/user/delete/:id', UserControl.delete);
// router.get('/user/get/verify/:email/:password', UserControl.verifyUser);

router.post('/curriculum/create', CurriculumControl.create);
router.get('/curriculum/get/id/:id', CurriculumControl.getById);
router.get('/curriculum/get/all', CurriculumControl.getAll);
router.get('/curriculum/get/creator/:id', CurriculumControl.getCurriculumCreator);
router.get('/curriculum/get/lessons/:id', CurriculumControl.getLessons);
router.patch('curriculum/update/:id', CurriculumControl.update);
router.delete('curriculum/delete/:id', CurriculumControl.delete);

router.post('/lesson/create', LessonControl.create);
router.get('/lesson/get/id/:id', LessonControl.getById);
router.get('/lesson/get/all', LessonControl.getAll);
router.get('/lesson/get/creator/:id', LessonControl.getLessonCreator);
router.patch('/lesson/update/:id', LessonControl.update);
router.delete('/lesson/delete/:id', LessonControl.delete);

module.exports = router;