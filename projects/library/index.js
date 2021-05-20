let library = loadLibrary();
let bookshelf = document.getElementById('bookshelf');

class Book {
    constructor(title, author, pagesTotal, pagesRead, haveRead=true) {
        this.title = title;
        this.author = author;
        this.pagesTotal = pagesTotal;
        this.pagesRead = pagesRead;
        this.haveRead = haveRead;
    }
}

// function Book(title, author, pagesTotal, pagesRead, haveRead=true) {
//     this.title = title;
//     this.author = author;
//     this.pagesTotal = pagesTotal;
//     this.pagesRead = pagesRead;
//     this.haveRead = haveRead;
// }

const addBookForm = document.forms[0];

const addBookBtn = document.getElementById('addBookBtn');
addBookBtn.addEventListener('click', function() {
    library.push(new Book(
        addBookForm.elements['newTitle'].value,
        addBookForm.elements['newAuthor'].value,
        addBookForm.elements['newPageTotal'].value,
        addBookForm.elements['newPagesRead'].value,
        addBookForm.elements['haveRead'].value,
    ));
    //clears bookshelf before displaying
    clearLibrary();
    displayLibrary(library);
    updateLocalStorage(library);
});

function displayLibrary(library) {
    for(let i = 0; i<library.length; i++) {
        //creates text elements of book
        let book = document.createElement('div');
        let title = document.createElement('h3');
        let author = document.createElement('h4');
        let pageButtonsContainer = document.createElement('div');
        let haveRead = document.createElement('p');
        let pages = document.createElement('p');
        pages.classList.add('pages-read');

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.value = `${i}`;
        deleteButton.classList.add('deleteBtn');
        deleteButton.addEventListener('click', function() {
            library.splice(i, 1);
            updateLocalStorage(library);
            clearLibrary();
            displayLibrary(library);
        })

        //associates book div with index in library array
        book.setAttribute('data-index', `${i}`);

        //creates button container and buttons and sets classes 
        pageButtonsContainer.classList.add('pageButtonsContainer');
        let addPage = document.createElement('button');
        addPage.classList.add('pageButtons','blue-bg');
        addPage.textContent = '+';
        let completeBook = document.createElement('button');
        completeBook.classList.add('pageButtons','purple-bg');
        completeBook.textContent = '✓';
        completeBook.value = i;
        completeBook.addEventListener('click', function(e) {
            const bookToUpdate = library[e.target.value];
            if (bookToUpdate.haveRead) {
                bookToUpdate.haveRead = false;
            }else {
                bookToUpdate.haveRead = true;
            }
            clearLibrary();
            displayLibrary(library);
        })
        let removePage = document.createElement('button');
        removePage.classList.add('pageButtons','red-bg');
        removePage.textContent = '-';

        const currentBook = library[i];
        title.textContent = `${currentBook.title}`;
        author.textContent = `By ${currentBook.author}`;
        pages.textContent = `${currentBook.pagesRead}/${currentBook.pagesTotal} pages read`;
        book.classList.add('book');

        //toggles haveRead p 
        haveRead.textContent = (currentBook.haveRead) ?
        'Completed' : 'Incomplete';


        pageButtonsContainer.appendChild(removePage);
        pageButtonsContainer.appendChild(completeBook);
        pageButtonsContainer.appendChild(addPage);

        book.appendChild(deleteButton);
        book.appendChild(title);
        book.appendChild(author);
        book.append(haveRead);
        book.appendChild(pageButtonsContainer);
        book.appendChild(pages);
        bookshelf.appendChild(book);

        addBookForm.reset();
    }
    // addEventListenerToEditButtons();
}

function addEventListenerToEditButtons() {
    const editBtnList = document.getElementsByClassName('editBtn');
    for(let editBtn of editBtnList) {
        editBtn.addEventListener('click', function(e) {
            const bookIndex = parseInt(e.target.value);
            const bookToUpdate = library[bookIndex];
            const editFormDiv = document.getElementById('editFormDiv');
            editFormDiv.classList.remove('hide');
            editFormDiv.classList.add('show');
            const editTitle = document.getElementById('editTitle');
            const editAuthor = document.getElementById('editAuthor');
            const editPageTotal = document.getElementById('editPageTotal');
            const editPageCompleted = document.getElementById('editPageCompleted');
        
            editTitle.value = bookToUpdate['title'];
            editAuthor.value = bookToUpdate['author'];
            editPageTotal.value = bookToUpdate['pagesTotal'];
            editPageCompleted.value = bookToUpdate['pagesRead'];

            var updates = [editTitle.value, editAuthor.value, editPageTotal.value, editPageCompleted.value];

        
            const deleteButton = document.getElementById('deleteButton');
            const updateButton = document.getElementById('updateButton');  

            updateButton.addEventListener('click', function() {
                bookToUpdate.title = updates[0];
                bookToUpdate.author = updates[1];
                bookToUpdate.pagesTotal = updates[2];
                bookToUpdate.pagesRead = updates[3];
                clearLibrary();
                updateLibrary(library);
                editFormDiv.classList.add('hide');
                editFormDiv.classList.remove('show');

            })
        })
    }
}

function clearLibrary() {
    while(bookshelf.hasChildNodes()) {
        bookshelf.removeChild(bookshelf.lastChild);
    }
}

function updateLocalStorage(library) {
    let library_serialized = JSON.stringify(library);
    localStorage.setItem('library', library_serialized);
}

function loadLibrary() {
    if (localStorage.getItem('library') == null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('library'));
    }
}

displayLibrary(library);