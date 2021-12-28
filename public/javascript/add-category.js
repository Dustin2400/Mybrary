async function newFormHandler(event) {
    event.preventDefault();

    const id = document.querySelector('input[name="category-id"]').value; 
    const name = document.querySelector('input[name="category-name"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            id,
            name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    //again no dashboard yet lol 
    if(response.ok) {
        document.location.replace('/account');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.add-new-category').addEventListener('submit', newFormHandler);