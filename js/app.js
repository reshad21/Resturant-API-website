
const loadData = (search) => {
    // console.log(search);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.meals))
}
loadData("");

const displayData = (meals) => {
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.innerHTML = "";
    meals.forEach(meal => {
        const { strMeal, strMealThumb, strInstructions, idMeal } = meal;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${strMeal}</h5>
                    <p class="card-text">${strInstructions.slice(0, 120)}</p>
                </div>
                <button class="btn btn-warning" onclick="mealid(${idMeal})">SEE MORE</button>
            </div>       
        `;
        mainContainer.appendChild(div);
    })
}

const mealid = (mealid) => {
    window.scrollTo(0,0);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
        .then(res => res.json())
        .then(data => singlemeal(data.meals[0]))
}
const singlemeal = (singlemeal)=>{
    console.log(singlemeal);
    const {strMealThumb,strMeal,strInstructions} = singlemeal;
    const singleitemdiv = document.getElementById('singleitem');
    singleitemdiv.innerHTML="";
    const div = document.createElement('div');
    div.innerHTML=`
        <div class="card mb-4" style="width: 18rem;">
            <img src="${strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${strMeal}</h5>
                <p class="card-text">${strInstructions.slice(0, 120)}</p>
            </div>
        </div>
    `;
    singleitemdiv.appendChild(div);
}


// search section work //
const searchmeal = ()=>{
    const inputfield = document.getElementById('inputfield');
    const inputvalue = inputfield.value;
    inputfield.value = "";
    loadData(inputvalue);

}