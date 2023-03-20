// ....................... search Nav...................................
async function searchByName(term = "") {
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let finalResponse = await respons.json();
  return finalResponse.meals;
}

async function searchBylettr(term = "a") {
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  let finalResponse = await respons.json();
  return finalResponse.meals;
}

// ...............................item event Clicked..............
async function searchById(id) {
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let finalResponse = await respons.json();
  return finalResponse.meals[0];
}

// ........................... categories Nav...................................
async function SearchBycategories() {
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php
    `
  );
  let finalResponse = await respons.json();
  return displaycategories(finalResponse.categories);
}
function displaycategories(meals) {
  let box = ``;
  for (const meal of meals) {
    box += `<div class="col-md-4 col-lg-3 ">
      <div data-meal="${meal.strCategory}" class="item ">
        <img src="${meal.strCategoryThumb}" class="w-100 rounded-2  " alt="" />
        <div class="layer justify-content-center flex-column rounded-2 px-2 text-center h-75">
          <h3>${meal.strCategory}</h3>
          <p>${meal.strCategoryDescription.slice(0, 50) + "..."}</p>
        </div>
      </div>
    </div>`;
  }
  return box;
}
async function SearchInCategoriesList(term) {
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}

    `
  );
  let finalResponse = await respons.json();
  return displayMeal(finalResponse.meals);
}

// ......................... area Nav.................................
async function searchBy(link, callBack) {
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?${link}=list
    `
  );
  let finalResponse = await respons.json();
  return callBack(finalResponse.meals);
}

function displayArea(meals) {
  let box = ``;
  for (const meal of meals) {
    box += `<div class="col-md-4 col-lg-3 text-light ">
      <div data-area="${meal.strArea}" class="item  text-center">
      <i class="fa-solid fa-map-location-dot fa-5x mb-3"></i>
          <h2>${meal.strArea}</h2>
      </div>
    </div>`;
  }

  return box;
}
async function searchInArea(term) {
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}
    `
  );
  let finalResponse = await respons.json();
  return displayMeal(finalResponse.meals);
}
// ........................Ingredients nav ...............................
function displayIngredients(meals) {
  let box = ``;
  for (const meal of meals) {
    let desc = meal.strDescription;
    if (desc == null) {
      desc = "";
    }

    box += `<div class="col-md-4 col-lg-3 ">
    <div data-Ingredients="${
      meal.strIngredient
    }" class="item text-center text-light">
    <i class="fa-solid fa-utensils fa-5x "></i>
    <h3 class="my-2">${meal.strIngredient}</h3>
    <p>${desc.slice(0, 50)}</p>
      </div>
  </div>`;
  }

  return box;
}

