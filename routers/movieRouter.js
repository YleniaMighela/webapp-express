const express = require('express')
const router = express.Router();

// importo il middleware per gestire il file
const upload = require('../middlewares/multer');

// importo il controller
const movieController = require('../controllers/moviesController');


// ROTTE

// index 
// GET visualizzo tutti gli elementi posts/
router.get('/', movieController.index);


// GET visualizzo un unico elemento posts/:id
router.get('/:id', movieController.show);


// POST visualizzo il nuovo dato
router.post('/:id/reviews', movieController.storeReview);


// STORE visualizzo il nuovo dato
router.post('/', upload.single('image'), movieController.store);



module.exports = router;