document.getElementById('investment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    var initialLumpSum = parseFloat(document.getElementById('initial-lump-sum').value);
    var monthlyAmount = parseFloat(document.getElementById('monthly-amount').value);
    var investmentType = document.getElementById('investment-type').value;

    // Check if values are valid
    if (isNaN(initialLumpSum) || isNaN(monthlyAmount)) {
        alert('Please enter valid numerical values for the initial lump sum and monthly amount.');
        return;
    }

    // Investment calculation logic based on investment type
    var maxAnnualInvestment, minMonthlyInvestment, minInitialInvestment, predictedReturns, estimatedTax, rbsxFees;

    if (investmentType === 'basic') {
        maxAnnualInvestment = 20000;
        minMonthlyInvestment = 50;
        minInitialInvestment = 0;  // N/A for Basic Savings Plan
        predictedReturns = { min: 1.2, max: 2.4 };
        estimatedTax = 0;
        rbsxFees = 0.25;
    } else if (investmentType === 'plus') {
        maxAnnualInvestment = 30000;
        minMonthlyInvestment = 50;
        minInitialInvestment = 300;
        predictedReturns = { min: 3, max: 5 };
        estimatedTax = 0.1;  // 10% on profits above £12,000
        rbsxFees = 0.3;
    } else {
        alert('Invalid investment type selected.');
        return;
    }

    // Validate investment amounts
    if (initialLumpSum < minInitialInvestment || monthlyAmount < minMonthlyInvestment || monthlyAmount * 12 > maxAnnualInvestment) {
        alert('Invalid investment amounts. Please check the requirements.');
        return;
    }

    // Your investment calculation logic here
    // Assuming a simple interest calculation for demonstration purposes
    var annualInterest = (initialLumpSum + (monthlyAmount * 12)) * (predictedReturns.min + predictedReturns.max) / 200;
    var estimatedProfit = annualInterest - (estimatedTax > 0 ? Math.max(0, annualInterest - 12000) * estimatedTax : 0);
    var totalAmount = initialLumpSum + estimatedProfit;

    // Display the result in the div
    var resultDiv = document.getElementById('investment-result');
    resultDiv.innerHTML = `
        <h2>Investment Quote Generated!</h2>
        <p>Estimated Profit: £${estimatedProfit.toFixed(2)}</p>
        <p>Total Amount: £${totalAmount.toFixed(2)}</p>
    `;
});