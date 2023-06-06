const socket = io();

const formProducts = document.getElementById("formProducts");
formProducts.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = formProducts.elements.title.value;
  const description = formProducts.elements.description.value;
  const price = formProducts.elements.price.value;
  const thumbnails = formProducts.elements.thumbnails.value;
  const code = formProducts.elements.code.value;
  const stock = formProducts.elements.stock.value;
  const category = formProducts.elements.category.value;
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
  fetch(`/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const cardToRemove = document.getElementById(id);
      if (cardToRemove) {
        cardToRemove.remove();
      }
    })
    .catch((err) => console.log(err));
}


/* function deleteProduct(id) {
  fetch(`/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((dataNewProduct) => {
      console.log(dataNewProduct);
      window.location.reload();
    })
    .catch((err) => console.log(err));
} */

