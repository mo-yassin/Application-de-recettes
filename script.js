let cards = '';
for(let i = 0 ; i<6 ; i++){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        const meals = data.meals;
        const meal = meals[0];
        cards += ` 
    <div class="card col-md-5 col-lg-3 container" id="cards${i}">
            <img src="${meal.strMealThumb}" class="card-img-top"/>
            <div class="card-body">
                <h3 class="card-text">${meal.strMeal}</h3>
            </div>
            <button type="button" class="btn btn-primary" id="btnSearche${i}" data-bs-toggle="modal" data-bs-target="#staticBackdrop${meal.idMeal}"><b>Recette</b></button>
    </div>
    <div class="modal fade" id="staticBackdrop${meal.idMeal}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Recette</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="${meal.strMealThumb}" class="card-img-top"/>
                    <h2>${meal.strMeal}</h2>
                    <h3>${meal.strArea}</h3>
                    <p>${meal.strInstructions}</p>
                </div>
            </div>
        </div>
    </div>
        `;
    if(i === 5) document.getElementById('cards').innerHTML = cards;
    })
}

function search() {
    document.getElementById('cards').innerHTML ='';
    let searchValues = document.getElementById("searchValue").value;
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValues}`;
    fetch (url)
    .then(response=>response.json())
    .then(data=>{
    const Meal = data.meals;
    let cards;
        for(let j=0 ; j<Meal.length ; j++){
            console.log(Meal[j].strMeal)
            cards = ` 
            <div class="card col-md-5 col-lg-3 container" id="cards${j}">
                    <img src="${Meal[j].strMealThumb}" class="card-img-top"/>
                    <div class="card-body">
                        <h3 class="card-text">${Meal[j].strMeal}</h3>
                    </div>
                    <button type="button" class="btn btn-primary" id="btnSearche${j}" data-bs-toggle="modal" data-bs-target="#staticBackdrop${Meal[j].idMeal}"><b>Recette</b></button>
            </div>
            <div class="modal fade" id="staticBackdrop${Meal[j].idMeal}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Recette</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${Meal[j].strMealThumb}" class="card-img-top"/>
                            <h2>${Meal[j].strMeal}</h2>
                            <h3>${Meal[j].strArea}</h3>
                            <p>${Meal[j].strInstructions}</p>
                        </div>
                    </div>
                </div>
            </div>
                `;
            document.getElementById('cards').innerHTML += cards;
            document.getElementById("notAvailable").style.display = 'none'
        }
        if (searchValues < 1) {
            document.getElementById('cards').innerHTML ='';
            document.getElementById("notAvailable").style.display = 'block'
        }
    })
}
