import * as bodyParser from "body-parser";
import * as express from "express";
import Configs from "./routes/configs/configs";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get("/", (req, res, next) => {
            res.send("Config Demo Service API");
        });

        // user route
        this.express.use("/", Configs);

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct");
        });
    }
}

export default new App().express;
