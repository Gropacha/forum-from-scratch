const userRoute = require("./user.route");
const articleRoute = require("./article.route");

const raccordementDesRoutes =  (express) => {
express.use("/user", userRoute);
express.use("/article", articleRoute)
}

module.exports = raccordementDesRoutes;