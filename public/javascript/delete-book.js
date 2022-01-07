async function deleteBook(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch (`/api/books/${id}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-book').addEventListener('click', deleteBook);