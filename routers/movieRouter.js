const express = require('express')
const router = express.Router();

// importo il controller
const movieController = require('../controllers/moviesController');


// ROTTE

// index 
// GET visualizzo tutti gli elementi posts/
router.get('/', movieController.index);

// show
// GET visualizzo un unico elemento posts/:id
router.get('/:id', movieController.show);

module.exports = router;