import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../../logger/logger";
import { Config as ConfigServer } from 'cloud-foundry-config-client';
import { Configuration } from "../../models/configuration/model";

class Configs {

    public express: express.Application;
    public logger: Logger;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        // request to get all the properties
        this.express.get("/properties", (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            res.json(new Configuration(ConfigServer.current["config-demo-service"].stringsampleproperty,ConfigServer.current["config-demo-service"].intsampleproperty));
        });

    }
}

export default new Configs().express;
