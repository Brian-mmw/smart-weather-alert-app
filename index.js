// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const displayDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

button.addEventListener("click", () => {
  const state = input.value;

  // clear error before fetch
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network failure");
      }
      return res.json();
    })
    .then((data) => {
      displayDiv.innerHTML = "";

      const alerts = data.features;

      const count = document.createElement("p");
      count.textContent = `Weather Alerts: ${alerts.length}`;
      displayDiv.appendChild(count);

      alerts.forEach((alert) => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        displayDiv.appendChild(p);
      });

      // clear input
      input.value = "";

      // clear error after success
      errorDiv.textContent = "";
      errorDiv.classList.add("hidden");
    })
    .catch((error) => {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove("hidden");
    });
});