async function deleteFormHandler(event) {
    event.preventDefault();

    const review_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/reviews/${review_id}`, {
        method: 'DELETE'
    });
 
    if(response.ok) {
        document.location.replace('/account');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-review-btn').addEventListener('click', deleteFormHandler);