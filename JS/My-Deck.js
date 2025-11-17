const myDeckContainer = document.getElementById('Myd-container');
let myDeck = JSON.parse(localStorage.getItem('cards1')) || [];
let currentPage = 1;
const itemsPerPage = 12;

const cart = document.getElementById('cart-icon');
cart.addEventListener("click", () => {
  const c = document.getElementById("cart");
  c.style.display = c.style.display === "inline" ? "none" : "inline";
});

function calculateTotal(cards) {
  return Math.ceil(cards.length / itemsPerPage);
}

function displayCards(cards = myDeck, page = 1) {
  myDeck = JSON.parse(localStorage.getItem("cards1")) || [];

      if (myDeck.length === 0) {
      myDeckContainer.innerHTML = `
        <div class="relative flex flex-col items-center justify-center">
          <img src="imgs/bg pika.png" class="w-60 opacity-50">
          <p class="text-white text-2xl font-GoldM mt-4">No favorites yet!</p>
        </div>`;
      updatePaginationControls([]);
      return;
    }

  const totalPages = calculateTotal(cards);
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  currentPage = page;
  const startIndex = (page - 1) * itemsPerPage;
  const itemsToDisplay = cards.slice(startIndex, startIndex + itemsPerPage);

  myDeckContainer.innerHTML = "";

  itemsToDisplay.forEach((card, i) => {
    myDeckContainer.innerHTML += `
    <div>
      <div id = "cont" class="relative w-60 h-90 border-stroke border-8 rounded-lg">
        <div id = ${card.ind}-${i} class="absolute bg-underbg -z-1 h-70 w-[14rem] top-16">
        </div>


        <div class="">
          <div
            class="absolute flex items-center justify-center z-100 w-10 h-10 bg-gblue right-3 top-2 rounded-full md:h-15 w-15">
            <p class="text-white font-semibold text-[18px] text-center md:text-[20px]">
              ${card.number}
            </p>
          </div>



          <img src=${card.image} class="relative w-[14rem] h-[12rem]">

          <img src="imgs/Ellipse 1.png" class="absolute left-26 top-39 z-12 w-30">
          <img src="imgs/Ellipse 2.png" class="absolute left-1 top-[15rem] z-12 w-30">
          <div class="relative grid grid-cols-2  grid-rows-1 top-5 right-3">


            <p class="relative font-extrabold font-[Inter] text-md text-tblue w-fit left-6">
              <span>${card.name}</span>
            </p>


            <p class="relative bg-grayish text-white font-bold font-[Inter] text-sm text-center rounded-full pt-1 pb-1 w-16 ml-4 bottom-1
            ">
              <span>${card.types[0]}</span>
            </p>
          </div>

          <p id="classification" class="relative text-grey text-sm ml-3 font-[Inter] font-medium top-5">
            ${card.classification}
          </p>
          <div class="relative flex gap-1 ml-3 top-7 text-center">
            <p id="maxHP" class="bg-white inline pt-1 pl-2 pb-1 pr-1 rounded-[5px] font-[Inter] text-xs text-blue">HP
              <span class="font-bold">${card.maxHP}</span>
            </p>

            <p id="maxCP" class="bg-white inline pt-1 pl-2 pb-1 pr-1 rounded-[5px] font-[Inter] text-xs text-blue">CP
              <span class="font-bold">${card.maxCP}</span>
            </p>

            <p id="height.maximum"
              class="bg-white inline pt-1 pl-2 pb-1 pr-1 rounded-[5px] font-[Inter] text-xs text-blue">W
              <span class="font-bold">${card.height.minimum}</span>
            </p>
          </div>
        </div>

        <div class="relative left-3 mt-7 font-bold">

          <p class="bg-white inline rounded-[5px] font-[Inter] text-xs text-blue pt-1 pl-4 pb-1 pr-1">
            <img src="imgs/shield.png" class="absolute w-4 top-[5px]"> ${card.resistant[0]}
          </p>

          <p class="bg-white inline pt-1 pl-4 pb-1 pr-1 rounded-[5px] font-[Inter] text-xs text-blue">
            <img src="imgs/shield.png" class="absolute w-4 top-[3px]"> ${card.resistant[1]}
          </p>

          <p class="bg-white inline pt-1 pl-4 pb-1 pr-2 rounded-[5px] font-[Inter] text-xs text-blue">
            <img src="imgs/shield.png" class="absolute w-4 top-[3px]"> ${card.weaknesses[0]}
          </p>
        </div>

      </div>

      <div class="relative left-2 top-2">
        <button  id = "sell-${i}" data-number = "${card.number}" class="remove-fav bg-black text-white font-GoldM p-2 rounded-xl w-25">
          sell
        </button>
        <button id = "id-${i}" class="bg-black text-white font-GoldM p-2 rounded-xl">
          Favorites
        </button>
      </div>

      <div class="text-lg font-GoldM text-white">
        <span><p class="flex justify-center w-55 mt-2">
          1/1
          </p></span>
          
          <span><p class="relative text-center">
          It's small but his speed is great
          </p></span>
          
          <span><p class="flex justify-center w-55 font-bold mt-6">
          100$
          </p></span>
          </div>
          
          </div>`;
          // rarity background coloring
          itemsToDisplay.forEach((card, i) => {
            const bg = document.getElementById(`${card.ind}-${i}`);
            const colors = ["common", "uncommon", "rare", "legendary", "mythic"];
            bg.classList.add(colors[card.ind - 1]);
          });
  });


  // event listeners
  itemsToDisplay.forEach((card, i) => {
    const sellBtn = document.getElementById(`sell-${i}`);
    const favBtn = document.getElementById(`id-${i}`);

    sellBtn.addEventListener("click", () => {
      let deck = JSON.parse(localStorage.getItem("cards1")) || [];
      deck = deck.filter(d => d.number !== card.number);
      localStorage.setItem("cards1", JSON.stringify(deck));

      myDeck = deck;
      displayCards(myDeck, currentPage);
    });

    favBtn.addEventListener("click", () => {
      let fav = JSON.parse(localStorage.getItem("cards")) || [];

      if (!fav.some(f => f.number === card.number)) {
        fav.push(card);
        favBtn.textContent = "Added!";
      } else {
        fav = fav.filter(f => f.number !== card.number);
        favBtn.textContent = "Favorites";
      }

      localStorage.setItem("cards", JSON.stringify(fav));
    });
  });

  updatePaginationControls(cards);
}

