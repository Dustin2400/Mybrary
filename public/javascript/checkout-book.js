async function newFormHandler(event) {
    event.preventDefault();

    //for book check-out
    const response = await fetch(`/api/books/${book_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            checked_out: true,
            // return_date: null - functionality not added
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/account');
    } else {
        alert(response.statusText);
    }

    //userid can get pulled from session 
}

document.querySelector('.check-out-book').addEventListener('submit', newFormHandler);