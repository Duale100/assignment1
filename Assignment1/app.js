//JOE BANKER
const balanceEl = document.getElementById("balanceEl")
const btnLoan = document.getElementById("btn-loan")

// The amount of money JOE WORKER has availible in balance.
let balanceAmount = 1000;

function balance () {
    let loanAmount;
    let loanRequest = prompt("Please enter an amount to loan!");
    let loanM = parseInt(loanRequest);
    
    if (loanRequest <= balanceAmount * 2 && loanM > 0) {
        // console.log("You have succesfully loaned " + loanRequest + "kr!");
        alert("You have succesfully loaned " + loanRequest + "kr!");
        loanAmount = "Loan: " + loanM + "kr";
        
    }
    else if (loanAmount === true) {
        alert("too many loans")
    }
    else if (loanRequest <= 0) {
        alert("That is an invalid request!")
    }
    else {
        alert("The requested amount is too much! loan cancelled!");
        // console.log("The requested amount is too much! loan cancelled!");
    }
    document.getElementById("loanEl").innerHTML = loanAmount;

}
    
document.getElementById("btn-loan").addEventListener("click", balance);

document.getElementById("balanceEl").innerHTML = "Balance: " + balanceAmount + "kr";


//WORK
let payEl = document.getElementById("payEl")
const btnBank = document.getElementById("btnBank")
const btnWork = document.getElementById("btnWork")

workPay = 0;

function payOnClick () {
    payEl.innerHTML = workPay += 100;
   // console.log("Increase by 100kr!")
}

function transferMoney () {
       
        let node = payEl.lastChild;
        balanceEl.appendChild(node);  
}

document.getElementById("btnWork").addEventListener("click", payOnClick);

document.getElementById("btnBank").addEventListener("click",transferMoney);


//LAPTOP
const laptopsElement = document.getElementById("laptops") //laptop array etc:
const specsElement = document.getElementById("specs")   // laptop Features
const descriptionElement = document.getElementById("description")   //Laptop desc
const priceElement = document.getElementById("price") // laptop price
const titleElement = document.getElementById("title") //laptop price - uses "laptops" index
const imgElement = document.getElementById("imgEl") //
const buyElement = document.getElementById("btnBuy") // buy laptop btn

let laptops = []; // array

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToMenu(laptops))

const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x));
    specsElement.innerText = laptops[0].specs;
    priceElement.innerText = laptops[0].price;
    
    descriptionElement.innerText = laptops[0].description;
    titleElement.innerText = laptops[0].title;
    imgElement.innerText = laptops[0].image; //
}

const addLaptopToMenu = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
    
}

const handleLaptopChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    specsElement.innerText = selectedLaptop.specs; 
    priceElement.innerText = selectedLaptop.price;

    titleElement.innerText = selectedLaptop.title;
    descriptionElement.innerText = selectedLaptop.description;
    imgElement.src = 'https://noroff-komputer-store-api.herokuapp.com/' + selectedLaptop.image; //
}

const handleLaptopPurchase = () => {
    const selectedLaptop = laptops[laptopsElement.selectedIndex];
    
    const priceTotal = selectedLaptop.price;

    if (selectedLaptop.price <= balanceAmount) {
        //console.log("Laptop purchased!") 
        alert("You are now owner of a new Laptop!")
        balanceAmount -= priceTotal;
        balanceEl.innerHTML = "Balance: " + balanceAmount + "kr";
    }
    else {
        alert("Insufficient funds in Bank!")
    }
}

laptopsElement.addEventListener("change", handleLaptopChange);
buyElement.addEventListener("click", handleLaptopPurchase);
