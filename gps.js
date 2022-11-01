
let gps = document.getElementById("getLocation");
let container = document.getElementById("container");

const showLocation = () => {
    if ('geolocation' in navigator) {
        console.log("hello");
        navigator.geolocation.getCurrentPosition((pos) => {
            let time = new Date(pos.timestamp);
            console.log(time);
            container.innerHTML = 
            `
            Location @: ${time}<br>
            latitude: ${pos.coords.latitude}<br>
            longitude: ${pos.coords.longitude}<br>
            `

            let msg = {
                    timecode: time,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
            };
            
            const url = "http://127.0.0.1:8080";

            let param = {
                headers:{
                    "content-type":"application/json; charset=UTF-8"
                },
                body: JSON.stringify(msg),
                method: "POST"
            }

            console.log(param);

            fetch(url, param);


        })
                


    }
        container.innerHTML = "no navigator available at this time to aid u on ur quest";

};

gps.addEventListener("click", showLocation);
