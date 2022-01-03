async function newFormHandler(event) {
    event.preventDefault();

    const book_el = document.querySelector('#review-content');
    const content = document.querySelector('textarea[name="review-content"]').value.trim();
    const book_id = book_el.getAttribute('data-id');

    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            content,
            book_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(content, response);

    if(response.ok) {
        document.location.replace('/account')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.add-review').addEventListener('submit', newFormHandler);