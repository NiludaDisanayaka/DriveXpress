function calculateEMI() {

    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value);
    let loanDuration = parseFloat(document.getElementById("loanDuration").value);

    let errorMsg = document.getElementById("errorMsg");
    let outputBox = document.getElementById("outputBox");

    errorMsg.innerHTML = "";
    outputBox.style.display = "none";

    if (!loanAmount || !interestRate || !loanDuration) {
        errorMsg.innerHTML = "Please enter all values correctly.";
        return;
    }

    let monthlyRate = interestRate / (12 * 100);

    let emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanDuration)) /
              (Math.pow(1 + monthlyRate, loanDuration) - 1);

    let totalPayment = emi * loanDuration;
    let totalInterest = totalPayment - loanAmount;

    document.getElementById("emi").innerHTML = "Rs. " + emi.toFixed(2);
    document.getElementById("totalPayment").innerHTML = "Rs. " + totalPayment.toFixed(2);
    document.getElementById("totalInterest").innerHTML = "Rs. " + totalInterest.toFixed(2);

    outputBox.style.display = "flex";
}
