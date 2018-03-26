const http = require("http"),
      url = require('url'),
      TeamCityClient = require("./clients/TeamCityClient"),
      cors = require('cors'),
      config = require('../src/config');

http.createServer(function (req, res) {
    client = new TeamCityClient();

    let parts = url.parse(req.url, true);

    if (config.appSettings.debug) console.log(JSON.stringify(parts.query));

    res.writeHead(200, {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "content-type"
    });
    renderData = (data)=>{
        res.write(JSON.stringify(data));
        res.end();
    };

    let request = parts.query.request || '';
    let param = parts.query.param || '';

    client.callActionByName(request, param, renderData);

}).listen(config.appSettings.serverPort);

console.log("Server running at http://localhost:"+config.appSettings.serverPort+"/");