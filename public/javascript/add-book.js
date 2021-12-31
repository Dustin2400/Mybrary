async function newFormHandler(event) {
    event.preventDefault();
//were we planning to allow users to add a book after all or are we going to allow seeds to show the book on the directory? I do have a way to construct input forms of adding books in handlebars
    const title = document.querySelector('input[name="book-title"]').value;
    const author = document.querySelector('input[name="book-author"]').value;
    const name = document.querySelector('input[name="new-category"]').value;
    let category_id;
    if(!name) {
        const category = document.getElementById("category-name");
        category_id = category.options[category.selectedIndex].getAttribute("id");
    } else {
        const newCatResponse = await fetch('/api/categories', {
            method: 'POST',
            body: JSON.stringify({
                name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
            
        });
        
        if(newCatResponse.ok) {
                
            } else {
                alert(newCatResponse.statusText);
            }
        const url = 'api/categories/' + name;
        const newCategoryResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(newCategoryResponse.ok) {
            newCategory = await newCategoryResponse.json();
            console.log(newCategory)
            category_id = newCategory.id;
        } else {
            alert(newCategoryResponse.statusText);
        }
    }
    console.log(title, author, category_id);
    const response = await fetch(`/api/books`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            author,
            category_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/account');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.add-new-book').addEventListener('submit', newFormHandler);