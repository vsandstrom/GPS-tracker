let gps: HTMLElement = document.getElementById("getLocation");
let contGps: HTMLElement = document.getElementById("getContinuousLocation");
let container: HTMLElement = document.getElementById("container");
const url: string = "http://127.0.0.1:5000";


const showLocation = () => {
    console.log("hello");
    navigator.geolocation.getCurrentPosition( async (pos) => {
        let time: Date = new Date(pos.timestamp);
        console.log(time);
        container.innerHTML = 
        `
        Location @: ${time}<br>
        latitude: ${pos.coords.latitude}<br>
        longitude: ${pos.coords.longitude}<br>
        heading: ${pos.coords.heading}<br>
        speed: ${pos.coords.speed}<br>

        `
        let msg: Object = {
                timestamp: pos.timestamp,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude

        };

        let param: Object = {
            headers:{
                "content-type":"application/json; charset=UTF-8"
            },
            body: JSON.stringify(msg),
            method: "POST"
        }

        console.log(param);

        // send http request
        await fetch(url, param);

    })
};

let intervalID:any = 0;
// const showContinuous2 = async (e: MouseEvent) => {
//     let elem = e.target as HTMLButtonElement;
//
//
//
//
// }

const showContiuous = (e: MouseEvent) => {
    // start tracking position
    let el = e.target as HTMLButtonElement;
    if(!!intervalID) {
        el.innerHTML = "stopTracking";

        intervalID = setInterval(() => {
            navigator.geolocation.getCurrentPosition(async (pos: GeolocationPosition) => {
                let time: Date = new Date(pos.timestamp);
                console.log(time);
                container.innerHTML =
                `
                Location @: ${time}<br>
                latitude: ${pos.coords.latitude}<br>
                longitude: ${pos.coords.longitude}<br>
                `

                let msg: Object = {
                        timestamp: pos.timestamp,
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                };
                
                let param: Object = {
                    headers:{
                        "content-type":"application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(msg),
                    method: "POST"
                }

                console.log(param);

                // send http request
                await fetch(url, param);

            })
        }, 1500);
    }
}

if ('geolocation' in navigator){
    gps.addEventListener("click", showLocation);
    contGps.addEventListener("click", showContiuous);

} else {
    container.innerHTML = "no navigator available at this time to aid u on ur quest";
}
