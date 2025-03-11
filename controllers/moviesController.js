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



        // versione mappata del risultato
        const movies = results.map(movie => {

            return {
                ...movie,
                image: movie.image ? req.imagePath + movie.image : ""
            }
        })

        res.json(movies);
    });



}


// show
// GET visualizzo un unico elemento posts/:id
function show(req, res) {


    // salviamo in una costante il valore dell'id dai params
    const { id } = req.params;


    // mi salvo in una costante la query dei dettagli del film
    const detailMovie = 'SELECT * FROM movies WHERE movies.id = ?';


    // mi salvo in una costante la query per delle recensioni
    const review = 'SELECT * FROM reviews WHERE movie_id = ?';



    // eseguo la query per i film
    connection.query(detailMovie, [id], (err, movieResult) => {

        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResult.length === 0) return res.status(404).json({ error: 'Movie not found' });



        const movie = movieResult[0];

        // se la prima query va a buoon fine allora eseguo la query per le recensioni
        connection.query(review, [id], (err, reviewResult) => {

            if (err) return res.status(500).json({ error: 'Database query failed' });


            // aggiungo la prorpietà review ai film
            movie.reviews = reviewResult;

            // aggiungo il path alle recensioni
            movie.image = req.imagePath + movie.image

            // ritorno l'oggetto aggiornato
            res.json(movie);

        });

    });








};



// esporto i controller
module.exports = { index, show }