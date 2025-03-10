function notFound(req, res, next) {
    res.status(404);
    res.json({
        error: "not found",
        message: "Questa pagina non è stata trovata"
    });
};

module.exports = notFound;