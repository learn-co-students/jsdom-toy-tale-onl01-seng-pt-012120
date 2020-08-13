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
  getToys();

});


 function getToys() {
  const toyUrl = 'http://localhost:3000/toys'
  fetch('http://localhost:3000/toys') 
  .then(response => response.json())
  .then(results => results.forEach(toy => {
    makeCards(toy)   
  }))
 }

function makeCards(toy) {
  let card = document.createElement('div')
  card.classList.add("card");
  let toyCollection = document.getElementById("toy-collection")
  toyCollection.appendChild(card)
  let Cardname = document.createElement('h2')
  Cardname.innerText = `${toy.name}`
  card.appendChild(Cardname)
  let img = document.createElement('img')
  img.src = toy.image
  img.style.width = '90%'
  img.style.height = 'auto'
  card.appendChild(img)
  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  card.appendChild(p)
  let likeButton = document.createElement('button')
  likeButton.innerText = "Like"
  likeButton.classList.add('like-btn')
  card.appendChild(likeButton)
}


function addNewToy() {
let toyForm = document.querySelector('.container')
toyForm.addEventListener('submit', function(event) {
  event.preventDefault()

  const newToyName = event.target.name.value
  const newToyimage = event.target.image.value

  let toyObject = {
    name: newToyName,
    image: newToyimage,
    likes: 10
  }

  let configObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(toyObject)
};
 
fetch("http://localhost:3000/toys", configObj)
  .then(response => response.json())
  .then(result => makeCards(result))
})



}



  toyCollection = document.querySelector("#toy-collection")
  toyCollection.addEventListener('click', function(event){
  
  if (event.target.className === 'like-btn') {

    let likes = parseInt(event.target.previousElementSibling.innerText)
    let newLikes = likes + 1
    event.target.previousElementSibling.innerText = newLikes + " Likes"
    
  
  
    

 


 let configObj = {
   method: "PATCH",
   headers: {
     "Content-Type": "application/json",
     "Accept": "application/json"
   },
   body: JSON.stringify({
     "likes": newLikes
   })
 };


 fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, configObj)

}


})



