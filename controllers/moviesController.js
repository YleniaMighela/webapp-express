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


// SHOW
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



// store
// POST creo un nuovo elemento 
function store(req, res, next) {
    const { title, director, genre, abstract } = req.body;

    // gestiamo il valore del nome file creato dal middleware
    const imageName = `${req.file.filename}`;

    // salvo la query in una coostante, Values sono con il segnaposto perchè verranno controllate durante l'esecuzione della query (prepared statements)
    const query = "INSERT INTO movies (title, director, genre, image, abstract) VALUES (?, ?, ?, ?, ?)";

    // Eseguiamo la query
    connection.query(query,
        [title, director, genre, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"));
            }

            res.status(201).json({
                status: "success",
                message: "Film creato con successo!",
            });
        })
};


// SHOW
// POST inserisce un nuovo dato
function storeReview(req, res) {
    // salviamo in una costante il valore dell'id dai params
    const { id } = req.params;

    // salviamo in una costante il valore delle restanti informazioni del body
    const { text, name, vote } = req.body;


    // salvo la query in una coostante, Values sono con il segnaposto perchè verranno controollate durante l'esecuzione della query (prepared statements)
    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    // Eseguiamo la query
    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });
    });

};

// esporto i controller
module.exports = { index, show, storeReview, store }