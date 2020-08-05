let addToy = false;
let likeCount = {}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit',(event) => {
        event.preventDefault()
        createToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

  
  //submit form 
function createToy(toy){
  fetch('http://localhost:3000/toys', {
method: 'POST', // or 'PUT'
headers: {
    'Content-Type': 'application/json',
     'Accept': "application/json"
},
body: JSON.stringify({
  name: toy.name.value,
  image: toy.image.value,
  likes: 0
})
})
.then(response => response.json())
.then(newToy => {
  console.log('Success:', newToy);
  showToy(newToy)
})
};


function showToy(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar') 

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
  
  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
 
  let collection = document.getElementById('toy-collection')
  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(btn)
  collection.appendChild(card)
  btn.addEventListener('click', function(event){
    event.target.id = 'like-btn'
    console.log('liked')
  });
};

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => toys.forEach(toy => showToy(toy)));

   

  
  
  
  
  
  
  
 
