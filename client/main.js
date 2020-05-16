(() => {
  const form = document.querySelector("form");
  const url = new URLSearchParams(window.location.search).get("url");

  if (url) {
    setTimeout(() => {
      form.elements[0].value = url;
    }, 1);

    results.innerHTML = "<center>carregando...</center>";

    fetch("./get-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then(
        (images) => {
          if (images.length === 0) {
            results.innerHTML = "<center>nenhuma image encontrada</center>";
          } else {
            let html = images
              .map(
                (image) => `
              <div class="card">
                <div class="card-image">
                  <img src="${image.src}" />
                </div>
                <div class="card-content">
                ${image.alt || "a imagem não possui descrição"}
                </div>
              </div>
          `
              )
              .join("\n");

            results.innerHTML = `<div class="grid">${html}</div>`;
          }
        },
        () => {
          results.innerHTML = "<center>algum erro aconteceu :(</center>";
        }
      );
  }
})();
