async function voteClickHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch('/api/books/vote', {
        method: 'PUT',
        body: JSON.stringify({
            book_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#vote-a-book').addEventListener('click', voteClickHandler);