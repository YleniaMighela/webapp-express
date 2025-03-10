const express = require('express');
const app = express();
const port = 3000;


// salvo i file delle rotte in una costante per importarli
const moviesRouter = require('./routers/movieRouter');


// importiamo il middleware di gestione path imgs
const imagePath = require('./middlewares/imagePath');



// definisco la cartella per i file statici
app.use(express.static('public'));





// registro il body-parser 
app.use(express.json());

// registro il middleware del path delle immagini
app.use(imagePath);


// definsco la prima rotta con un semplice messaggio
app.get('/api', (req, res) => {

    res.send("Server della web app")
})



//  invoco la rotta
app.use("/api/movies", moviesRouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
