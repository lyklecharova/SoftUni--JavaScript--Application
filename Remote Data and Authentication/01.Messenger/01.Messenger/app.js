let url = 'http://localhost:3030/jsonstore/messenger';
let messages = document.getElementById('messages');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', postRequest);
    document.getElementById('refresh').addEventListener('click', getAllMessages);
}
async function postRequest() {
    // get information from input fields
    // before POST request,check if the fields are empty
    let [author, content] = [document.getElementById('author'), document.getElementById('content')];
    if (author.value !== '' || content.value !== '') {
        await request(url, { author: author.value, content: content.value });

        author.value = '';
        content.value = '';
    }
}
async function getAllMessages() {
    let response = await fetch(url);
    let data = await response.json();

    messages.value =
        Object.values(data)
            .map(({ author, content }) => `${author}: ${content}`)
            .join('\n');
}
async function request(url, option) {
    if (option) {
        option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(option)
        };
    }
    let response = await fetch(url, option);
    return response.json();
}
attachEvents();

