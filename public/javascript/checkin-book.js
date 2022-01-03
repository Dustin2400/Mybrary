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

    
    //test and insert date format for checked in book date, followed by seeing previous checkout date
    
    //takes in checkin attribute from true to false
    //PUT method
    //then adds the user_id to see who is checking in the book and becomes null

    if(response.ok) {
        document.location.replace('/account');
    } else {
        alert(response.statusText);
    }
 
}

document.querySelector('.check-in-book').addEventListener('click', newFormHandler);