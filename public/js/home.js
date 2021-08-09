const viewRecipe = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/recipe/:id");
  } else {
    alert("Failed to log out.");
  }
};

// const newFormHandler = async (event) => {
//   event.preventDefault();
//   console.log("BUTTON WORKS!!!!!!!!!!");
//   const recipeName = document.querySelector("#recipe-name").value.trim();
//   const recipeDescription = document
//     .querySelector("#recipe-description")
//     .value.trim();
//   const recipeIngredient = document
//     .querySelector("#ingredient-name")
//     .value.trim();
//   const recipeInstructions = document
//     .querySelector("#recipe-instructions")
//     .value.trim();
//   console.log("Recipe name:", recipeName);
//   console.log("Recipe Description:", recipeDescription);
//   console.log("Recipe Ingredients:", recipeIngredient);
//   console.log("Recipe Instructions:", recipeInstructions);
//   if (
//     recipeName &&
//     recipeDescription &&
//     recipeIngredient &&
//     recipeInstructions
//   ) {
//     const response = await fetch("/api/recipe", {
//       method: "POST",
//       body: JSON.stringify({
//         recipeName,
//         recipeDescription,
//         recipeIngredient,
//         recipeInstructions,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     // const response = await Promise.all([fetch('/api/recipe', {
//     //     method: 'POST',
//     //     body: JSON.stringify({ recipeName,recipeDescription,recipeIngredient,recipeInstructions }),
//     //     headers: { 'Content-Type': 'application/json' },
//     //   }), fetch('api/recipe',{
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //   })]);
//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to post recipe.");
//     }
//   }
// };

document.querySelector("#viewRecipe").addEventListener("click", viewRecipe);

document.querySelector("#addRecipe").addEventListener("submit", newFormHandler);
