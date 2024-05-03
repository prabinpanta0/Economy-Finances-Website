const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

async function fetchExchangeRates() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    const data = await response.json();
    return data.rates;
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const initialCurrency = document.getElementById("initial-currency").value;
    const targetCurrency = document.getElementById("target-currency").value;

    const exchangeRates = await fetchExchangeRates();
    const conversionRate = exchangeRates[targetCurrency] / exchangeRates[initialCurrency];
    const result = amount * conversionRate;

    document.getElementById("result").textContent = `Result: ${result.toFixed(2)} ${targetCurrency}`;
}