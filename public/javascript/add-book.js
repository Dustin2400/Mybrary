async function newFormHandler(event) {
    event.preventDefault();
//were we planning to allow users to add a book after all or are we going to allow seeds to show the book on the directory? I do have a way to construct input forms of adding books in handlebars
    const title = document.querySelector('input[name="book-title"]').value;
    const author = document.querySelector('input[name="book-author"]').value;

    const response = await fetch(`/api/books`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            author
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/account');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.add-new-book').addEventListener('submit', newFormHandler);