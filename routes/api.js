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

router.post('/lessons/create', LessonControl.create);
router.patch('/lessons/update/:id', LessonControl.update);
router.delete('/lessons/delete/:id', LessonControl.delete);
router.get('/lessons/get/id/:id', LessonControl.getId);
router.get('/lessons/get/all', LessonControl.getAll);
router.get('/lessons/get/createdby/:id', LessonControl.getCreatedBy);

module.exports = router;