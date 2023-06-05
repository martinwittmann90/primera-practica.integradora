const socket = io();

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = form.elements.title.value;
  const description = form.elements.description.value;
  const price = form.elements.price.value;
  const thumbnails = form.elements.thumbnails.value;
  const code = form.elements.code.value;
  const stock = form.elements.stock.value;
  const category = form.elements.category.value;
    const newProductIncorporate = {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      category,
    };
    console.log(newProductIncorporate);
    socket.emit("product_front_to_back", newProductIncorporate);
    formProducts.reset();
  });

  socket.on("products_back_to_front", (dataNewProduct) => {
    console.log("products_back_to_front", dataNewProduct);
    const cardContainer = document.getElementById('cardContainer');
    let newCard = document.createElement('div');
    newCard.id = dataNewProduct.id;
    newCard.style.display = 'inline-block';
    newCard.style.margin = '10px';
    newCard.style.border = '5px solid black';

    newCard.innerHTML = `
    <h2>${dataNewProduct.title}</h2>
    <p>${dataNewProduct.description}</p>
    <p>Precio: ${dataNewProduct.price}</p>
    <p>Code: ${dataNewProduct.code}</p>
    <p>Stock: ${dataNewProduct.stock}</p>
    <p>Category: ${dataNewProduct.category}</p>
    <img src="${dataNewProduct.thumbnails}">
    `;
    cardContainer.appendChild(newCard);
    window.location.reload();
});

function deleteProduct(id) {
  fetch(`/api/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((dataNewProduct) => {
      console.log(dataNewProduct);
      window.location.reload();
    })
    .catch((err) => console.log(err));
}

