async function getInfo() {
    // read input value
    // request  to server === url
    // diplay data
    // check error

    let stopId = document.getElementById('stopId').value;
    let stopName = document.getElementById('stopName');
    let ulLi = document.getElementById('buses');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        ulLi.innerHTML = '';
        let response = await fetch(url);
        let data = await response.json();

        stopName.textContent = data.name;

        Object
            .entries(data.buses)
            .forEach((bus, time) => {
                let li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${time} minutes`;
                ulLi.appendChild(li);
            })

    } catch (error) {
        stopName.textContent = 'Error';
    }
}
