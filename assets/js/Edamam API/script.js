//access for Edamam API
apiId = '5ab8e6ed';
apiKey = '09a80b5e169f716caebf46aba639a975';

//Diet
//high-fiber, high-protein, low-carb, low-fat, low-sodium
//variables for the diet-type checkboxes
const highFiberInput = $('#high-fiber');
const highProteinInput = $('#high-protein');
const lowCarbInput = $('#low-carb');
const lowFatInput = $('#low-fat');
const lowSodiumInput = $('#low-sodium');

//variable that will be part of the API query
diet = '';

//function that will check to see what the user inputed for diet type
function getDiet() {
    //the array the for loop will run through
    var dietArray = [
        highFiberInput,
        highProteinInput,
        lowCarbInput,
        lowFatInput,
        lowSodiumInput
    ];
    //for loop that will go through and check all of the input options from dietArray
    for (var i = 0; i < dietArray.length; i++) {
        //if it is checked, the value of diet will change to the checked index's html id
        if (dietArray[i].prop('checked')) {
            diet = dietArray[i].attr('id');
            //test
            console.log("Selected Diet:", diet);
            //ends the for loop
            break;
        }
    }
}

// highFiberInput.on('click', function(e) {
//     console.log(e);
//     if (highFiberInput.is(":checked")) {
//         console.log('clicked');
//     }
// })

//Cuisine Type
//American, Asian, British, Caribbean, Central Europe, Chinese, Eastern Europe, French, 
//Indian, Italian, Japanese, Kosher, Mediterranean, Mexican, Middle Eastern, Nordic, South American, South East Asian
//variables for the cuisine-type radio
const americanInput = $('#american');
const asianInput = $('#asian');
const britishInput = $('#british');
const caribbeanInput = $('#caribbean');
const centralEuropeInput = $('#central-europe');
const chineseInput = $('#Chinese');
const easternEuropeInput = $('#eastern-europe');
const frenchInput = $('#french');
const indianInput = $('#indian');
const italianInput = $('#italian');
const japaneseInput = $('#japanese');
const kosherInput = $('#kosher');
const mediterraneanInput = $('#mediterranean');
const nordicInput = $('#middle-eastern');
const southAmericanInput = $('#nordic');
const southEastAsianInput = $('#south-american');

//variable that will be part of the API query
cuisineType = '';

//function that will check to see what the user inputed for cuisine type
//similar to getDiet()
function getCuisineType() {
    var cuisineArray = [
        americanInput,
        asianInput,
        britishInput,
        caribbeanInput,
        centralEuropeInput,
        chineseInput,
        easternEuropeInput,
        frenchInput,
        indianInput,
        italianInput,
        japaneseInput,
        kosherInput,
        mediterraneanInput,
        nordicInput,
        southAmericanInput,
        southEastAsianInput
    ];

    for (var i = 0; i < cuisineArray.length; i++) {
        if (cuisineArray[i].prop('checked')) {
            cuisineType = cuisineArray[i].attr('id');
            console.log("Selected Cuisine Type:", cuisineType);
            break;
        }
    }
}


//Meal Type
//Breakfast, Brunch, Dinner, Lunch
//variables for the meal-type radio
const breakfastInput = $('#breakfast');
const brunchInput = $('#brunch');
const lunchInput = $('#lunch');
const dinnerInput = $('#dinner');

//variable that will be part of the API query
mealType = '';

//function that will check to see what the user inputed for meal type
//similar to getDiet()
function getMealType() {
    var mealArray = [
        breakfastInput,
        brunchInput,
        lunchInput,
        dinnerInput, 
    ];

    for (var i = 0; i < mealArray.length; i++) {
        if (mealArray[i].prop('checked')) {
            mealType = mealArray[i].attr('id');
            console.log("Selected Cuisine Type:", mealType);
            break;
        }
    }
}

//Dish Type
//Desserts, Drinks, Main Course, Pasta, Pizza, Salad, Sandwiches, Side-Dish, Soup, Starter
//variables for the dish-type checkboxes
const dessertsInput = $('#desserts');
const drinksInput = $('#drinks');
const mainCourseInput = $('#main-course');
const saladInput = $('#salad');
const sandwichesInput = $('#sandwiches');
const soupInput = $('#soup');
const starterInput = $('#starter');
const noPreference = $('#no-preference');

//variable that will be part of the API query
dishType = '';

//function that will check to see what the user inputed for dish type
//similar to getDiet()
function getDishType() {
    var dishArray = [
        dessertsInput,
        drinksInput,
        mainCourseInput,
        saladInput,
        sandwichesInput,
        soupInput,
        starterInput,
        noPreference
    ];

    for (var i = 0; i < dishArray.length; i++) {
        if (dishArray[i].prop('checked')) {
            if (dishArray[i] === noPreference) {
                console.log('No Preference');
                dishType = 'main-course';
                break;
            }
            dishType = dishArray[i].attr('id');
            console.log("Selected Dish Type:", dishType);
            break;
        }
    }
}

const generateRecipeBtn = $('#generate-recipe');

generateRecipeBtn.on('click', function() {
    console.log('Generate Recipe');
    getDiet();
    getCuisineType();
    getMealType();
    getDishType();
    getRecipe();
    displayRecipe();
})

const clearOptionsBtn = $('#clear-options');

clearOptionsBtn.on('click', function() {
    console.log("clear options");

    const dietTypeCheckbox = $('[name="diet-type"]');
    dietTypeCheckbox.prop('checked', false);

    const cuisineTypeRadio = $('[name="cuisine-type"]');
    cuisineTypeRadio.prop('checked', false);
    
    const mealTypeRadio = $('[name="meal-type"]');
    mealTypeRadio.prop('checked', false);

    const dishTypeCheckbox = $('[name="dish-type"]');
    dishTypeCheckbox.prop('checked', false);
})





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
            console.log(data);
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
        const randomIndex = Math.floor(Math.random() * hits.length);
        console.log(randomIndex);
        const randomRecipe = hits[randomIndex].recipe;
        console.log(randomRecipe);
        console.log(randomRecipe.label);
        recipeName.text(randomRecipe.label);

        // const imageUrl = hits[0].recipe.images.REGULAR.url;
        // console.log("Entire API information of the First Object from the Array", hits[0])
        // console.log("Specific Recipe Info", hits[0].recipe)
        // console.log("Specific Recipe URL", hits[0].recipe.url)
        // console.log("Specific Recipe Name", hits[0].recipe.label)
        // console.log("Specific Recipe Ingredients", hits[0].recipe.ingredientLines)
        // console.log("Specific Recipe Instructions", hits[0].recipe.instructionLines)
        //Different things to call and test
        //Calories: hits[0].recipe.calories
        //Cuisine Type: hits[0].recipe.cuisineType
        //Diet Labels: hits[0].recipe.dietLabels
        //Dish Type: hits[0].recipe.dishType
        //Image: hits[0].recipe.image
        //Different Size Images: hits[0].recipe.images.LARGE|REGULAR|SMALL|THUMBNAIL
        //Meal Type: hits[0].recipe.mealType
        const apiUrl = randomRecipe.url;
        $('#recipeUrl').attr('href', apiUrl).text(apiUrl);
        // recipeUrl.text(hits[0].recipe.url);
        $('#hide').children().css('visibility', 'visible');
        recipeIngredients.text(randomRecipe.ingredientLines);
        recipeInstruction.text(randomRecipe.instructionLines);
        const calories = randomRecipe.calories;
        const formattedCalories = calories.toFixed(0);
        recipeCalories.text(formattedCalories);
    } 
}

// getRecipe();

// displayRecipe();
