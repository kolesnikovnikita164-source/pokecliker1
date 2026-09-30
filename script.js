const saveKey = "pokecliker-save";

let state = JSON.parse(localStorage.getItem(saveKey)) || {
  coins: 0,
  perClick: 1,
  perSecond: 0,
  clickCost: 25,
  autoCost: 100
};

const $ = id => document.getElementById(id);

const pokemon = $("pokemon");
const message = $("message");

function save() {
  localStorage.setItem(
    saveKey,
    JSON.stringify(state)
  );
}

function render() {
  $("coins").textContent =
    Math.floor(state.coins);

  $("perClick").textContent =
    state.perClick;

  $("perSecond").textContent =
    state.perSecond;

  $("clickCost").textContent =
    state.clickCost;

  $("autoCost").textContent =
    state.autoCost;

  $("clickUpgrade").disabled =
    state.coins < state.clickCost;

  $("autoUpgrade").disabled =
    state.coins < state.autoCost;
}


// Pokémon anklicken
pokemon.addEventListener("click", () => {

  state.coins += state.perClick;

  message.textContent =
    `+${state.perClick} PokéCoin!`;

  pokemon.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.12)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 150
    }
  );

  save();
  render();
});


// Klick-Upgrade
$("clickUpgrade").addEventListener("click", () => {

  if (state.coins < state.clickCost) {
    return;
  }

  state.coins -= state.clickCost;

  state.perClick++;

  state.clickCost =
    Math.ceil(state.clickCost * 1.7);

  message.textContent =
    "Dein Klick ist stärker!";

  save();
  render();
});


// Auto-Clicker
$("autoUpgrade").addEventListener("click", () => {

  if (state.coins < state.autoCost) {
    return;
  }

  state.coins -= state.autoCost;

  state.perSecond++;

  state.autoCost =
    Math.ceil(state.autoCost * 2);

  message.textContent =
    "Ein Auto-Clicker wurde aktiviert!";

  save();
  render();
});


// Zurücksetzen
$("reset").addEventListener("click", () => {

  if (!confirm(
    "Wirklich den ganzen Fortschritt löschen?"
  )) {
    return;
  }

  state = {
    coins: 0,
    perClick: 1,
    perSecond: 0,
    clickCost: 25,
    autoCost: 100
  };

  save();

  message.textContent =
    "Neuer Start!";

  render();
});


// Auto-Clicker läuft jede Sekunde
setInterval(() => {

  if (state.perSecond > 0) {

    state.coins += state.perSecond;

    save();
    render();
  }

}, 1000);


// Spiel starten
render();
