const form = document.querySelector("form");
const results = document.querySelector("#results");
let loading = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  if (!data.url && loading) {
    return;
  }

  loading = true;
  results.innerHTML = "carregando...";

  fetch("./get-images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(
      (images) => {
        results.innerHTML = images
          .map(
            (image) => `
            <div>
              <img src="${image.src}" style="
                max-width: 300px;
                max-height: 300px;
              " />
              <div>${image.alt || "a imagem não possui descrição"}</div>
            </div>
          `
          )
          .join("<hr />");
      },
      () => {
        results.innerHTML = "algum erro aconteceu :(";
      }
    )
    .finally(() => {
      loading = false;
    });
});
