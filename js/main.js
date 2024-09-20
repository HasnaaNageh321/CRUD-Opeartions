var pName = document.getElementById("pName");
var pPrice = document.getElementById("pPrice");
var pCategory = document.getElementById("pCategory");
var pDesc = document.getElementById("pDesc");
var btn = document.getElementById("btn");
var tbody = document.getElementById("tbody");
var SearcProduct = document.getElementById("searchProduct");
var proContainer = [];
var currentIndex =0;
// console.log(pName, pPrice, pCategory, pDesc);
if (JSON.parse(localStorage.getItem("products"))) {
  proContainer = JSON.parse(localStorage.getItem("products"));
  displayProduct();
} else {
  proContainer = [];
}
function addProduct() {
  var product = {
    name: pName.value,
    price: pPrice.value,
    category: pCategory.value,
    description: pDesc.value,
  };
  // console.log(product);
  proContainer.push(product);
  // console.log(proContainer);
  localStorage.setItem("products", JSON.stringify(proContainer));
}
btn.addEventListener("click", function () {
  if (btn.innerHTML =="Add Product"){
    addProduct();
  }
  else {
    updateProduct();
  }
  displayProduct();
  clear();
});
function displayProduct() {
  var products = ``;
  for (var i = 0; i < proContainer.length; i++) {
    products += `
        <tr>
            <td>${i + 1}</td>
            <td>${proContainer[i].name}</td>
            <td>${proContainer[i].price}</td>
            <td>${proContainer[i].category}</td>
            <td>${proContainer[i].description}</td>
            <td><button class="btn delete" onclick="deleteProduct(${i})">Delete</button> </td>
            <td><button class="btn update" onclick="getData(${i})">Update</button> </td>
        </tr> 
        `;
  }
  tbody.innerHTML = products;
}
function deleteProduct(id) {
  proContainer.splice(id, 1);
  localStorage.setItem("products", JSON.stringify(proContainer));
  displayProduct();
}
function getData(id) {
    console.log(id)
  pName.value = proContainer[id].name;
  pPrice.value = proContainer[id].price;
  pCategory.value = proContainer[id].category;
  pDesc.value = proContainer[id].desc;
  btn.innerHTML = "Update Product";
  currentIndex=id;
}
function updateProduct(){
    var product = {
        name: pName.value,
        price: pPrice.value,
        category: pCategory.value,
        description: pDesc.value,
      };
      proContainer[currentIndex]=product;
      localStorage.setItem("products", JSON.stringify(proContainer));
      btn.innerHTML = "Add Product";
}
function clear() {
    (pName.value = ""),
      (pPrice.value = ""),
      (pCategory.value = ""),
      (pDesc.value = "");
}

function searchProduct(term){
    var pros= ``;
    for (var i=0; i<proContainer.length; i++) {
        if(proContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            pros += `
            <tr>
                <td>${i + 1}</td>
                <td>${proContainer[i].name}</td>
                <td>${proContainer[i].price}</td>
                <td>${proContainer[i].category}</td>
                <td>${proContainer[i].description}</td>
                <td><button class="btn delete" onclick="deleteProduct(${i})">Delete</button> </td>
                <td><button class="btn update" onclick="getData(${i})">Update</button> </td>
            </tr> 
            `;
        }
    }
    tbody.innerHTML = pros;
}
SearcProduct.addEventListener('keyup', function(){
    searchProduct(this.value);
});
