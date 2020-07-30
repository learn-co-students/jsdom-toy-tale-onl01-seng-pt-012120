let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const collection = document.getElementById('toy-collection');
  const createToyForm = document.querySelector('.add-toy-form');

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function createToy(toy){
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    img.height = "200"
    img.width = "200"
    let p = document.createElement('p')
    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "like"
    btn.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      likes(e)
    })
    div.classList.add('card')
    h2.textContent = toy.name
    img.setAttribute('src',toy.image)
    p.textContent = toy.likes
    div.append(h2,img,p,btn)
    collection.appendChild(div)
  }

  fetch('http://localhost:3000/toys')
    .then(function(resp) {
      return resp.json()
    })
    .then(function(obj) {
      obj.forEach(toy => {
        createToy(toy)
      })
    })

    const addNewToy = e => {
      let newToy = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      }
      createToy(newToy)
    }

    createToyForm.addEventListener('submit', e => {
      e.preventDefault()
      addNewToy(e)
      createToyForm.reset()
    })

    function likes(e) {
      e.preventDefault()
      let more = parseInt(e.target.previousElementSibling.innerText) + 1

      fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"

          },
          body: JSON.stringify({
            "likes": more
          })
        })
        .then(res => res.json())
        .then((like_obj => {
          e.target.previousElementSibling.innerText = `${more} likes`;
        }))
    }




});
