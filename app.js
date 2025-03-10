const express = require('express');
const app = express();
const port = 3000;


// salvo i file delle rotte in una costante per importarli
const moviesRouter = require('./routers/movieRouter');






// definisco la cartella per i file statici
app.use(express.static('public'));





// registro il body-parser 
app.use(express.json());


// definsco la prima rotta con un semplice messaggio
app.get('/', (req, res) => {

    res.send("Server della web app")
})



//  invoco la rotta
app.use("/movies", moviesRouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
