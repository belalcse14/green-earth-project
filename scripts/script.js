const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

// ============== Load All Trees ===============

// category: "Fruit Tree";
// description: "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.";
// id: 1;
// image: "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg";
// name: "Mango Tree";
// price: 500;

const loadTrees = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayTrees(data.plants));
};

// ===================== Display Function ========================

const displayTrees = (trees) => {
  const treesContainer = document.getElementById("trees-container");
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

// ============================================================================
const displayCategories = (items) => {
  const categoriesContainer = document.getElementById("categories-container");
  items.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <p class="my-2 p-1 hover:bg-green-400 cursor-pointer">${item.category_name}</p> 
    `;

    categoriesContainer.appendChild(div);
  });
};

// =========== Load Function Call ==============
loadCategories();
loadTrees();
