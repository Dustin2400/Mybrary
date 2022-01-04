async function newFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    
    const response = await fetch(`/api/books/checkin/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            user_id: null,
            checked_out: false,
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
 
}

document.querySelector('.check-in-book').addEventListener('click', newFormHandler);