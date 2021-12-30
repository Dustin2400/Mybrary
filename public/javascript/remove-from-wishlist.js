buttonEl = document.querySelector('#remove-from-wishlist')

async function removeFromWishlist(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    console.log(id);
    const response = await fetch('/api/books/wishlistRemove', {
        method: 'DELETE',
        body: JSON.stringify({
            book_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

buttonEl.addEventListener('click', removeFromWishlist);