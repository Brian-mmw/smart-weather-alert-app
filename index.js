const input = document.getElementById("country-input");
const btn = document.getElementById("search-btn");
const result = document.getElementById("result");
const error = document.getElementById("error");

btn.addEventListener("click", () => {
  const country = input.value;

  error.textContent = "";
  error.classList.add("d-none");
  result.innerHTML = "";

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => res.json())
    .then(data => {
      const c = data[0];

      result.innerHTML = `
        <img src="${c.flags.png}" class="img-fluid mb-2">
        <h5>${c.name.common}</h5>
        <p>Capital: ${c.capital}</p>
        <p>Population: ${c.population}</p>
        <p>Region: ${c.region}</p>
      `;

      input.value = "";
    })
    .catch(() => {
      error.textContent = "Country not found";
      error.classList.remove("d-none");
    });
});