import cors = require('cors');
import * as http from "http";
import * as fs from 'fs';
import express, {Express, Request, Response} from "express";
const app: Express = express();

// TODO: Byt riktning på API, polla clienten från serversidan, istället för att skicka från clientsidan.

app.use(express.json());


let corsOpts = {
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOpts));

app.use(express.static('public'));

const path = "path.json";

app.post('/', (req: Request, _res: Response) => {
    console.log(req.ip);


    let msg: Object = {
        ip: req.ip,
        msg: req.body,
    }

    fs.appendFile(path, JSON.stringify(msg, null, 4), (err: Error) => {
        if (err) throw "error writing to file: " + err;
        console.log("success");
    })
})

const server = http.createServer(app).listen(process.argv[2], () => {
    const host = server.address();
    // const port = server.address().port;
    console.log("http://%s", host)
})
