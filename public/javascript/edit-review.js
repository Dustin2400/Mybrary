async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]; 
    const content = document.querySelector('textarea[name="review-content"]').value.trim();
    console.log(id, content);

    const response = await fetch(`/api/reviews/${id}`, {
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