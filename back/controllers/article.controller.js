
const createNewArticle = (req, res)=>{
    return res.json({"msg" : `vous êtes sur la route createNewArticle`, "user":{"body":req.body, "params":req.params ,"headers":req.headers}});
};

const getArticle = (req, res)=>{
   return res.json({"msg" : `vous êtes sur la route getArticle id=${req.params.id}`});
};

const editArticle = (req, res)=>{
   return res.json({"msg" : `vous êtes sur la route editArticle id=${req.params.id}`});
};

const deleteArticle = (req, res)=>{
   return res.json({"msg" : `vous êtes sur la route deleteArticle id=${req.params.id}`});
};

const getAllArticle = (req, res)=>{
   return res.json({"msg" : `vous êtes sur la route getAllArticle`});
};

module.exports = { 
   createNewArticle, 
   getArticle, 
   editArticle, 
   deleteArticle, 
   getAllArticle
};