const newFormHandler = async (event) => {
    event.preventDefault();
    console.log("BUTTON WORKS!!!!!!!!!!");

    const name = document.querySelector("#recipe-name").value.trim();
    const description = document.querySelector("#recipe-description").value.trim();
    const ingredients = document.querySelector("#ingredient-name").value.trim();
    const instructions = document.querySelector("#recipe-instructions").value.trim();
    console.log("Recipe Name:", name);
    console.log("Recipe Description:",description);
    console.log("Recipe Ingredients:", ingredients);
    console.log("Recipe Instructions:",instructions);

    if ( name && description &&ingredients && instructions) {
        const response = await fetch('/api/recipe', {
          method: 'POST',
          body: JSON.stringify({ name,description,ingredients,instructions }),
          headers: { 'Content-Type': 'application/json' },
        });
        // const response = await Promise.all([fetch('/api/recipe', {
        //     method: 'POST',
        //     body: JSON.stringify({ recipename,description,ingredients,instructions }),
        //     headers: { 'Content-Type': 'application/json' },
        //   }), fetch('api/recipe',{
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //   })]);
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to post recipe.');
        }
    };
};
document
.querySelector('.add-recipe-form')
.addEventListener('submit', newFormHandler);

