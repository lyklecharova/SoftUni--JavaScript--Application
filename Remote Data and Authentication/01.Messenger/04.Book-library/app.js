function solve(){
    let url = 'http://localhost:3030/jsonstore/collections/books';
    let loadBooks = document.getElementById('loadBooks');

    loadBooks.addEventListener('click',loadBook);

    async function loadBook(){
        let response =await fetch(url)
        let data = await response.json();
        console.log(data);

        Object.values(data).forEach(book =>{
            let {author, title} = book;
            
        })
    }
}
solve()