async function newFormHandler(event) {
    event.preventDefault();

    // const user_id = document.querySelector('input[name="review-id"]').value; 
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

    //account route replaces dashboard if visible in other public files
    if(response.ok) {
        document.location.replace('/account')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.add-review').addEventListener('submit', newFormHandler);