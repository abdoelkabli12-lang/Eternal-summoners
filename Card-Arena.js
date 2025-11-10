const cardsContainer = document.getElementById("card-arena");
const myCards = JSON.parse(localStorage.getItem('cards1')) || [];
const Cards1 = document.querySelectorAll(".cards-1");
const Cards2 = document.querySelectorAll("cards-2");


function renderCards() {
  let draggedItem = null;
  myCards.forEach((card, i, count) => {
    const cardHTML = document.createElement('div');
    cardHTML.className = "relative w-40 h-60 border-stroke border-8 rounded-lg";
    cardHTML.setAttribute("draggable", "true");
    count++;
    cardHTML.innerHTML = `
      <div id = "cont" >
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

    const mainHub = document.getElementById('mainHand');

    const bgDiv = document.getElementById(`${card.ind}`);
    const rarityClasses = ['common', 'uncommon', 'rare', 'legendary', 'mythic'];
    bgDiv.classList.add(rarityClasses[card.ind - 1] || '');

    cardHTML.addEventListener('dragstart', (e) => {
      draggedItem = e.target;
      cardHTML.classList.add('opacity-[0.5]');
    })
    cardHTML.addEventListener('dragend', () => {
      cardHTML.classList.remove('opacity-[0.5]');
    })

    mainHub.addEventListener('drop', (e) => {
      e.preventDefault();
      if (draggedItem) {
        draggedItem = null; // Clear the reference
      }
    });
    mainHub.addEventListener('dragover', (e) => {
      e.preventDefault();
      mainHub.appendChild(draggedItem);
      
    })
    
    Cards1.forEach((card) =>{
      card.addEventListener('drop', (e) => {
        if (draggedItem) {
        }
      });
      card.addEventListener('dragover', (e) => {
        card.appendChild(draggedItem);
        localStorage.setItem('mainHand');
      })
    })
    const maindivs = mainHub.getElementsByTagName('div');
    if(maindivs.length == 5){
      alert("hello");
    }
  });
  
  


  
  
}


renderCards();