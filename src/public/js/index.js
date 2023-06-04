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

  socket.on("products_back_to_front", (data) => {
    console.log("products_back_to_front", data);
    const cardContainer = document.getElementById('cardContainer');
    let newCard = document.createElement('div');
    newCard.id = data.id;
    newCard.style.display = 'inline-block';
    newCard.style.margin = '10px';
    newCard.style.border = '5px solid black';

    newCard.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>Precio: ${data.price}</p>
    <p>Code: ${data.code}</p>
    <p>Stock: ${data.stock}</p>
    <p>Category: ${data.category}</p>
    <img src="${data.thumbnails}">
    `;
    cardContainer.appendChild(newCard);
    window.location.reload();
});

function deleteProduct(id) {
  fetch(`/api/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.reload();
    })
    .catch((err) => console.log(err));
}

