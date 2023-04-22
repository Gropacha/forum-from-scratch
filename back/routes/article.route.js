const { Router } = require("express");
const { 
    createNewArticle, 
    getArticle, 
    editArticle, 
    deleteArticle, 
    getAllArticle 
} = require("../controllers/article.controller")


const articleRoute = Router();

articleRoute.post("/", createNewArticle);       //  C

articleRoute.get("/:id", getArticle);           //  R

articleRoute.patch("/:id", editArticle);        //  U

articleRoute.delete("/:id", deleteArticle);     //  D

articleRoute.get("/", getAllArticle);

module.exports = articleRoute;