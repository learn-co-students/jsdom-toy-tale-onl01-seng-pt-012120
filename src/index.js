let addToy = false;
const toyUrl = `http://localhost:3000/toys/`

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
  
  fetchToys()
  
  document.querySelector(".add-toy-form").addEventListener('submit', (e)=>{
    e.preventDefault()
    let newToy = {
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    }
    postToy(newToy)
  })
});

function postToy(newToy){

  // let newToy = {
  //     "name": e.target.name.value,
  //     "image": e.target.image.value,
  //     "likes": 0
  //   }

  let options = {
    method: 'POST',
    headers:
    {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  }
  
  fetch(toyUrl, options)
  .then(res => res.json())
  .then(renderCard)
}

function fetchToys(){
  fetch(toyUrl)
  .then(res => res.json())
  .then(toyArray => toyArray.forEach(toy=>renderCard(toy)))
}

function addLikes(toy, likes){
  console.log(toy, "before patch")

  let likesCount = parseInt(likes.innerText) + 1

  let newLikes = {
    "likes": likesCount
  }

  let options = {
    method: "PATCH",
    headers:{
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newLikes)
  }
  
  fetch(toyUrl+toy.id, options)
  .then(res=>res.json())
  .then(updatedToy => likes.innerText = `${updatedToy.likes} Likes`)
}

function renderCard(toy){
  const toyCollection = document.getElementById('toy-collection')

  let toyCard = document.createElement('div')
  toyCard.className = 'card'

  let toyName = document.createElement('h2')
  toyName.innerText = toy.name

  let toyImg = document.createElement('img')
  toyImg.className = 'toy-avatar'
  toyImg.src = toy.image

  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} Likes`

  let likeButton = document.createElement('button')
  likeButton.className = "like-btn"
  likeButton.innerText = "Like"
  likeButton.addEventListener('click', (e)=>{
    addLikes(toy, likes)
  })

  toyCard.append(toyName, toyImg, likes, likeButton)
  toyCollection.append(toyCard)
}


// function postToy(newToy){
//   let options = {
//     headers:
//     {
//       "Content-type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       "name": e.target.name.value,
//       "image": e.target.image.value,
//       "likes": 0
//     })
//   }
  
// }