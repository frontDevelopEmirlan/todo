let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
let input3 = document.querySelector(".input3");
let btn = document.querySelector(".createBtn");
let list = document.querySelector(".list");

btn.addEventListener("click", () => {
  if (!input1.value.trim() || !input2.value.trim() || !input3.value.trim()) {
    alert("Заполните поле");
    return;
  }
  let obj = {
    name: input1.value,
    lastName: input2.value,
    img: input3.value,
  }

  let data = JSON.parse(localStorage.getItem('person')) || []
  data.push(obj)
  localStorage.setItem('person', JSON.stringify(data))
  read()
  input1.value = ''
  input2.value = ''
  input3.value = ''
});

function read(){
  list.innerHTML = ""
  let newData = JSON.parse(localStorage.getItem('person')) || []
  newData.forEach((el,index)=>{
    let divInfo = document.createElement('div')
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let img = document.createElement('img')
    let divImg = document.createElement('div')
    let divText = document.createElement('div')
    let delBtn = document.createElement('button')
    divInfo.classList.add('info')
    p1.classList.add('p1')
    p2.classList.add('p2')
    img.classList.add('image')
    divImg.classList.add('img')
    divText.classList.add('text')
    delBtn.classList.add('del')
    p1.innerText = `name : ${el.name[0].toUpperCase() + el.name.toLowerCase().slice(1)}`
    p2.innerText = `last name : ${el.lastName[0].toUpperCase() + el.lastName.toLowerCase().slice(1)}`
    delBtn.innerText = 'delete'
    img.src = el.img
    divImg.append(img)
    divText.append(p1)
    divText.append(p2)
    divInfo.append(divImg)
    divInfo.append(divText)
    divInfo.append(delBtn)
    list.append(divInfo)

    delBtn.addEventListener('click', ()=>{
      del(index)
    })
  })
}

function del(id){
  let data = JSON.parse(localStorage.getItem('person'))
  data.splice(id,1)
  localStorage.setItem('person',JSON.stringify(data))
  read()
}