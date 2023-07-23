async function solve() {
    let url = 'http://localhost:3030/jsonstore/collections/students';

    let table = document.querySelector('#results tbody');

    let response = await fetch(url);
    let data = await response.json();

    Object.values(data)
        .forEach(s => {
            let firstName = s.firstName;
            let lastName = s.lastName;
            let facultyNumber = s.facultyNumber;
            let grade = Number(s.grade);

            let tr = document.createElement('tr');

            let firstNameCell = tr.insertCell(0);
            firstNameCell.innerText = firstName;

            let lastNameCell = tr.insertCell(1);
            lastNameCell.innerText = lastName;

            let facultyNumberCell = tr.insertCell(2);
            facultyNumberCell.innerText = facultyNumber;

            let gradeCell = tr.insertCell(3);
            gradeCell.innerText = grade;

            table.appendChild(tr);
        });
    let submit = document.getElementById('submit');
    submit.addEventListener('click', onClickSubmit);

    async function onClickSubmit(e) {
        e.preventDefault();

        let firstNameInput = document.getElementsByName('firstName')[0];
        let lastNameinput = document.getElementsByName('lastName')[0];
        let facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        let gradeInput = document.getElementsByName('grade')[0];

        if (isNaN(facultyNumberInput.value)) {
            // && isNaN(gradeInput.value)   
            return alert('Wrong input format!')
        }

        if (firstNameInput.value !== '' &&
            lastNameinput.value !== '' &&
            facultyNumberInput !== '' &&
            gradeInput !== '') {

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstNameInput.value,
                    lastName: lastNameinput.value,
                    facultyNumber: facultyNumberInput.value,
                    grade: gradeInput.value
                }),
            })
            let tr = document.createElement('tr');

            let firstNameCell = tr.insertCell(0);
            firstNameCell.innerText = firstNameInput.value;

            let lastNameCell = tr.insertCell(1);
            lastNameCell.innerText = lastNameinput.value;

            let facultyNumberCell = tr.insertCell(2);
            facultyNumberCell.innerText = facultyNumberInput.value;

            let gradeCell = tr.insertCell(1);
            gradeCell.innerText = gradeInput.value;

            table.appendChild(tr);

        }
        firstNameInput.value = '';
        lastNameinput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }

}
solve();