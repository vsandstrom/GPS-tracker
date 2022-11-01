const cors = require('cors');
const http = require("http");
const express = require("express");
const app = express();
const fs = require('fs');

// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.json());

let corsOpts = {
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOpts));

const path = "path.txt";

app.post('/', (req) => {
    console.log(req.body);

    fs.appendFile(path, JSON.stringify(req.body), (err) => {
        if (err) throw "error writing to file: " + err;
        console.log("success");
    })

})

const server = http.createServer(app).listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("http://%s:%s", host, port)
})
