let totalCarrito = 0;
let cartTotalElement = null;


document.addEventListener("DOMContentLoaded", function () {
  const dinamicos = document.querySelectorAll(".contenido-dinamico");
  cartTotalElement = document.getElementById("cart-total");

  dinamicos.forEach((dinamico) => {
    const htmlFile = dinamico.getAttribute("data-html");

    fetch(htmlFile)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar " + htmlFile);
        }
        return response.text();
      })
      .then((html) => {
        dinamico.innerHTML = html;

        cargarTarjetas(dinamico);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

function cargarTarjetas(dinamicoContainer) {
  const cardContainers = dinamicoContainer.querySelectorAll(
    ".grid-container-card"
  );

  if (cardContainers.length === 0) {
    return;
  }

  fetch("https://api.jsonbin.io/v3/b/67fedcfb8a456b79668a34e1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar información del sitio");
      }
      return response.json();
    })
    .then((json) => {
      const data = json.record;
      cardContainers.forEach((container) => {
        const selectedType = container.getAttribute("data-type");
        const filteredCards = data.filter((card) => card.type === selectedType);

        filteredCards.forEach((card) => {
          const article = document.createElement("article");
          article.classList.add("card");

          article.setAttribute("data-price", card.price);

          const cardImg = document.createElement("div");
          cardImg.classList.add("card-img");
          const img = document.createElement("img");
          img.src = card.img;
          img.alt = card.title;

          img.addEventListener("click", function() {
            toggleSelection(article, card.price);
          });

          
          cardImg.appendChild(img);

          const cardContent = document.createElement("div");
          cardContent.classList.add("card-content");
          const h3 = document.createElement("h3");
          h3.textContent = card.title;
          const p = document.createElement("p");
          p.textContent = card.description;

          cardContent.appendChild(h3);
          cardContent.appendChild(p);

          article.appendChild(cardImg);
          article.appendChild(cardContent);

          container.appendChild(article);
        });
      });
    })
    .catch((error) => {
      console.error("Error al cargar las cards:", error);
    });
}

function toggleSelection(cardElement, price) {
  if (cardElement.classList.contains("selected")) {
    cardElement.classList.remove("selected");
    totalCarrito -= price;
  } else {
    cardElement.classList.add("selected");
    totalCarrito += price;
  }

  actualizarTotal();
}

function actualizarTotal() {
  const fixedTotal = totalCarrito.toFixed(2); 
  cartTotalElement.textContent = `Total: $${fixedTotal}`;
}