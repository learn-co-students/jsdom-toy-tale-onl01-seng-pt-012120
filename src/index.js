// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });



// Fetch Andy's Toys
// On the index.html page, there is a div with the id "toy-collection."
// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

// When the page loads, make a 'GET' request to fetch all the toy objects.

// document.addEventListener("DOMContentLoaded", () =>{

  //  console.log('page is fully loaded');
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  let addToy = false

  // addBtn.addEventListener("click", () => {
  //   // hide & seek with the form
  //   addToy = !addToy;
  //   if (addToy) {
  //     toyFormContainer.style.display = "block";
  //   } else {
  //     toyFormContainer.style.display = "none";
    
  //   }
  //  })


   document.addEventListener("DOMContentLoaded", () =>{

   const toyCollection = document.querySelector("#toy-collection")
  
   fetch("http://localhost:3000/toys")
  .then(r => r.json()) 
  .then(toys =>  {
//  console.log(toys) 

let toysHTML = toys.map(function(toy){


return`
<div class="card" >
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" /> 
    <p>${toy.likes} </p>
    <button data-id="${toy.id}" class="like-btn">Like <3</button>
  </div>
  `
})

// })
// console.log(toysHTML)
// document.querySelector("#toy-collection").innerHTML += toysHTML.join('')
 toyCollection.innerHTML += toysHTML.join('')

})
// }) 
  //  const toyForm = document.querySelector(".add-toy-form")
   toyFormContainer.addEventListener("submit", function(e){
  e.preventDefault()
  console.log(e.target.name)
  const toyName = e.target.name.value
  const toyImage = e.target.image.value
// console.log(toyName, toyImage)

fetch("http://localhost:3000/toys", {

method:"POST",
headers: {
  "Content-Type": "application/json",
  "Accept": "application/json"
   },

body: JSON.stringify({
  name: toyName,
  image: toyImage,
  likes: 98
})
 })

 .then(r => r.json()) 
//  .then(newToy => console.log(newToy))
.then(newToy => {

  let newToyHTML = `
 <div class="card">
    <h2>${newToy.name}</h2>
    <img src=${newToy.image} class="toy-avatar" /> 
    <p>${newToy.likes} </p>
    <button data-id="${newToy.id}" class="like-btn">Like <3</button>
  </div>
  `
  // document.querySelector("#toy-collection").innerHTML += newToy
  toyCollection.innerHTML += newToyHTML
  console.log(e.target.reset())

  
  })


})
toyCollection.addEventListener("click", (e) => {
  // console.log(e.target)
  if (e.target.className==="like-btn") {
    // console.log(e.target.previousElementSibling.innerText)
    let currentLikes =
    parseInt(e.target.previousElementSibling.innerText)
    let newLikes = currentLikes + 1
    e.target.previousElementSibling.innerText = newLikes + "likes"

    fetch("http://localhost:3000/toys/${e.target.dataset}",{
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
       },
      body: JSON.stringify({
        likes: newLikes
      })
    })

  }

}) 

//  document.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      
      }
     })
    }) 
  // })