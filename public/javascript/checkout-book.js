async function newFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    
    const return_date = document.querySelector('#rangeDate').value;
    
    const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            checked_out: true,
            return_date
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

document.querySelector('.check-out-book').addEventListener('click', newFormHandler);