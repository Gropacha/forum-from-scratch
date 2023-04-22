const User = require("../models/user.model");
const { genSalt, hash} = require("bcrypt");

const createNewUser = async (req, res)=>{
    const { body } = req;
    const { error } = User.isValid(body, {abortEarly : false});
    if (error) return res.status(400).json(error.details);
    const isUserAlreadyRegistred = await User.findOne({email:body.email});
    if (isUserAlreadyRegistred) return res.status(400).json({msg : "email déjà utilisé"});
    
    const salt = await genSalt(10);
    // créé une clef unique pour le processus de hashache à suivre
    const passwordHashe = await hash(body.password, salt);
    // Hashache du password rentré par l'utilisateur
    const newUser = new User({...body, password:passwordHashe});
    // Un nouvel objet User est créé, le password est écrasé avec la valeur hashée
    await newUser.save();
    // Envoi de nouvel User vers la BDD
    // traiter l'affichage et le front avant l'envoi à la base de donnée
    return res.json({msg : `vous êtes sur la route createNewUser`, newUser});
};

const getUser = (req, res)=>{
    return res.json({msg : `vous êtes sur la route getUser id=${req.params.id}`});
};

const editUser = (req, res)=>{
    return res.json({msg : `vous êtes sur la route editUser id=${req.params.id}`});
};

const deleteUser = (req, res)=>{
    return res.json({msg : `vous êtes sur la route deleteUser id=${req.params.id}`});
};

const getAllUser = (req, res)=>{
    return res.json({msg : `vous êtes sur la route getAllUser`});
};

module.exports = { 
    createNewUser, 
    getUser, 
    editUser, 
    deleteUser, 
    getAllUser
};