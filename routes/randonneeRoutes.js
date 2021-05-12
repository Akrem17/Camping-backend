const router = require ('express').Router();

const randonneeController = require ('../controllers/randonneeController')

//ajout RANDONNE route
router.post('/add_randonnee', randonneeController.add_randonnee);
console.log("hif")
//fetching all Randonnes route
router.get('/get_randonnee', randonneeController.get_randonnee);
//fetching by Randonne_ID route
router.get('/get_randonnee/:randonneeId', randonneeController.getbyId_randonnee);
//update randonnee route
router.put('/update_randonnee/:id', randonneeController.update_randonnee);
//delete randonnee route
router.delete('/delete_randonnee/:id', randonneeController.delete_randonnee);


module.exports = router