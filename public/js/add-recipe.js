async function newFormHandler(event) {
    event.preventDeafault();

    const recipeName = document.querySelector("#recipe-name").value;
    const recipeDescription = document.querySelector("#recipe-description").value;
    const recipeIngredient = document.querySelector("#ingredient-name").value;

    const response = await fetch ('/api/recipe', {
        method: 'POST',
        body: JSON.stringify({
            recipeName,
            recipeDescription,
            recipeIngredient
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#').addEventListener('add-recipe', newFormHandler);