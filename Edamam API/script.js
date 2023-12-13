apiId = '5ab8e6ed';
apiKey = '09a80b5e169f716caebf46aba639a975';
diet = '';

//high-fiber, high-protein, low-carb, low-fat, low-sodium

cuisineType = 'American';
//American, Asian, British, Caribbean, Central Europe, Chinese, Eastern Europe, French, 
//Indian, Italian, Japanese, Kosher, Mediterranean, Mexican, Middle Eastern, Nordic, South American, South East Asian

mealType = '';
//Breakfast, Brunch, Dinner, Lunch

dishType = '';
//Desserts, Drinks, Main Course, Pasta, Pizza, Salad, Sandwiches, Side-Dish, Soup, Starter

function getRecipe() {
    let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${apiId}&app_key=${apiKey}`;
    
    if (diet !== '') {
        apiUrl += `&diet=${diet}`;
    }
    if (cuisineType !== '') {
        apiUrl += `&cuisineType=${cuisineType}`;
    }
    if (mealType !== '') {
        apiUrl += `&mealType=${mealType}`;
    }
    if (dishType !== '') {
        apiUrl += `&dishType=${dishType}`;
    }
    
    
    return fetch(apiUrl)
        .then(response => {
            if(!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(data => {
            // uncomment below to test
            // console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

const recipeName = $('#recipeName');
const recipeUrl = $('#recipeUrl');
const recipeIngredients = $('#recipeIngredients');
const recipeInstruction = $('#recipeInstruction');
const recipeCalories = $('#recipeCalories');
const recipeCuisineType = $('#recipeCuisineType');
const recipeDietLabels = $('#recipeDietLabels');
const recipeDishType = $('#recipeDishType');
const recipeMealType = $('#recipeMealType');

async function displayRecipe() {
    const recipeData = await getRecipe();
    // below should pull the same data that is returned in the getRecipe function
    // uncomment below to test
    // console.log("displayRecipe Data: ", recipeData);

    if (recipeData) {
        const { hits } = recipeData;
        const imageUrl = hits[0].recipe.images.REGULAR.url;
        console.log("Entire API information of the First Object from the Array", hits[0])
        console.log("Specific Recipe Info", hits[0].recipe)
        console.log("Specific Recipe URL", hits[0].recipe.url)
        console.log("Specific Recipe Name", hits[0].recipe.label)
        console.log("Specific Recipe Ingredients", hits[0].recipe.ingredientLines)
        console.log("Specific Recipe Instructions", hits[0].recipe.instructionLines)
        //Different things to call and test
        //Calories: hits[0].recipe.calories
        //Cuisine Type: hits[0].recipe.cuisineType
        //Diet Labels: hits[0].recipe.dietLabels
        //Dish Type: hits[0].recipe.dishType
        //Image: hits[0].recipe.image
        //Different Size Images: hits[0].recipe.images.LARGE|REGULAR|SMALL|THUMBNAIL
        //Meal Type: hits[0].recipe.mealType
        recipeName.text(hits[0].recipe.label);
        recipeUrl.text(hits[0].recipe.url);
        recipeIngredients.text(hits[0].recipe.ingredientLines);
        recipeInstruction.text(hits[0].recipe.instructionLines);
        recipeCalories.text(hits[0].recipe.calories);
        recipeCuisineType.text(hits[0].recipe.cuisineType);
        recipeDietLabels.text(hits[0].recipe.dietLabels);
        recipeDishType.text(hits[0].recipe.dishType);
        recipeMealType.text(hits[0].recipe.mealType);

    } 
}

getRecipe();

displayRecipe();