async function searchInIngredaienst(term) {
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}
    `
  );
  let finalResponse = await respons.json();
  return displayMeal(finalResponse.meals);
}
// .............................Contact us Nav..................
function formControl() {
  $("#name").on("input", function () {
    let regex = /^[a-zA-Z ]{3,20}$/gm;
    if (regex.test(this.value) == false) {
      $(this)
        .next()
        .text("Special characters and numbers not allowed")
        .removeClass("d-none");
    } else {
      $(this).next().text("").addClass("d-none");
    }
  });
  $("#email").on("input", function () {
    let regex = /^[\w]{6,}\@[a-z]{4,}(\.com){1}$/gm;
    if (regex.test(this.value) == false) {
      $(this)
        .next()
        .text("Email not valid *exemple@yyy.zzz")
        .removeClass("d-none");
    } else {
      $(this).next().text("").addClass("d-none");
    }
  });
  $("#phone").on("input", function () {
    let regex = /^01(0|1|2|5)\d{8}$/gm;
    if (regex.test(this.value) == false) {
      $(this).next().text("Enter valid Phone Number").removeClass("d-none");
    } else {
      $(this).next().text("").addClass("d-none");
    }
  });
  $("#age").on("input", function () {
    let regex = /^[1-9][0-9]$/gm;
    if (regex.test(this.value) == false) {
      $(this).next().text("Enter valid age").removeClass("d-none");
    } else {
      $(this).next().text("").addClass("d-none");
    }
  });
  $("#password").on("input", function () {
    let regex = /^[A-Z]{1}[0-9]{1}\w{6,15}$/;
    if (regex.test(this.value) == false) {
      $(this)
        .next()
        .text(
          "Enter valid password *Minimum eight characters, Start with one letter and one number:*"
        )
        .removeClass("d-none");
    } else {
      $(this).next().text("").addClass("d-none");
    }
  });
  $("#repassword").on("input", function () {
    if ($("#repassword").val() != $("#password").val()) {
      $(this).next().text("Enter valid repassword").removeClass("d-none");
    } else {
      $(this).next().text("").addClass("d-none");
    }
  });
}

// ............................... display data...............................
// ...............display meals..............
function displayMeal(meals) {
  let box = ``;
  for (const meal of meals) {
    box += `<div class="col-md-4 col-lg-3 ">
      <div data-meal-id="${meal.idMeal}" class="item ">
        <img src="${meal.strMealThumb}" class="w-100 rounded-2  " alt="" />
        <div class="layer rounded-2 px-2">
          <h3>${meal.strMeal}</h3>
        </div>
      </div>
    </div>`;
  }

  return box;
}
// ...............display meal Data by Id...........
function GetItemData() {
  $("#main .container .item").click(async function () {
    $(".loader").css({ display: "flex", zIndex: "999" });
    $("#main").addClass("d-none");
    let mealId = $(this).attr("data-meal-id");
    let mealDes = await searchById(mealId);
    titleDisplay(mealDes);
    $("#meal").ready(function () {
      $(".loader").fadeOut(800);
    });
  });
}
function titleDisplay(object) {
  $("#meal").removeClass("d-none");
  let box = `<div class="container mt-3 ">
  <div class="row">
    <div class="col-md-4">
      <img
        src="${object.strMealThumb}"
        alt=""
        class="w-100 rounded-4"
      />
      <h2 class="mt-2">${object.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2>Instructions</h2>
      <p>
        ${object.strInstructions}
      </p>
      <h2>Area : <span>${object.strArea}</span></h2>
      <h2>Category : <span>${object.strCategory}</span></h2>
      <h2>Recipes :</h2>

      <span class="badge ${(() => {
        if (object.strMeasure1 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure1} ${
    object.strIngredient1
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure2 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure2} ${
    object.strIngredient2
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure3 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure3} ${
    object.strIngredient3
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure4 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure4} ${
    object.strIngredient4
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure5 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure5} ${
    object.strIngredient5
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure6 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure6} ${
    object.strIngredient6
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure7 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure7} ${
    object.strIngredient7
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure8 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure8} ${
    object.strIngredient8
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure9 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure9} ${
    object.strIngredient9
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure10 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure10} ${
    object.strIngredient10
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure11 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure11} ${
    object.strIngredient11
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure12 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure12} ${
    object.strIngredient12
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure13 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure13} ${
    object.strIngredient13
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure14 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure14} ${
    object.strIngredient14
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure15 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure15} ${
    object.strIngredient15
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure16 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure16} ${
    object.strIngredient16
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure17 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure17} ${
    object.strIngredient17
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure18 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary  fs-6 m-2">${object.strMeasure18} ${
    object.strIngredient18
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure19 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()}text-bg-secondary  fs-6 m-2">${object.strMeasure19} ${
    object.strIngredient19
  }</span>

      <span class="badge ${(() => {
        if (object.strMeasure20 == " ") {
          return "p-0";
        } else {
          return "p-2";
        }
      })()} text-bg-secondary fs-6 m-2">${object.strMeasure20} ${
    object.strIngredient20
  }</span>
      
      <div class="tags mt-3"><h2>Tags  :</h2>
      <span class="badge text-bg-info p-2 fs-6 m-2">${
        object.strTags ? object.strTags : object.strMeal
      }</span>

      <div class="links mt-4">
        <a href="${
          object.strSource ? object.strSource : ""
        }" target="--blank" class="btn btn-success"> Source</a>
        <a href="${
          object.strYoutube ? object.strYoutube : ""
        }" target="--blank" class="btn btn-danger">You Tube</a>
      </div></div>
    </div>
    <i
      id="closeMeal"
      class="fa-solid fa-xmark fa-2x text-white position-fixed"
    ></i>
  </div>
</div>`;
  $("#meal").html(box);
  $("#closeMeal").click(function () {
    $("#meal").html("");
    $("#main").removeClass("d-none");
  });
}

// .................................export.......................
export {
  searchByName,
  searchBylettr,
  displayMeal,
  SearchBycategories,
  GetItemData,
  SearchInCategoriesList,
  searchBy,
  searchInArea,
  displayArea,
  displayIngredients,
  searchInIngredaienst,
  formControl,
};
