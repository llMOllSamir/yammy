"use strict";

import navBar from "./modules/navBar.js";
import { searchByName, displayMeal, GetItemData } from "./modules/display.js";

// ......................nav Control.....................
navBar();

$(document).ready(async function () {
  let result = await searchByName("");
  let box = displayMeal(result);
  $("#main .container ").html(`<div class="row mt-3 g-3">${box}</div>`);
  $(".loader").fadeOut(500, function () {
    $("body").css({ overflow: "visible" });
  });
  GetItemData();
});