function updatePaginationControls(cards) {
  const totalPages = calculateTotal(cards);
  document.getElementById("prev-button").disabled = currentPage === 1;
  document.getElementById("next-button").disabled = currentPage === totalPages;
  document.getElementById("page-Info").textContent =
    `Page ${currentPage} of ${totalPages}`;
}

// Pagination
document.getElementById("prev-button").addEventListener("click", () => {
  if (currentPage > 1) displayCards(myDeck, currentPage - 1);
});

document.getElementById("next-button").addEventListener("click", () => {
  if (currentPage < calculateTotal(myDeck)) displayCards(myDeck, currentPage + 1);
});


document.getElementById("Mythic").addEventListener("click", () => {
  displayCards(myDeck.filter(c => c.rarety === "mythic"));
});
document.getElementById("Legendary").addEventListener("click", () => {
  displayCards(myDeck.filter(c => c.rarety === "legendary"));
});
document.getElementById("Rare").addEventListener("click", () => {
  displayCards(myDeck.filter(c => c.rarety === "rare"));
});
document.getElementById("Uncommon").addEventListener("click", () => {
  displayCards(myDeck.filter(c => c.rarety === "uncommon"));
});
document.getElementById("Common").addEventListener("click", () => {
  displayCards(myDeck.filter(c => c.rarety === "common"));
});

displayCards(myDeck);
