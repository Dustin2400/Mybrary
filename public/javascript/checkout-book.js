async function newFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    
    const return_date = document.querySelector('#rangeDate').value;
    console.log(return_date);
    //for book check-out
    const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            checked_out: true,
            return_date
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

document.querySelector('.check-out-book').addEventListener('click', newFormHandler);