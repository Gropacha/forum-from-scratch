const  connexionMongoDB  = require("./back/config");
const raccordementDesRoutes = require("./back/routes/routes");
const { maintenant } = require("./utilitaires/formatDate");

(async ()=> {
    try  { 
        const app = await connexionMongoDB(); 
        console.log(`${maintenant()} / Connexion à mongoDB en mode ${process.env.NODE_ENV?"PROD":"DEV"} réussie`);
        raccordementDesRoutes(app);
        const PORT = process.env.PORT || 777; // choix d'un port pour le localhost:
        app.listen(PORT, ()=>console.log(`${maintenant()} / Serveur à l'écoute sur le port ${PORT}`));
    }
    catch(err) {console.log(err)};
})();
