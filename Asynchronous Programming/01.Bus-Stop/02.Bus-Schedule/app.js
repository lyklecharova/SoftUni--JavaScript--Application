function solve() {
    // read input value
    let spannInfo = document.querySelector('#info span');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    let stopId = {
        next: 'depot'
    };
    async function depart() {
        // request  to server === url
        // get info for next stop
        // display next stop
        departBtn.disabled = true;
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stopId.next}`;
        let response = await fetch(url);
        stopId = await response.json();

        spannInfo.textContent = `Next stop ${stopId.name}`

        arriveBtn.disabled = false;
    }

    async function arrive() {
        arriveBtn.disabled = true;
        spannInfo.textContent = `Arriving at ${stopId.name}`

        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();