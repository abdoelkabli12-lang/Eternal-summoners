const cardsContainer = document.getElementById("card-arena");
const myCards = JSON.parse(localStorage.getItem('cards1')) || [];
const Cards1 = document.querySelectorAll(".cards-1");
const Cards2 = document.querySelectorAll(".cards-2");
const endTurn = document.getElementById("endturn");
const cardsCount = document.getElementById("count-cards");
const player = document.getElementById("players-card");
const lightning = document.getElementById("lightning");
const displayDuraion = 3000;
let cardPlacedThisTurn = false;
let click = 0;
let draggedItem = null;
let enemysCard = 5;
let playerCards = 0;







myCards.forEach((card, i) => {
  const cardHTML = document.createElement('div');
  cardHTML.className = "relative w-40 h-60 border-stroke border-8 rounded-lg";
  cardHTML.setAttribute("draggable", "true");
  cardHTML.id = `cont-${i}`
  cardHTML.innerHTML = `
      <div class = "cont">
        <div id = ${card.ind} class="absolute bg-underbg -z-1 h-56 w-[9rem] top-0">
        </div>
        <div class="">
          <div class="absolute flex items-center justify-center z-100 w-7 h-7 bg-gblue right-3 top-2 rounded-full md:h-15 w-15">
            <p class="text-white font-semibold text-[10px] text-center md:text-[10px]">
              ${card.number}
            </p>
          </div>



          <img src="${card.image}" class="relative w-[10rem] h-[8rem]" draggable = "false">

          <img src="imgs/Ellipse 1.png" class="absolute left-26 top-39 z-12 w-30 hidden">
          <img src="imgs/Ellipse 2.png" class="absolute left-1 top-[15rem] z-12 w-30 hidden">
          <div class="relative grid grid-cols-2  grid-rows-1 top-5 right-3">


            <p class="relative font-extrabold font-[Inter] text-xs text-tblue w-fit left-6">
              <span>${card.name}</span>
            </p>


            <p class="relative bg-grayish text-white font-bold font-[Inter] text-[8px] text-center rounded-full pt-1 pb-1 w-10  bottom-1 left-5">
              <span>${card.types[0]}</span>
            </p>
          </div>

          <p id="classification" class="relative text-grey text-[9px] ml-3 font-[Inter] font-medium top-5">
            ${card.classification}
          </p>
          <div class="relative flex ml-3 top-7 text-center">
            <p id="maxHP" class="bg-white inline pt-1 pl-2 pr-1 h-4 rounded-[5px] font-[Inter] text-[8px] text-blue">HP
              <span class=" font-bold">${card.maxHP}</span>
            </p>

            <p id="maxCP" class="bg-white inline pt-1 pl-2 pr-1 h-4 rounded-[5px] font-[Inter] text-[8px] text-blue">CP
              <span class="font-bold">${card.maxCP}</span>
            </p>

            <p id="height.maximum"
              class="bg-white inline pt-1 pl-1 pr-0 h-4 rounded-[5px] font-[Inter] text-[8px] text-blue">W
              <span class="font-bold">${card.height.maximum}</span>
            </p>
          </div>
        </div>

        <div class="relative left-3 mt-6 font-bold">

          <p class="bg-white inline pt-1 pb-[2px] pl-2 pr-1 h-1 rounded-[5px] font-[Inter] text-[8px] text-blue">
            <img src="imgs/shield.png" class="absolute w-2 left-0 top-[11px]"> ${card.resistant[0]}
          </p>

          <p class="bg-white inline pt-1 pb-[2px] pl-2 pr-1 h-1 rounded-[5px] font-[Inter] text-[8px] text-blue">
            <img src="imgs/shield.png" class="absolute w-2 left-9 top-[11px]"> ${card.resistant[1]}
          </p>

          <p class="bg-white inline pt-1 pb-[2px] pl-2 pr-1 h-1 rounded-[5px] font-[Inter] text-[8px] text-blue">
            <img src="imgs/shield.png" class="absolute w-2 left-20 top-[11px]"> ${card.weaknesses[0]}
          </p>
        </div>
`;

  cardsContainer.appendChild(cardHTML);


  const bgDiv = document.getElementById(`${card.ind}`);
  const rarityClasses = ['common', 'uncommon', 'rare', 'legendary', 'mythic'];
  bgDiv.classList.add(rarityClasses[card.ind - 1] || '');

  cardHTML.addEventListener('dragstart', (e) => {
    draggedItem = cardHTML;
    cardHTML.classList.add('opacity-[0.5]');
  })
  cardHTML.addEventListener('dragend', () => {
    cardHTML.classList.remove('opacity-[0.5]');
  })

});
const mainHub = document.getElementById('mainHand');

