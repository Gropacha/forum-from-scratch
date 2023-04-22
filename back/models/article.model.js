const Joi = require("joi");
const { Schema, Types, model } = require("mongoose");

const articleSchema = new Schema({
    titre : {type:String, required:true},
    contenu : {type:String, required:true},
    auteur : {type:Types.ObjectId, ref:"users", required:true},
    likes : {type:[{type:Types.ObjectId, ref:"users"}], required:true}
});

const articleJoi = Joi.object({
    titre : Joi.string().min(5).max(128).required(),
    contenu : Joi.string().min(10).max(65000).required()
})

let Article = model("articles", articleSchema);
 Article.isValid = (article) => articleJoi.validate(article);

module.exports = Article;