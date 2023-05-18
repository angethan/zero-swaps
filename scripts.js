// Fetch data from the API
fetch("https://api.coinlore.net/api/tickers/")
  .then(response => response.json())
  .then(data => {
    // Define an array of specific names to filter
    const specificNames = ["Bitcoin", "Ethereum", "XRP", "Litecoin", "Bitcoin Cash"];

    // Filter the data based on the specific names
    const filteredCoins = data.data.filter(coin => specificNames.includes(coin.name));

    // Get the container element
    const container = document.querySelector(".crypto");

    // Create a div for each filtered coin and append it to the container
    filteredCoins.forEach(coin => {
      const coinDiv = document.createElement("div");
      coinDiv.className = "crypto-coins"
      coinDiv.innerHTML = `
        <div class="coin-symbol-name">
            <img src="./assets/icons/coins/${coin.symbol.toLowerCase()}.png" alt="${coin.symbol} Icon" class="coin-image" />
            <span class="coin-symbol">${coin.symbol}</span>
            <span class="coin-name font-medium">${coin.name}</span>  
        </div>
        <hr>
        <div class="coin-price-percentage">
            <h4>$${coin.price_usd}</h4>
            <span class="${coin.percent_change_24h > 0 ? 'light-success' : 'light-danger'}"><i class="${coin.percent_change_24h > 0 ? 'fa-solid fa-circle-chevron-up' : 'fa-solid fa-circle-chevron-down'}"></i> ${coin.percent_change_24h}%</span>
        </div>
      `;
      container.appendChild(coinDiv);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });


// Email & Password Validation
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerButton = document.getElementById('registerButton');
const successMessage = document.getElementById('successMessage');
const emailError = document.getElementById('emailError');

function validateEmailAndPassword() {
    const email = emailInput.value;
    const password = passwordInput.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lengthPattern = /^.{8,15}$/;
    const numberPattern = /\d/;
    const lowercasePattern = /[a-z]/;
    const uppercasePattern = /[A-Z]/;
    const specialCharPattern = /[#\[\]()@$&*!?|,.^/\\+_\-]/;

    const emailValid = emailPattern.test(email);
    const passwordValid =
        lengthPattern.test(password) &&
        numberPattern.test(password) &&
        lowercasePattern.test(password) &&
        uppercasePattern.test(password) &&
        specialCharPattern.test(password);

    emailInput.style.borderColor = emailValid ? 'var(--success)' : 'var(--danger)';
    emailError.style.display = emailValid ? 'none' : 'block';
    passwordInput.style.borderColor = passwordValid ? 'green' : 'var(--danger)';

    const passwordRequirements = document.getElementById('passwordRequirements');
    const lengthRequirement = document.getElementById('lengthRequirement');
    const numberRequirement = document.getElementById('numberRequirement');
    const lowercaseRequirement = document.getElementById('lowercaseRequirement');
    const uppercaseRequirement = document.getElementById('uppercaseRequirement');
    const specialCharRequirement = document.getElementById('specialCharRequirement');

    lengthRequirement.style.color = lengthPattern.test(password) ? 'var(--success)' : 'var(--danger)';
    numberRequirement.style.color = numberPattern.test(password) ? 'var(--success)' : 'var(--danger)';
    lowercaseRequirement.style.color = lowercasePattern.test(password) ? 'var(--success)' : 'var(--danger)';
    uppercaseRequirement.style.color = uppercasePattern.test(password) ? 'var(--success)' : 'var(--danger)';
    specialCharRequirement.style.color = specialCharPattern.test(password) ? 'var(--success)' : 'var(--danger)';

    const allValid = emailValid && passwordValid;

    if (allValid) {
        registerButton.disabled = false;
        registerButton.style.backgroundColor = 'var(--success)';
    } else {
        registerButton.disabled = true;
        registerButton.style.backgroundColor = 'var(--disabled-color)';
    }

}

function showSuccessMessage() {
    successMessage.style.display = 'flex';
}

//Events Gallery Carousel

document.addEventListener('DOMContentLoaded', function() {
  const carouselInner = document.querySelector('.events-carousel__carousel-inner');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentIndex = 0;
  const itemWidth = carouselInner.offsetWidth / 5; // Adjust based on the number of cards to show

  prevBtn.addEventListener('click', function() {
    currentIndex = Math.max(currentIndex - 1, 0);
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  });

  nextBtn.addEventListener('click', function() {
    const numItems = carouselInner.children.length;
    currentIndex = Math.min(currentIndex + 1, numItems - 5); // Adjust based on the number of cards to show
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  });
});