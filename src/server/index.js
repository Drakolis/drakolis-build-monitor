/* eslint-disable no-console */
const http = require("http");
const url = require("url");
require("cors");
const config = require("../shared/config");
const { AzureDevOps } = require("./clients/AzureDevOps");

http
  .createServer((req, res) => {
    const parts = url.parse(req.url, true);

    if (config.appSettings.debug) {
      console.log(JSON.stringify(parts.query));
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "content-type",
    });
    function renderData(data) {
      res.write(JSON.stringify(data));
      res.end();
    }
    const groupsWithClients = config.buildGroups.map((bg) => {
      if (bg.type === "azure") {
        return {
          ...bg,
          client: new AzureDevOps(
            bg.creds.orga,
            bg.creds.email,
            bg.creds.token
          ),
        };
      }
      return null;
    });

    const resultPromise = Promise.all(
      groupsWithClients
        .filter((bg) => bg)
        .map(async (bg) => {
          return {
            ...bg,
            builds: await Promise.all(
              bg.builds.map(async (build) => ({
                ...build,
                ...(await bg.client.getBuildDetails(bg.id, build.id)),
              }))
            ),
          };
        })
    );
    resultPromise.then((data) =>
      renderData(
        data.map((item) => ({
          type: item.type,
          id: item.id,
          name: item.name,
          builds: item.builds,
        }))
      )
    );
  })
  .listen(config.appSettings.serverPort);

console.log(
  `Server running at http://localhost:${config.appSettings.serverPort}/`
);
