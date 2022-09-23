//driver function

function getValues(){
    //get the values that the user entered
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;

    //parse numbers
    let loanNum = parseInt(loanAmount);
    let termNum = parseInt(term);
    let rateNum = parseFloat(rate);  //hopefully parseFloat does the same thing as parseInt but for decimal numbers

    let payments = generatePayments(loanNum,termNum,rateNum);
    displayPayments(payments);
    displayTotalOverview(payments);
}

function generatePayments(loanNum,termNum,rateNum){
    //what are the inputs for the function
    //loanNum, remNum, and rateNum
    
    let payment = calcPayment(loanNum,termNum,rateNum);
    let rate = rateNum/1200;
    let totalInterest = 0;
    let balance = loanNum;
    let payments = [];

    for (let index = 1; index <= termNum; index++) {
        
        let interestPay = balance * rate;
        let prinPay = payment - interestPay;
        totalInterest = totalInterest + interestPay;
        balance = balance - prinPay;
        if (balance < 0) { 
            balance = 0
        }
        
        let monthPayment = {
            month: index, //simply the index number starting at 1
            payment: payment, //the payment calculation which calls the calcPayment function
            principal: prinPay, //the total current loan amount - the interest payment ????
            interest: interestPay, //the current loan amount * the interest rate
            totalInterest: totalInterest, //all the interest payments added together to date
            balance: balance //total loan - all payments to date
        }
        payments.push(monthPayment);                                                                                                    
    }

    //return an array of payment objects
    return payments;
}

function calcPayment(loanNum,termNum,rateNum){
    let rate = rateNum/1200;
    return (loanNum * rate) / (1 - Math.pow(1 + rate,-termNum));
}

function displayPayments(payments){
    //appendChild goes here *Somewhere*
    let paymentTemplate = document.getElementById("statData-template");
    let paymentBody = document.getElementById("statBody");
    let monthlyPaymentBody = document.getElementById("monthly-payment");

    monthlyPaymentBody.innerHTML = "";
    paymentBody.innerHTML = "";

    for (let index = 0; index < payments.length; index++) {
        let paymentNode = document.importNode(paymentTemplate.content,true);
        let paymentItems = paymentNode.querySelectorAll("td");

        paymentItems[0].textContent = payments[index].month;
        paymentItems[1].textContent = `$${payments[index].payment.toFixed(2)}`;
        paymentItems[2].textContent = `$${payments[index].principal.toFixed(2)}`;
        paymentItems[3].textContent = `$${payments[index].interest.toFixed(2)}`;
        paymentItems[4].textContent = `$${payments[index].totalInterest.toFixed(2)}`;
        paymentItems[5].textContent = `$${payments[index].balance.toFixed(2)}`;

        paymentBody.appendChild(paymentNode);
    }

    //we have monthly payments in the array. take the monthly payment from the array.
    let monthlyPayment = payments[0].payment.toFixed(2);
    monthlyPaymentBody.innerHTML = `$${monthlyPayment}`;
}

function displayTotalOverview(payments){
    let totalPrincipalBody = document.getElementById("totalPrincipal");
    let totalInterestBody = document.getElementById("totalInterest");
    let totalCostBody = document.getElementById("totalCost");

    let totalPrincipal = 0;
    let totalInterest = 0;

    for (let index = 0; index < payments.length; index++) {
        totalPrincipal += payments[index].principal;
        totalInterest += payments[index].interest; 
    }

    totalPrincipalBody.innerHTML = `$${totalPrincipal.toFixed(2)}`;
    totalInterestBody.innerHTML = `$${totalInterest.toFixed(2)}`;
    totalCostBody.innerHTML = `$${(totalPrincipal + totalInterest).toFixed(2)}`;

}