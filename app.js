const express = require('express');
const app = express();
const port = 3000;


// salvo i file delle rotte in una costante per importarli
const moviesRouter = require('./routers/movieRouter');

// IMPORTAZIONE MIDDLEWARE

// importiamo il middleware di gestione path imgs
const imagePath = require('./middlewares/imagePath');

// importo il middleware di gestione errore del server
const errorServer = require("./middlewares/errorServer");

// importo il middleware di gestione errore 404 
const notFound = require("./middlewares/notFound");




// definisco la cartella per i file statici
app.use(express.static('public'));


// registro il body-parser 
app.use(express.json());


// SEZIONE MIDDLEWARE IMAGE

// registro il middleware del path delle immagini
app.use(imagePath);




// SEZIONE ROTTE

// definsco la prima rotta con un semplice messaggio
app.get('/api', (req, res) => {

    res.send("Server della web app")
})



//  invoco la rotta
app.use("/api/movies", moviesRouter)


// SEZIONE MIDDLEWARE GESTIONE ERRORE
// utilizzo middleware di gestione errore server
app.use(errorServer);

// utilizzo middleware di gestione errore 404 
app.use(notFound);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
