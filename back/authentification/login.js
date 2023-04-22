const { compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { Router } = require("express");
const User = require("../models/user.model");

loginRoute = Router();

loginRoute.post("/", async (req, res)=>{
    const { body } = req;
    const { error } = User.isValid(body, {abortEarly:false});
    if ( error ) return res.status(400).json(error.details);
    const userAlreadyRegistred = await User.findOne({ email : body.email });
    // les méthodes User.find({conditions}) renvoie un tableau d'User qui répond aux conditions
    if(!userAlreadyRegistred) return res.status(404).json({msg : "aucun profil trouvé avec ces identifiants"});
    // User.find({email:body.email}) => [{}, {}] ou []
    // User.findOne({email:body.email}) => {} ou null
    const verif = await compare(body.password, userAlreadyRegistred.password);
    // il n'est pas possible de faire nous même la comparaison => bcrypt.compare() va s'en occuper
    if (!verif) return res.status(404).json({msg : "aucun profil trouvé avec ces identifiants"});
    // pour renvoyer un jsonwebtoken nous allons utliser un module jsonwebtoken (à installer au préalable : npm i jsonwebtoken)
    const userWithoutPassword = {
        _id : userAlreadyRegistred._id,
        email : userAlreadyRegistred.email,
        pseudo : userAlreadyRegistred.email,
        role : userAlreadyRegistred.role
    };

    const token = sign(userWithoutPassword, process.env.JWT_SECRET);
    res.json({ msg: "Bienvenu", token : token }); // authentification => qui est l'utilistateur?
                                                // autorisation associé à l'utilisateur authentifié

    // jsonwebtoken : https://jwt.io
});

module.exports = loginRoute;