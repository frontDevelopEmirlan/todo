let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
let input3 = document.querySelector(".input3");
let btn = document.querySelector(".createBtn");
let list = document.querySelector(".list");
let openBtn = document.querySelector(".openBtn");
let editBlock = document.querySelector(".editBlock");
let input = document.querySelectorAll("input");

read();
btn.addEventListener("click", () => {
  if (!input1.value.trim() || !input2.value.trim() || !input3.value.trim()) {
    alert("Заполните поле");
    return;
  }
  let obj = {
    name: input1.value,
    lastName: input2.value,
    img: input3.value,
  };

  let data = JSON.parse(localStorage.getItem("person")) || [];
  if (
    data.some(
      (el) =>
        el.name === obj.name ||
        el.lastName === obj.lastName ||
        el.img === obj.img
    )
  ) {
    alert("такой элемент уже есть");
    for (let i of input) {
      i.value = "";
    }
    return;
  }
  data.push(obj);
  localStorage.setItem("person", JSON.stringify(data));
  read();
  for (let i of input) {
    i.value = "";
  }
});

openBtn.addEventListener("click", () => {
  list.style.display = "block";
  openBtn.innerText = "close";
});
openBtn.addEventListener("dblclick", () => {
  list.style.display = "none";
  openBtn.innerText = "open";
});

function read() {
  let newData = JSON.parse(localStorage.getItem("person")) || [];
  list.innerHTML = "";
  newData.forEach((el, index) => {
    let divInfo = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let img = document.createElement("img");
    let divImg = document.createElement("div");
    let divText = document.createElement("div");
    let divBtn = document.createElement("div");
    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    divInfo.classList.add("info");
    p1.classList.add("p1");
    p2.classList.add("p2");
    img.classList.add("image");
    divImg.classList.add("img");
    divText.classList.add("text");
    divBtn.classList.add("btns");
    delBtn.classList.add("del");
    editBtn.classList.add("edit");
    p1.innerText = `name : ${el.name}`;
    p2.innerText = `last name : ${el.lastName}`;
    delBtn.innerHTML = `<ion-icon name="trash"></ion-icon>`;
    editBtn.innerHTML = `<ion-icon name="create"></ion-icon>`;
    img.src = el.img;
    divImg.append(img);
    divText.append(p1);
    divText.append(p2);
    divBtn.append(delBtn);
    divBtn.append(editBtn);
    divInfo.append(divImg);
    divInfo.append(divText);
    divInfo.append(divBtn);

    list.append(divInfo);

    delBtn.addEventListener("click", () => {
      alert('delete')
      del(index);
    });
    editBtn.addEventListener("click", () => {
      editBlock.style.display = "block";
      editContact(index);
    });
  });
}

function del(id) {
  let data = JSON.parse(localStorage.getItem("person"));
  data.splice(id, 1);
  localStorage.setItem("person", JSON.stringify(data));
  read();
}

let updateInput1 = document.querySelector(".inputUpdate1");
let updateInput2 = document.querySelector(".inputUpdate2");
let updateInput3 = document.querySelector(".inputUpdate3");
let saveBtn = document.querySelector(".editBtn");

function editContact(index) {
  let data = JSON.parse(localStorage.getItem("person")) || [];

  updateInput1.setAttribute("index", index);
  updateInput2.setAttribute("index", index);
  updateInput3.setAttribute("index", index);

  updateInput1.value = data[index].name;
  updateInput2.value = data[index].lastName;
  updateInput3.value = data[index].img;
}

saveBtn.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("person")) || [];
  
  let nameId = updateInput1.value;
  let lastNameId = updateInput2.value;
  let imgId = updateInput3.value;

  let newObj = {
    name: updateInput1.value,
    lastName: updateInput2.value,
    img: updateInput3.value,
  };

  data.splice(nameId, 1, newObj);
  data.splice(lastNameId, 1, newObj);
  data.splice(imgId, 1, newObj);

  localStorage.setItem("person", JSON.stringify(data));
  read();
  editBlock.style.display = "none";
  alert('edit')
});
