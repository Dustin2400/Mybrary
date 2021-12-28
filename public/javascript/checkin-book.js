async function newFormHandler(event) {
    event.preventDefault();

    //for book check-in 
    const response = await fetch(`/api/books/${book_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            user_id: null,
            checked_out: false,
            // return_date: null - functionality not added
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

document.querySelector('.check-in-book').addEventListener('submit', newFormHandler);