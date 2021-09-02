document.getElementById('search-results').style.display = 'none';

const searchBook = () => {
    const searchInput = document.getElementById('search-field');
    const inputValue = searchInput.value;
    searchInput.value = '';
    const url = `http://openlibrary.org/search.json?q=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
};

const displayBooks = (books) => {

    //console.log(books);

    const bookDetails = books.docs;
    const booksDiv = document.getElementById('books-div');
    booksDiv.textContent = '';

    if (bookDetails.length == 0) {
        const searchError = document.getElementById('search-results');
        const div = document.createElement('div');
        div.textContent = '';
        div.innerHTML = `<h6 class="text-center">Nothing is found. Please try again.</h6>`
        //div.innerText = '';
        searchError.appendChild(div);
        document.getElementById('search-results').style.display = 'block';
    }

    else {
        bookDetails.forEach(book => {
            //---------------
            // console.log(book);

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 border border-primary bg-info bg-opacity-10">
        <img src="${`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}"
            class="mx-auto p-2" width="200px" alt="...">
            <div class="card-body">
                <h4 class="card-title"> Book name: ${book.title} </h4>
                <h5> Author: ${book.author_name} </h5>
                <h6> Publisher:${book.publisher} </h6>
                <h6> First published: ${book.publish_date} </h6>
            </div>
        </div>
        `
            booksDiv.appendChild(div);
        });

        document.getElementById('search-results').style.display = 'none';
    }
};



/*
const resultNumbers = () => {

    const searchInput = document.getElementById('search-field');
    const inputValue = searchInput.value;
    const url = `http://openlibrary.org/search.json?q=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data))
}

const displayResult = (results) => {
    console.log(results)
    results.forEach(result => {
        const resultId = document.getElementById('search-results');
        resultId.innerHTML = `Total results found: ${result.numFound}`
    })

}
*/