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
});

const initialize = () => {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(showToy))
}

const showToy = toy => {
  let toyNew = toy
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML = `
  <h2>${toyNew.name}</h2>
  <img src=${toyNew.image} class="toy-avatar" />`
  let likesP = document.createElement('p')
  likesP.innerText = `${toyNew.likes} Likes`
  toyCard.append(likesP)
  let likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.innerText = 'Like <3'
  likeBtn.addEventListener('click', e => increaseLikes(e, toyNew))
  toyCard.append(likeBtn)
  toyCollection.append(toyCard)
}

const increaseLikes = (e, toy) => {
  let toyLikes = toy.likes
  let toyId = toy.id
  return fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ likes: ++toyLikes })
  })
    .then(resp => resp.json())
    .then(showLikes(e))
}

const showLikes = e => {
  e.preventDefault()
  // let num =  e.target.parentElement.children[2].innerText
  let newNum =
    parseInt(e.target.parentElement.children[2].innerText.split(' ')[0]) + 1
  e.target.parentElement.children[2].innerText = `${newNum} Likes`
}

initialize()