let addToy = false;


function getData() {

  let configObj = {
      method: "GET",
      headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
  };


  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response){
      return response.json();
  })
  .then(function(object){
    let toys = document.getElementById('toy-collection')
    for (const element of object){
       toys.innerHTML += 
      `<div class="card">
      <h2>${element["name"]}</h2>
      <img src=${element["image"]} class="toy-avatar" />
      <p> ${element["likes"]} Likes </p>
      <button class="like-btn">Like <3</button>
      <input id = "toyId" type="hidden" value=${element["id"]}>
      </div>`;
  }
})
  .catch(function(error){
      console.log(error);
  })
}



function newToy (name, image){
  let formData = {
    name: name,
    image: image    
  };

  let configObj = {
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };


  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response){
    return response.json();
  })
  .then(function(object){
    console.log(object);
    document.getElementById('toy-collection').innerHTML += 
    `<div class="card">
    <h2>${object["name"]}</h2>
    <img src=${object["image"]} class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
    </div>`;
  })
  .catch(function(error){
  })
  }


function increaseLikes(e){
  let numLikes = parseInt(e.target.previousElementSibling.innerText) + 1
  let id = e.target.parentNode.childNodes[9].value;
 console.log(numLikes)
  let configObj = {
    method: "PATCH",
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({"likes": numLikes})
  };


  return fetch("http://localhost:3000/toys/"+ id, configObj)
  .then(function(response){
    return response.json();
  })
  .then(function(object){
    e.target.previousElementSibling.innerText = `${object["likes"]} Likes`;
    
  })
  .catch(function(error){
    console.log(error)
  })
  }




document.addEventListener("DOMContentLoaded", () => {
  getData()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  document.addEventListener('submit', (e) =>{
    console.log(e)
    e.preventDefault();
      newToy(e.srcElement.name.value, e.srcElement.image.value);

  })

  let toyCollection = document.getElementById('toy-collection');
  toyCollection.addEventListener('click', (e) => {
      increaseLikes(e);
    })
  }
  )




