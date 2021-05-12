const router = require ('express').Router();

const bookingController = require ('../controllers/bookingController')

router.get('/',bookingController.getBooking);
router.post('/',bookingController.createBooking);
router.put('/:id',bookingController.updateBooking);
router.delete('/:id',bookingController.deleteBooking);


router.patch('/reserver/:id', bookingController.reserverTour)




module.exports = router;