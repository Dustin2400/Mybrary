async function editFormHandler(event) {
    event.preventDefault();

    const id = document.querySelector('input[name="review-id"]').value.trim(); 
    const content = document.querySelector('textarea[name="review-content"]').value.trim();

    const response = await fetch(`/api/reviews/${review_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id,
            content,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/account')
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.edit-review').addEventListener('submit', editFormHandler);