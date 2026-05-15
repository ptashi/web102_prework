/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  games.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    const cardInfo = `
        <img class="game-img" src="${item.img}">
        <div>Name: ${item.name}</div>
        <div>Goal: ${item.goal}</div>
    `;

    card.innerHTML = cardInfo;

    gamesContainer.appendChild(card);
  });

  // create a new div element, which will become the game card

  // add the class game-card to the list

  // set the inner HTML using a template literal to display some info
  // about each game
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")

  // append the game to the games-container
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const numContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `${numContributions.toLocaleString("en-US")}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal

const numMoney = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

raisedCard.innerHTML = `$${numMoney.toLocaleString("en-US")}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const numGames = GAMES_JSON.reduce((acc, game, index) => {
  return index + 1;
}, 0);

gamesCard.innerHTML = `${numGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let notMetGoal = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(notMetGoal);
  return notMetGoal;
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let metGoal = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  // use the function we previously created to add unfunded games to the DOM

  addGamesToPage(metGoal);
  return metGoal;
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn?.addEventListener("click", function () {
  filterUnfundedOnly();
});

fundedBtn?.addEventListener("click", function () {
  filterFundedOnly();
});
allBtn?.addEventListener("click", function () {
  showAllGames();
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGamesList = filterUnfundedOnly();
let numUnfundedGames = filterUnfundedOnly().reduce((acc, game, index) => {
  return index + 1;
});

let numFundedGames = filterFundedOnly().reduce((acc, game, index) => {
  return index + 1;
});

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${numMoney.toLocaleString("en-US")} has been raised for ${numGames} game${numFundedGames === 1 ? "" : "s"}. Currently, there ${numUnfundedGames === 1 ? "is" : "are"} ${numUnfundedGames} game${numUnfundedGames === 1 ? "" : "s"} remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container

const infoBox = document.createElement("p");
infoBox.innerHTML = `<p>${displayStr}</p>`;
descriptionContainer.appendChild(infoBox);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

let [firstGame, secondGame, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

const gameone = document.createElement("div");
gameone.innerHTML = `<div>${firstGame.name}</div>`;
firstGameContainer.appendChild(gameone);

// do the same for the runner up item

const gametwo = document.createElement("div");
gametwo.innerHTML = `<div>${secondGame.name}</div>`;
secondGameContainer.appendChild(gametwo);

// customization

const gameButton = document.getElementById("headerRight");
const gamePlace = document.getElementById("gameSection");

gameButton?.addEventListener("click", function () {
  gamePlace.scrollIntoView({ behavior: "smooth" });
});
