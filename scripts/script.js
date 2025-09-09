// ===================== Load Categories ==================
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

// ================= Show Loading ==========================
const showLoading = (show) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.classList.toggle("hidden", !show);
};

// ================ Load Trees ==================
const loadTrees = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayTrees(data.plants));
};

// ===================== Display Trees ========================

const displayTrees = (trees) => {
  const treesContainer = document.getElementById("trees-container");
  treesContainer.innerHTML = "";
  trees.forEach((tree) => {
    const div = document.createElement("div");
    div.innerHTML = `
                <div class="p-2 bg-white rounded-lg">
            <div class="space-y-2">
              <img
                class="w-[260px] h-[150px] mx-auto"
                src="${tree.image}"
                alt=""
              />
              <h1 class="font-bold">${tree.name}</h1>
              <p class="text-sm truncate">${tree.description}</p>
              <div class="flex justify-between">
                <p
                  class="bg-[#DCFCE7] text-[#15803D] px-2 py-.5 rounded-xl text-sm"
                >
                  ${tree.category}
                </p>

                <p class="font-semibold"><span>৳</span>${tree.price}</p>
              </div>
              <button
              onclick="addToCart('${tree.name}', ${tree.price})"
                class="bg-[#15803D] text-white w-full rounded-2xl py-1 cursor-pointer hover:bg-green-900"
              >
                Add to Cart
              </button>
            </div>
          </div>
    `;

    treesContainer.appendChild(div);
  });
};

// =================== Display Categories==========================
const categoriesContainer = document.getElementById("categories-container");
const displayCategories = (items) => {
  items.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <button onclick="loadPlantsByCategory('${item.id}', this)"  class="my-2 p-1 hover:bg-green-400 rounded-lg cursor-pointer w-full text-left category-btn">${item.category_name}</button> 
    `;

    categoriesContainer.appendChild(div);
  });
};

//========== Load All Trees By All Trees Button =============
const allTrees = document.getElementById("all-trees");
allTrees.addEventListener("click", function () {
  showLoading(true);
  loadTrees();
  setActiveButton(allTrees);
  showLoading(false);
});

// ============== Set Active Button For Toggling ===========
const setActiveButton = (activeButton) => {
  const allButtons = categoriesContainer.querySelectorAll("button");
  allButtons.forEach((btn) => btn.classList.remove("bg-green-300"));
  activeButton.classList.add("bg-green-300");
};

// Load Plants by Category
const loadPlantsByCategory = (id, btn) => {
  showLoading(true);

  setActiveButton(btn);

  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => {
      if (!res.ok) {
        document.getElementById("trees-container").innerHTML = `
          <p class="text-red-600">Failed to load plants. Status: ${res.status}</p>
        `;
        showLoading(false);
        return null;
      }
      return res.json();
    })
    .then((data) => {
      if (!data) return;

      const trees = data.plants || [];

      if (trees.length === 0) {
        document.getElementById("trees-container").innerHTML = `
          <p class="text-gray-600">No plants found in this category.</p>
        `;
        showLoading(false);
        return;
      }

      displayTrees(trees);

      showLoading(false);
    });
};

// ============ Add to Cart ================
let total = 0;
const cartList = document.getElementById("cart-List");
const totalPrice = document.getElementById("total-Price");
const addToCart = (name, price) => {
  total += price;
  totalPrice.innerText = total;

  const li = document.createElement("li");
  li.className =
    "flex justify-between items-center bg-gray-100 px-3 py-2 rounded";
  li.innerHTML = `
    <span>${name}</span>
    <span>
      ৳${price}
      <button onclick="removeFromCart(this, ${price})" class="ml-2 text-red-500 cursor-pointer">❌</button>
    </span>
  `;
  cartList.appendChild(li);
};

// ============ Remove From Cart ================
// Remove from Cart
const removeFromCart = (btn, price) => {
  total -= price;
  totalPrice.innerText = total;
  btn.closest("li").remove();
};

// =========== Load Function Call ==============
loadCategories();
loadTrees();
