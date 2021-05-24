const router = require ('express').Router();
const multer = require("multer");
const upload = multer();
const authController = require ('../controllers/authController')
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');

// s'inscrire
router.post("/register", authController.signUp);
// se connecter
router.post('/login', authController.signIn)
// se deconnecter
router.get('/logout', authController.logout)


// user dispaly: 'block'
router.get('/',userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.put('/place/:id',userController.addSearchedPlaceToUser)

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);
//router.post("/addUserPlace/:id", userController.addSearchedPlaceToUser);

module.exports = router;