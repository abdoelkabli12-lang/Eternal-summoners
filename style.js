let pokemonCards = [];
let currentPage = 1;
const cardsPerPage = 12;
const cart = document.getElementById('cart-icon');

cart.addEventListener('click', () => {
  const cartElement = document.getElementById('cart');

  if (cartElement.style.display === 'inline') {
    cartElement.style.display = 'none';
  } else {
    cartElement.style.display = 'inline';
  }
});


fetch('./pokemondata1.json')
  .then(response => response.json())
  .then(data => {
    pokemonCards = data;
    displayCards(pokemonCards, currentPage);
  })
  .catch(error => console.error('error connecting with the server', error));


function displayCards(cards, page = 1) {
  const container = document.getElementById('card-container');
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = page * cardsPerPage;
  const paginatedCards = cards.slice(startIndex, endIndex);

  let html1 = '';

  paginatedCards.forEach((card, i) => {
    html1 += `
      <div class = "cd" class="w-60">
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
        <button  id = "fav-${card.number}" data-number = "${card.number}" class="remove-fav bg-black text-white font-GoldM p-2 rounded-xl w-25">
          Favorites
        </button>
        <button id = "cart-${card.number}" class="bg-black text-white font-GoldM p-2 rounded-xl">
          Add to Cart
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
          
          </div>
    `;
  });

  container.innerHTML = html1;
  renderPaginationControls(cards);

  // Set rarity background color
  paginatedCards.forEach((card, i) => {
    const bgDiv = document.getElementById(`${card.ind}-${i}`);
    const rarityClasses = ['common', 'uncommon', 'rare', 'legendary', 'mythic'];
    bgDiv.classList.add(rarityClasses[card.ind - 1] || '');
  });


  paginatedCards.forEach(card => {
    const favBtn = document.getElementById(`fav-${card.number}`);
    const cartBtn = document.getElementById(`cart-${card.number}`);

 
    favBtn.addEventListener('click', () => {
      let currentFavorites = JSON.parse(localStorage.getItem('cards')) || [];
      const alreadyFav = currentFavorites.some(fav => fav.number === card.number);

      if (alreadyFav) {
        currentFavorites = currentFavorites.filter(fav => fav.number !== card.number);
        favBtn.textContent = 'Favorites';
      } else {
        currentFavorites.push(card);
        favBtn.textContent = 'Remove';
      }

      localStorage.setItem('cards', JSON.stringify(currentFavorites));
    });

    cartBtn.addEventListener('click', () => {
      let currentCart = JSON.parse(localStorage.getItem('cards1')) || [];
      const existing = currentCart.find(item => item.number === card.number);

      if (existing) {
        existing.quantity += 1;
      } else {
        currentCart.push({ ...card, quantity: 1, price: 100 });
      }

      localStorage.setItem('cards1', JSON.stringify(currentCart));
    });
  });
}


const mythicfilter = document.getElementById("Mythic");
        mythicfilter.addEventListener('click', () => {
          const mythicCards = pokemonCards.filter(card => card.rarety === "mythic");
          displayCards(mythicCards);
          
        });
        
        const legendfilter = document.getElementById("Legendary");
        legendfilter.addEventListener('click', () => {
          const legendCards = pokemonCards.filter(card => card.rarety === "legendary");
          displayCards(legendCards);
          
        });
        
        const rarefilter = document.getElementById("Rare");
        rarefilter.addEventListener('click', () => {
          const rareCards = pokemonCards.filter(card => card.rarety === "rare");
          displayCards(rareCards);
          
        });
        
        const uncfilter = document.getElementById("Uncommon");
        uncfilter.addEventListener('click', () => {
          const uncCards = pokemonCards.filter(card => card.rarety === "uncommon");
          displayCards(uncCards);
          
        });
        
        const comfilter = document.getElementById("Common");
        comfilter.addEventListener('click', () => {
          const comCards = pokemonCards.filter(card => card.rarety === "common");
          displayCards(comCards);
          
        }); 



function renderPaginationControls(cards) {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;

  const totalPages = (cards.length / cardsPerPage);
  let buttons = '';

  if (currentPage > 1) {
    buttons += `<button class="bg-gray-700 text-white px-3 py-1 rounded" id="prev">Prev</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    buttons += `
      <button class="px-3 py-1 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}" data-page="${i}">
        ${i}
      </button>`;
  }

  if (currentPage < totalPages) {
    buttons += `<button class="bg-gray-700 text-white px-3 py-1 rounded" id="next">Next</button>`;
  }

  pagination.innerHTML = buttons;

  pagination.querySelectorAll('button[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = Number(btn.dataset.page);
      displayCards(cards, currentPage);
    });
  });

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  if (prevBtn)
    prevBtn.addEventListener('click', () => {
      currentPage--;
      displayCards(cards, currentPage);
    });

  if (nextBtn)
    nextBtn.addEventListener('click', () => {
      currentPage++;
      displayCards(cards, currentPage);
    });
}


