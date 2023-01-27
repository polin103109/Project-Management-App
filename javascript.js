function validateForm() {
  let ID = document.getElementById("ID").value;
  let name2 = document.getElementById("name2").value;

  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;

  if (ID === "") {
    alert("ID is required");
    return false;
  }
  if (name2 === "") {
    alert("Username is required");
    return false;
  }
  if (name === "") {
    alert("Product Name is required");
    return false;
  } else if (name.length > 6) {
    alert("Product Name must be shorter");
    return false;
  }
  if (price === "") {
    alert("Price is required");
    return false;
  } else if (price < 0) {
    alert("Price must be positive number");
    return false;
  } else if (price > 100000) {
    alert("Price must not be longer than 100000");
    return false;
  }
  return true;
}

function showData() {
  let productList;
  if (localStorage.getItem("productList") === null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  let html = "";

  productList.map(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.ID + "</td>";
    html += "<td>" + element.name2 + "</td>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.price + "</td>";

    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button></td>';
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}
document.onload = showData();

function AddProduct() {
  if (validateForm() === true) {
    let ID = document.getElementById("ID").value;
    let name2 = document.getElementById("name2").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let productList;
    if (localStorage.getItem("productList") === null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }

    productList.push({
      ID: ID,
      name2: name2,
      name: name,
      price: price,
    });
    localStorage.setItem("productList", JSON.stringify(productList));
    showData();
    document.getElementById("ID").value = "";
    document.getElementById("name2").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
  }
}
function deleteData(index) {
  let productList;
  if (localStorage.getItem("productList") === null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  showData();
}
function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  let productList;
  if (localStorage.getItem("productList") === null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }
  document.getElementById("ID").value = productList[index].ID;
  document.getElementById("name2").value = productList[index].name2;
  document.getElementById("name").value = productList[index].name;
  document.getElementById("price").value = productList[index].price;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() === true) {
      productList[index].ID = document.getElementById("ID").value;
      productList[index].name2 = document.getElementById("name2").value;
      productList[index].name = document.getElementById("name").value;
      productList[index].price = document.getElementById("price").value;

      localStorage.setItem("productList", JSON.stringify(productList));
      showData();
      document.getElementById("ID").value = "";
      document.getElementById("name2").value = "";
      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}