mainHub.addEventListener('drop', (e) => {
  console.log("dropped")
  e.preventDefault();

  if (draggedItem) {
    if (mainHub.children.length > 4) {
      return alert('hhhhh');
    }
    mainHub.appendChild(draggedItem);
    playerCards = mainHub.children.length;
    player.innerHTML = `card(${playerCards}/5)`;
  }
});
mainHub.addEventListener('dragover', (e) => {
  e.preventDefault();
})


const usedIndices = [];
let turn = false;
let flip = false;
Cards1.forEach((card) => {
  const blur = document.getElementById("blur");
  const choose = document.getElementById("choose");
  const def = document.getElementById("def");
  const atk = document.getElementById("atk");
  card.addEventListener('dragover', (e) => {
    card.classList.add("green-bg","animate-hover");
    e.preventDefault();
  })
  card.addEventListener('dragleave', (e) => {
    card.classList.remove('green-bg','animate-hover');
  })
  card.addEventListener('drop', () => {
    if (cardPlacedThisTurn) {
    card.classList.remove('green-bg','animate-hover');
    return alert("You can only place one card per turn!");
}
    card.classList.remove('green-bg','animate-hover');
    if (!mainHub.contains(draggedItem)) {
      return alert("You must place the card in your hand first!");
    }

    if (card.children.length > 0) {
      alert("you can't add more than 1 card in the same place...");
      return;
    }
    else {
      draggedItem.setAttribute("draggable", "false");

      blur.className = "fixed inset-0 z-500 backdrop-filter backdrop-blur-sm";
      choose.className = "fixed flex gap-25 justify-center items-end h-[16rem] w-[30rem] rounded-2xl bg-white/65 backdrop-blur-sm z-1000 left-[32rem] top-[15rem]";
    }
    def.onclick  = () => {
      blur.className = "hidden fixed inset-0 z-500 backdrop-filter backdrop-blur-sm";
      choose.className = "fixed hidden flex gap-25 justify-center items-end h-[16rem] w-[30rem] rounded-2xl bg-white/65 backdrop-blur-sm z-1000 left-[32rem] top-[15rem]";
      card.appendChild(draggedItem);
      click = 0;
      endTurn.classList.remove('cursor-not-allowed');
      endTurn.classList.add('active:opacity-50');
      cardPlacedThisTurn = true;
      turn = true;
          card.classList.add("rotate-defense");
      setTimeout(() => {
        lightning.classList.remove("hidden");
        setTimeout(() => {
          lightning.classList.add("hidden");
        }, displayDuraion);
      }, 200);
      return flip = true;
    }
      if(flip){
        card.classList.add('rotate-45');
      }

    atk.onclick = () => {
      cardPlacedThisTurn = true;
      turn = true;
      flip = false;
      draggedItem.setAttribute("draggable", "false");
      blur.className = "hidden fixed inset-0 z-500 backdrop-filter backdrop-blur-sm";
      choose.className = "fixed hidden flex gap-25 justify-center items-end h-[16rem] w-[30rem] rounded-2xl bg-white/65 backdrop-blur-sm z-1000 left-[32rem] top-[15rem]";
      card.appendChild(draggedItem);
      click = 0;
      endTurn.classList.remove('cursor-not-allowed');
      endTurn.classList.add('active:opacity-50');
      setTimeout(() => {
        lightning.classList.remove("hidden");
        setTimeout(() => {
          lightning.classList.add("hidden");
        }, displayDuraion);
      }, 200);
      if(!flip){
        card.classList.remove('rotate-45');
      }

    }

  });
})

endTurn.addEventListener('click', () => {
  click++;
  if (click > 1) {
    return;
  }
  cardPlacedThisTurn = false;
  endTurn.classList.add('cursor-not-allowed');
  endTurn.classList.remove('active:opacity-50');
  const emptySlots = Array.from(Cards2).filter(c => c.children.length === 0);
  console.log(emptySlots);

  if (emptySlots.length === 0) {
    console.log("No empty slots left.");
    return;
  }

  const randomContainer = emptySlots[Math.floor(Math.random() * emptySlots.length)];

  let rand;
  do {
    rand = Math.floor(Math.random() * myCards.length);
  } while (usedIndices.includes(rand) && usedIndices.length < myCards.length);

  if (usedIndices.length >= myCards.length) {
    console.log("No more cards available to clone.");
    return;
  }

  usedIndices.push(rand);

  const randomCard = document.getElementById(`cont-${rand}`);
  if (!randomCard) {
    console.warn(`Card with id cont-${rand} not found.`);
    return;
  }

  const clone = randomCard.cloneNode(true);
  clone.setAttribute("draggable", "false");

  randomContainer.appendChild(clone);
  enemysCard--;
  if (cardsCount) {
    const enemy = document.getElementById("enemys-card");
    enemy.innerHTML = `card(${enemysCard}/5)`
  }

});






