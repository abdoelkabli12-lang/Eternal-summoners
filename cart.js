document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');





function renderCarts() {
  const cart = JSON.parse(localStorage.getItem('cards1')) || [];
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center mt-20">
        <img src="imgs/bg pika.png" class="w-60 opacity-50">
        <p class="text-white text-2xl font-GoldM mt-4">No carts yet!</p>
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = '';
  cart.forEach((card, i) => {
    const cardHTML =`
    <div id="cart-container-${i}" class=" grid grid-cols-2">
      <div>
      <div id = "cont" class="relative left-9 w-40 h-60 border-stroke border-8 rounded-lg">
        <div id = ${card.ind}-${i} class="absolute bg-underbg -z-1 h-56 w-[9rem] top-0">
        </div>


        <div class="">
          <div class="absolute flex items-center justify-center z-100 w-10 h-10 bg-gblue right-3 top-2 rounded-full md:h-15 w-15">
            <p class="text-white font-semibold text-[18px] text-center md:text-[20px]">
              ${card.number}
            </p>
          </div>



          <img src="${card.image}" class="relative w-[10rem] h-[8rem]">

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
          <div class="relative flex gap-1 ml-3 top-7 text-center">
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

      </div>


      <div class="text-lg font-GoldM text-white">

        <div class="flex gap-2 ml-20 mt-2 items-center">
            <button id="plus-btn-${card.number}" class = "bg-blue-500 text-white p-1 rounded">+</button>
            <span id="quantity-${card.number}">${card.quantity}</span>
            <button id="minus-btn-${card.number}" class = "bg-red-500 text-white p-1 rounded">-</button>
            </div>
            <p id="price" class=" ml-20 mt-0 text-white font-bold">$100</p>
          </div>
        </div>
          
          </div>
          
          </div>
          
      <button id="order" class="absolute bg-gred font-press-start text-xs bottom-5 left-45 pl-4 pr-4 pt-2 pb-2 rounded-md">
        Order
      </button>

      <button id="cancel" class="absolute bg-gred font-press-start text-xs bottom-5 left-80 pl-4 pr-4 pt-2 pb-2 rounded-md">
        Cancel
      </button>

      <p class="absolute bottom-16 right-80 text-white font-GoldM">
        Total:
      </p>
      <p id="total" class="absolute bottom-16 right-65 text-white font-GoldM">
        0
      </p>
    </div>`;
    cartContainer.innerHTML += cardHTML;
    console.log("hey")
    
  });

  function calculateTotal() {
  const cart = JSON.parse(localStorage.getItem('cards1')) || [];
  let total = 0;

  cart.forEach(card => {
    const price = card.price || 100;
    total += price * (card.quantity || 1);
  });


  const totalEl = document.getElementById('total');
  if (totalEl) totalEl.textContent = `$${total}`;
}

  cart.forEach((card, i) => {
    
    let plusBtn = document.getElementById(`plus-btn-${card.number}`);
    let minusBtn = document.getElementById(`minus-btn-${card.number}`);
    let quantityC = document.getElementById(`quantity-${card.number}`);
    // let removeBtn = document.getElementById(`remove-btn-${card.number}`);

    let quantity = 1;

  plusBtn.addEventListener('click', () => {
    quantity++;
    quantityC.textContent = quantity;
    let cart = JSON.parse(localStorage.getItem('cards1')) || [];
    const item = cart.find(ct => ct.number === card.number);
    if (item) item.quantity = quantity;
    localStorage.setItem('cards1', JSON.stringify(cart));
    calculateTotal();
  });

  minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityC.textContent = quantity;

      let cart = JSON.parse(localStorage.getItem('cards1')) || [];
      const item = cart.find(ct => ct.number === card.number);
      if (item) item.quantity = quantity;
      localStorage.setItem('cards1', JSON.stringify(cart));
      calculateTotal();

    } else {
      let cart = JSON.parse(localStorage.getItem('cards1')) || [];
      cart = cart.filter(ct => ct.number !== card.number);
      localStorage.setItem('cards1', JSON.stringify(cart));
      renderCarts();
      calculateTotal();
    }

    });

  });
  calculateTotal();
}
renderCarts();
});