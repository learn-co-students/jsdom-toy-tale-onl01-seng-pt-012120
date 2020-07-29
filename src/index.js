let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection');
  const submit = document.querySelector('.submit');
  const likeButtons = document.getElementsByClassName('like-btn')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  submit.addEventListener('click', function(e) {
    function addToy() {
      const url = 'http://localhost:3000/toys'
      const name = document.getElementById('name')
      const img = document.getElementById('image')
      const toyData = {
        name: name.value,
        image: img.value,
        likes: 0
      }
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
        },
        body: JSON.stringify(toyData)
      }
      fetch(url, configObj)
        .then(response => response.json())
        .then(json => renderToy(json))
        .catch(error => console.log(error.message))
    }

    e.preventDefault()
    addToy()
  })

  function renderToys(toys) {
    for (const toy of toys) {
      renderToy(toy)
    }
  }

function renderToy(toy) {
  const div = document.createElement('div')
  div.className = 'card'
  div.id = `toy-${toy.id}`

  const h2 = document.createElement('h2')
  h2.innerHTML = toy.name

  const img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toy.image

  const p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`

  const btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.innerText = "Like <3"
  btn.id = `like-${toy.id}`
  btn.onclick = like

  toyCollection.appendChild(div)

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)
}

function like() {
  // 1. get the innerText
  // 2. split the inner text and parseInt
  // 3. Add one to likeCount
  // 4. replace innerText
  // 5. update server
  let p = this.parentNode.querySelector('p')
  let likeCount = parseInt(p.innerText.split(" Likes")[0], 10)
  likeCount++
  p.innerText = `${likeCount} Likes`

  const id = this.id.split('like-')[1]
  const url = `http://localhost:3000/toys/${id}`
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json",
    },
    body: JSON.stringify({likes: likeCount})
  }

  fetch(url, configObj)
}

// RENDER ALL THE TOYS
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => renderToys(json))
    // .catch(error => console.log(error.message))
});
