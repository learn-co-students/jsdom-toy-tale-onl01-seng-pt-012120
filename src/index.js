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

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    
    }
   })


   document.addEventListener("DOMContentLoaded", () =>{
  
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
    <button class="like-btn">Like 
    <3</button>
  </div>
  `
})

// })
// console.log(toysHTML)
document.querySelector("#toy-collection").innerHTML += toysHTML.join('')

})
// }) 
   const toyForm = document.querySelector(".add-toy-form")
   toyForm.addEventListener("submit", function(e){
  e.preventDefault()
  console.log(e.target.name)
  

 })
}) 
// document.addEventListener("DOMContentLoaded", () => {
  // addBtn.addEventListener("click", () => {
  //     // hide & seek with the form
  //     addToy = !addToy;
  //     if (addToy) {
  //       toyFormContainer.style.display = "block";
  //     } else {
  //       toyFormContainer.style.display = "none";
      
  //     }
  //    })
    // }) 
 