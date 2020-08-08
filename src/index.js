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
  fetchToys(); 
});

const fetchToys = () => {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())  
  .then(json => createCard(json))
}

// h2 tag with the toy's name
function createName(toy, card) {
  let name = document.createElement('h2')
  name.innerText = toy.name
  card.appendChild(name)
}

// img tag with: src of the toy's image // class of "toy-avatar"
function createPhoto(toy, card) {
  let img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"
  card.appendChild(img)
}

// p tag with total likes
function totalLikes(toy, card) {
  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`
  card.appendChild(likes)
}

// button with class="like-btn"
function addButton(toy, card) {
  let newButton = document.createElement('button')
  newButton.addEventListener('click', function() {
    increaseCount(toy);
    window.location.reload(true);
  })
  newButton.className = "like-btn"
  newButton.style = "width: 30px;height:30px;cursor:pointer;"
  newButton.innerText = "♥"
  card.appendChild(newButton)
}

function createCard(json) {
  const collection = document.querySelector('div#toy-collection');
  // for each toy
  for (const toy of json) {
    let newDiv = document.createElement('div') // create div
    newDiv.className = "card" // with class = "card"
    createName(toy, newDiv)
    createPhoto(toy, newDiv)
    totalLikes(toy, newDiv)
    addButton(toy, newDiv)
    collection.appendChild(newDiv); // append to toyCollection
  }
}

function sendDataForToys(form) {
  fetch('https:localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  },
  body: JSON.stringify({
    name: form.name.value, image: form.image.value, likes: 0
  })
})
.then(resp => resp(json))
.then(newToy => {
  const toyContainer = document.querySelector('#toy-collection')
  toyContainer.insertAdjacentElement('beforeend', 
  `<div class="card">
  <h2>${newToy.name}</h2>
  <img src=${newToy.image} class="toy-avatar" />
  <p><span class="counter" data-id="${newToy.id}" > ${newToy.likes = 0}</span>Likes</p>
  <button class="like-btn" data-id="${newToy.id}" > Like <3</button>
  </div`)
  form.reset()
})
}



