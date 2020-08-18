let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

  return fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      renderToys(json)
    }) 
  });

function renderToys(json) {
  let toyCollection = document.querySelector('#toy-collection')
  json.forEach(toy => {
    let div = document.createElement('div')
    div.className = 'card'
    div.innerHTML = `<h2>${toy.name}</h2>
    <img src= ${toy.image} style='height: 100%; width: 100%; object-fit: contain' class='#toy-avatar'/>
    <p><span class=likes id=${toy.id}> ${toy.likes} Likes</p>
    <button id=${toy.id} class=like-btn>Like <3</button>`
    toyCollection.append(div)
  })
  let buttons = document.querySelectorAll('.like-btn')
  for (let i = 0; i < buttons.length ; i++) {
    buttons[i].addEventListener("click", function(e) {
      likeToy(i)
    });
  };
}

function likeToy(i) {
  let likeArray = document.querySelectorAll('.card')[i].querySelector('.likes').innerText.split(" ")
  likeArray[0] ++
  newString = likeArray.join(" ")
  document.querySelectorAll('.card')[i].querySelector('.likes').innerText = newString
  let info = {
    likes: likeArray[0]
  }
  let configObj = {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(info)
  };

  let id = i + 1
  fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(function(response) {
      response.json();
    })
}

let toyFormContainer = document.querySelector(".container")
toyFormContainer.addEventListener('submit', function(e) {
  addNewToy(e.target)
  e.preventDefault()
})

function addNewToy(form) {
  let info = {
    name: form.name.value,
    image: form.image.value,
    likes: 0
  }
  let configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(info)
  };
  return fetch('http://localhost:3000/toys', configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(newToy) {
      let toyCollection = document.querySelector('#toy-collection')
      let div = document.createElement('div')
      div.className = 'card'
      div.innerHTML = `<h2>${newToy.name}</h2>
      <img src= ${newToy.image} style='height: 100%; width: 100%; object-fit: contain' class='#toy-avatar'/>
      <p><span class=likes id=${newToy.id}> ${newToy.likes} Likes</p>
      <button id=${newToy.id} class=like-btn>Like <3</button>`
      toyCollection.append(div)
    });
};
