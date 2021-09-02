//---- Display none to total search results and error message section.
document.getElementById('search-results').style.display = 'none';
document.getElementById('total-results').style.display = 'none';

//----Showing results when search for a book after clicking button
const searchBook = () => {
    const searchInput = document.getElementById('search-field');
    const inputValue = searchInput.value;
    searchInput.value = '';
    const url = `https://openlibrary.org/search.json?q=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
};

const displayBooks = (books) => {
    const bookDetails = books.docs;
    const booksDiv = document.getElementById('books-div');
    booksDiv.textContent = '';

    //---- Show an error message if nothing related to the search is not found
    if (bookDetails.length === 0) {
        const searchError = document.getElementById('search-results');
        searchError.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `<h6 class="text-center">Nothing is found. Please try again.</h6>`
        searchError.appendChild(div);
        document.getElementById('search-results').style.display = 'block';
        document.getElementById('total-results').style.display = 'none';
    }

    else {
        bookDetails.forEach(book => {
            //----Displaying informations about books
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

        //----Show total number of search results as many of them are similiar
        const totalResults = document.getElementById('total-results');
        totalResults.textContent = '';
        const resultsDiv = document.createElement('div');
        resultsDiv.innerHTML = `<h5 class="text-center"> Total results found: ${bookDetails.numFound} </h5>`;
        totalResults.appendChild(resultsDiv);

        document.getElementById('total-results').style.display = 'block';
        document.getElementById('search-results').style.display = 'none';
    }
};