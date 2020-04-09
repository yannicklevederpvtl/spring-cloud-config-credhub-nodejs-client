import * as http from "http";
import App from "./app";
import { Logger } from "./logger/logger";
import { Config as ConfigServer } from 'cloud-foundry-config-client';

const logger = new Logger();

ConfigServer.load({
  // defines the application name to used when querying the config server
  appName: "config-demo-service",
  // "remote" will query the config server, "remoteSkipAuth" will query the config server skipping authorization step and "local" will read from a local yaml file
  configLocation: "remote",
  // profile to use when querying the config server, e.g "dev", "uat", "prod"
  profile: "prod",
  // the name of the config server in PCF
  configServerName: "configserver",
  // optional property to control logging of loaded config to console
  logProperties: true
}).then(() => { // on successful load, start the application

    logger.info("current config:::::" + JSON.stringify(ConfigServer.current));

    const port = 8080;
    App.set("port", port);

    const server = http.createServer(App);
    server.listen(port);

    server.on("listening", function(): void {
      const addr = server.address();
      const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
      logger.info(`Listening on ${bind}`);
   });

})

module.exports = App;
