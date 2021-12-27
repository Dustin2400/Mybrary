async function newFormHandler(event) {
    event.preventDefault();

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

    //realized we have not established a dashboard route yet - we should get that figured out as we go on 
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.add-new-book').addEventListener('submit', newFormHandler);