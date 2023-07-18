async function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/phonebook';

    let ul = document.getElementById('phonebook');
    let btnLoad = document.getElementById('btnLoad');
    let person = document.getElementById('person');
    let phone = document.getElementById('phone');
    let btnCreate = document.getElementById('btnCreate');

    btnLoad.addEventListener('click', onLoadBtn);
    btnCreate.addEventListener('click', onCreateBtn);

    async function onLoadBtn() {
        ul.innerHTML = '';
        let response = await fetch(url);
        let data = await response.json();

        Object.values(data)
            .forEach(contact => {
                let { person, phone, _id } = contact;
                let li = createEl('li', `${person}: ${phone}`, ul);
                li.setAttribute('id', _id);

                let btnDelete = createEl('button', 'Delete', li);
                btnDelete.setAttribute('button', 'Delete');
                btnDelete.addEventListener('click', onDelete);
            })
    }

    function createEl(type, text, appender) {
        let result = document.createElement(type);
        result.textContent = text;
        appender.appendChild(result);

        return result;
    }

    async function onDelete(e) {
        let id = e.target.parentNode.id;
        e.target.parentNode.remove();

        let response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
    }
    async function onCreateBtn() {
        if (person.value !== '' && phone.value !== '') {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    person: person.value,
                    phone: phone.value,
                })
            })
            person.value = '';
            phone.value = '';
        }
    }

}

attachEvents();