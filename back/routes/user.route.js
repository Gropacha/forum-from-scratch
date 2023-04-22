const { Router } = require("express");
const { 
    createNewUser, 
    getUser, 
    editUser, 
    deleteUser, 
    getAllUser 
} = require("../controllers/user.controller");


const userRoute = Router();

userRoute.post("/", createNewUser);       //  C

userRoute.get("/:id", getUser);           //  R

userRoute.patch("/:id", editUser);        //  U

userRoute.delete("/:id", deleteUser);     //  D

userRoute.get("/", getAllUser);

module.exports = userRoute;