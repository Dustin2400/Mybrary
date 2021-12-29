async function newFormHandler(event) {
    event.preventDefault();

    // const id = document.querySelector('input[name="review-id"]').value; 
    const content = document.querySelector('textarea[name="review-content"]').value.trim();

    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            // id, 
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    //account route replaces dashboard if visible in other public files
    if(response.ok) {
        document.location.replace('/account')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.add-review').addEventListener('submit', newFormHandler);