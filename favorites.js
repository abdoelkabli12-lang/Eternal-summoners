document.addEventListener('DOMContentLoaded', () => {
  const favcontainer = document.getElementById('fav-container');
  const favorites = JSON.parse(localStorage.getItem('cards')) || [];









function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem('cards')) || [];
  if (favorites.length === 0) {
    favcontainer.innerHTML = `
      <div class="flex flex-col items-center justify-center mt-20">
        <img src="imgs/bg pika.png" class="w-60 opacity-50">
        <p class="text-white text-2xl font-GoldM mt-4">No favorites yet!</p>
      </div>
    `;
    return;
  }

  favcontainer.innerHTML = '';
  favorites.forEach((card, i) => {
    const cardHTML =`
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
        <button class = "remove-fav" id = "fav-${card.number}" data-number = "${card.number}" class="bg-black text-white font-GoldM p-2 rounded-xl w-25">
          remove
        </button>
        <button id = "id-${i}" class="bg-black text-white font-GoldM p-2 rounded-xl">
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
          
          </div>`;
    favcontainer.innerHTML += cardHTML;
  });
}

// Initial render
renderFavorites();

// Event delegation for removing favorites
favcontainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-fav')) {
    const number = e.target.dataset.number;
    let favorites = JSON.parse(localStorage.getItem('cards')) || [];
    favorites = favorites.filter(fav => fav.number !== number);
    localStorage.setItem('cards', JSON.stringify(favorites));

    // Re-render the list
    renderFavorites();
  }
});

})



