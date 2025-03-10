// Importo il file che mi permette di connettermi al db
const connection = require('../data/db');

// INDEX
// GET visualizzo tutti gli elementi posts/

function index(req, res) {

    // salvo la query in una costante
    const sql = 'SELECT * FROM movies';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });



}


// show
// GET visualizzo un unico elemento posts/:id
function show(req, res) {


    // salviamo in una costante il valore dell'id dai params
    const { id } = req.params;

    // mi salvo in una costante la query
    const detailMovie = 'SELECT * FROM movies WHERE movies.id = ?';

    // eseguo la query
    connection.query(detailMovie, [id], (err, movieResult) => {

        if (err) return res.status(500).json({ error: 'Database query failed' });

        if (movieResult.length === 0) return res.status(404).json({ error: 'Post not found' });

        res.json(movieResult[0]);
    });
};



// esporto i controller
module.exports = { index, show }