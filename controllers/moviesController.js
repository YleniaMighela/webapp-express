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


// esporto i controller
module.exports = { index }