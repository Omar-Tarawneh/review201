// ===========
// Global Variables
// ===========

// -[x] Constructor Function
//      - name
//      - categorey 
//      - quantity
//      - price
//      - total = price * quantity
//      -[x] push the global variable 

// -[x] render the header of the table
//      [-name -category - quanitity - price - total]

// -[x] select the form
//      -[x] add event listener
//          - name
//          - category
//          - quantity 
//          -[x] create the object using the constructor

// function to render the table body
//      -[x] render the name, cat, quantity, price, total, Delete Button

// -[x] function to generate random price 

// function to calculate the total
//      -[] loop through the object.total
//      -[] render the total in the par



var table = document.getElementById('all-whishList');
var form = document.getElementById('formList');
var par = document.getElementById('total');
var whishListObjects = [];

// =============
// constructor
// ============

function WishList(name, category, quantity) {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.price = generateRandomPrice();
    this.total = quantity * this.price;
    whishListObjects.push(this);
}





function renderBody(object) {
    var tableRow = document.createElement('tr');
    var nameData = document.createElement('td');
    nameData.textContent = object.name;
    tableRow.appendChild(nameData);

    var catData = document.createElement('td');
    catData.textContent = object.category;
    tableRow.appendChild(catData);

    var quantityData = document.createElement('td');
    quantityData.textContent = object.quantity;
    tableRow.appendChild(quantityData);

    var priceData = document.createElement('td');
    priceData.textContent = object.price;
    tableRow.appendChild(priceData);

    var totalData = document.createElement('td');
    totalData.textContent = object.total;
    tableRow.appendChild(totalData);
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', deleteRow);
    tableRow.appendChild(deleteButton);

    table.appendChild(tableRow);

}


function deleteRow(event) {
    event.target.parentElement.remove();
    // console.log(event.target.parentElement.innerHTML.split('<td>', 2));
    var name = event.target.parentElement.innerHTML.split('<td>', 2);
    name = name[1].replace('</td>', '');
    for (let index = 0; index < whishListObjects.length; index++) {
        if (name == whishListObjects[index].name) {
            var j = whishListObjects.indexOf(whishListObjects[index]);
            whishListObjects.splice(j, 1);
        }
    }
    localStorage.setItem('whishList', JSON.stringify(whishListObjects));
    // console.log(event.target.parentElement);
}


// ==========
// function
// ==========

function generateRandomPrice() {
    return Math.floor(Math.random() * ((1000 - 500) + 1) + 500);
}


function renderHeader() {
    var tableRow = document.createElement('tr');
    var header = ['name', 'Category', 'Quantity', 'Price', 'total'];
    for (let index = 0; index < header.length; index++) {
        var tableHead = document.createElement('th');
        tableHead.textContent = header[index];
        tableRow.appendChild(tableHead);
    }
    table.appendChild(tableRow);
}


function whishListData(event) {
    event.preventDefault();
    var name = event.target.name.value;
    var quantity = event.target.quantity.value;
    var category = event.target.categories.value;
    new WishList(name, category, quantity);
    table.innerHTML = '';
    for (let index = 0; index < whishListObjects.length; index++) {
        renderBody(whishListObjects[index]);

    }
    localStorage.setItem('whishList', JSON.stringify(whishListObjects));
    total();

}




function total() {
    sum = 0;
    for (let index = 0; index < whishListObjects.length; index++) {
        sum = sum + whishListObjects[index].total;
    }
    par.textContent = `The total is : ${sum}`;
}


function storeData() {
    localStorage.setItem('whishList', JSON.stringify(whishListObjects));
}

function restoreData() {
    if (localStorage.getItem('whishList')) {
        whishListObjects = JSON.parse(localStorage.getItem('whishList'));

    }
}



// Calling Funcitons
form.addEventListener('submit', whishListData)
renderHeader();
restoreData();
for (let index = 0; index < whishListObjects.length; index++) {
    renderBody(whishListObjects[index]);

}
