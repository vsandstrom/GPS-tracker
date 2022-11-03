# GPS-tracker
### GPS tracker logging location in a JSON file

WIP: exploring geolocation object to see if it can be used for spatial audio for the browser.

The tracking is only allowed on trusted sites, and as the script runs an 'http'-server only, you can only access it through 'localhost'.
At it's current state, you should only be able to track yourself, and even then the browser asks for permission.

compile typescript files into javascript.
```bash
$ tsc
```

host the static files with npx
```bash
$ npx serve
```
(this is temporary, should be handled by the node server directly)

run the node server
```bash
$ node app.js <port>
```
