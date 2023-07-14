async function lockedProfile() {
    try {
        let url = 'http://localhost:3030/jsonstore/advanced/profiles';
        let response = await fetch(url);
        let data = await response.json();

        Object.values(data)
            .forEach(profiles => {
                let div = document.createElement('div');
                div.classList.add('profile');

                let button = document.createElement('button');
                button.innerHTML = 'Show more';

                div.innerHTML = `
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="user${profiles._id}Locked" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="user${profiles._id}Locked" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user${profiles._id}Username" value = "${profiles.username}" disabled readonly />
        <div id="user${profiles._id}HiddenFields">
            <hr>
            <label>Email:</label>
            <input type="email" name="user${profiles._id}Email" value= "${profiles.email}" disabled readonly />
            <label>Age:</label>
            <input type="text" name="user${profiles._id}Age" value = "${profiles.age}" disabled readonly />
        </div>

        `
                let main = document.querySelector('main');
                main.innerHTML = '';

                div.appendChild(button);
                main.appendChild(div);

                button.addEventListener('click', createProfile);

                function createProfile(e) {
                    let checkedBtn = div.querySelector('input[type=radio]:checked');
                    if (checkedBtn && checkedBtn.value === 'unlock') {
                        if (e.target.textContent === 'Show more') {
                            div.querySelector(`#user${profiles._id}HiddenFields`).style.display = 'block';
                            e.target.textContent === 'Hide it';
                        }
                    }else{
                        div.querySelector(`#user${profiles._id}HiddenFields`).style.display = 'none';
                        e.target.textContent === 'Show more';
                    }
                    
                }
            });
    } catch (error) {
        console.log(error);
    }

}

