import {
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
} from "./display.js";

let search = `
<form>
  <div class="form-group d-flex justify-content-center">
    <input
      id="byMeal"
      class="form-control me-2 mt-4 w-50 bg-transparent text-light"
      placeholder="Search By Name"
      type="text"
    />
    <input
      id="byLitter"
      class="form-control me-2 mt-4 w-50 bg-transparent text-light"
      placeholder="Search By First Litter"
      maxlength="1"
      type="text"
    />
  </div>
</form>
`;
let formContact = `<div class="d-flex align-items-center vh-100 text-light">
<form class="mx-auto w-75 text-center">
  <h2 class="text-start mb-3">Contact Us.....</h2>
  <div class="row gy-2">
    <div class="form-group w-50">
      <input
        id="name"
        placeholder="Enter your Name"
        class="form-control p-2 bg-light"
        type="text"
        name=""
      />
      <p class="alert alert-danger d-none"></p>
    </div>
    <div class="form-group w-50">
      <input
        id="email"
        placeholder="Enter your Email"
        class="form-control p-2 bg-light"
        type="email"
        name=""
      />
      <p class="alert alert-danger d-none"></p>
    </div>
    <div class="form-group w-50">
      <input
        id="phone"
        placeholder="Enter your Phone"
        class="form-control p-2 bg-light"
        type="tel"
        name=""
      />
      <p class="alert alert-danger d-none"></p>
    </div>
    <div class="form-group w-50">
      <input
        id="age"
        placeholder="Enter your Age"
        class="form-control p-2 bg-light"
        type="number"
        name=""
      />
      <p class="alert alert-danger d-none"></p>
    </div>
    <div class="form-group w-50">
      <input
        id="password"
        placeholder="Enter your Password"
        class="form-control p-2 bg-light"
        type="password"
        name=""
      />
      <p class="alert alert-danger d-none"></p>
    </div>
    <div class="form-group w-50">
      <input
        id="repassword"
        placeholder="RePassword"
        class="form-control p-2 bg-light"
        type="password"
        name=""
      />
      <p class="alert alert-danger d-none"></p>
    </div>
  </div>
  <button id="submit" class="btn btn-primary btn-lg mt-3">Submit</button>
</form>
</div>`;

export default (function () {
  // ..........Home...........
  $("#home")
    .css({ cursor: "pointer" })
    .click(async function () {
      $(document).ready(async function () {
        let result = await searchByName("");
        let box = displayMeal(result);
        $("#main .container ").html(`<div class="row mt-3 g-3">${box}</div>`);
        $(".loader").fadeOut(500, function () {
          $("body").css({ overflow: "visible" });
        });
        GetItemData();
        if ($("#meal").css("display") != "none") {
          $("#meal").addClass("d-none");
          $("#main").removeClass("d-none");
        }
      });
    });

  // .....................Search Bar..............
  $("#search").click(function () {
    closeNav();
    $("#main ").empty().html("<div class='container'></div>");
    $("#main .container").before(`<div class="w-75 mx-auto ">${search}</div> `);

    // ...........search events........
    $("#main #byMeal").on("input", async function (event) {
      let litter = $(event.target).val();
      let result = await searchByName(litter);
      let box = displayMeal(result);
      $("#main .container ").html(`<div class="row mt-3 g-3">${box}</div>`);
      GetItemData();
    });
    $("#main #byLitter").on("input", async function (event) {
      let litter = $(event.target).val();
      let result = await searchBylettr(litter);
      let box = displayMeal(result);
      $("#main .container ").html(`<div class="row mt-3 g-3">${box}</div>`);
      GetItemData();
    });
  });

  // ................... categories...........
  $("#Categories").click(async function () {
    $(".loader").css({ display: "flex", zIndex: "999" });
    closeNav();
    let Categories = await SearchBycategories();
    $("#main ").empty().html("<div class='container'></div>");
    $("#main .container ").html(
      `<div class="row mt-3 g-3">${Categories}</div>`
    );
    $("#main .container .item").click(async function () {
      let term = $(this).attr("data-meal");
      let categoriesFood = await SearchInCategoriesList(term);
      $("#main .container ")
        .empty()
        .html(`<div class="row mt-3 g-3">${categoriesFood}</div>`);
      GetItemData();
    });
    $("#meal").ready(function () {
      $(".loader").fadeOut(800);
    });
  });

  // ................... Area...........
  $("#Area").click(async function () {
    $(".loader").css({ display: "flex", zIndex: "999" });
    closeNav();
    let areas = await searchBy("a", displayArea);
    $("#main ").empty().html("<div class='container'></div>");
    $("#main .container ").html(`<div class="row mt-3 g-3">${areas}</div>`);
    $("#main .container .item").click(async function () {
      let area = await searchInArea($(this).attr("data-area"));
      $("#main .container ")
        .empty()
        .html(`<div class="row mt-3 g-3">${area}</div>`);
      GetItemData();
    });
    $("#meal").ready(function () {
      $(".loader").fadeOut(800);
    });
  });

  // ................... Ingredients...........
  $("#Ingredients").click(async function () {
    $(".loader").css({ display: "flex", zIndex: "999" });
    closeNav();
    let Ingredients = await searchBy("i", displayIngredients);
    $("#main ").empty().html("<div class='container'></div>");
    $("#main .container ").html(
      `<div class="row mt-3 g-3">${Ingredients}</div>`
    );
    $("#meal").ready(function () {
      $(".loader").fadeOut(800);
    });
    $("#main .container .item").click(async function () {
      let inte = await searchInIngredaienst($(this).attr("data-Ingredients"));
      $("#main").html("<div class='container'></div>");
      $("#main .container ").html(`<div class="row mt-3 g-3">${inte}</div>`);
      GetItemData();
    });
  });

  // ................... Contact...........
  $("#Contact").click(function () {
    closeNav();
    $("#main").html("<div class='container'></div>");
    $("#main .container ").html(formContact);
    formControl();
  });

  // ................... openNav &closeNav ...........
  $("#openNav").click(function () {
    openNav();
  });
  $("#closeNav").click(function () {
    closeNav();
  });
});

function openNav() {
  $("nav").animate({ left: 0 }, 500);
  $(".nav-links .links li ").css({ transform: "translatey(0px)" });
  $("#closeNav").removeClass("d-none");
  $("#openNav").addClass("d-none");
}

function closeNav() {
  $("nav").animate({ left: -$("nav .nav-links").outerWidth() }, 500);
  $(".nav-links .links li ").css({ transform: "translatey(250px)" });
  $("#closeNav").addClass("d-none");
  $("#openNav").removeClass("d-none");
}
