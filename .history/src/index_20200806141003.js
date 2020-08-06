let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      let tf = document.getElementsByClassName('add-toy-form')[0];
      tf.addEventListener('submit', () => {
        addNewToy(tf[0].value, tf[1].value)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const tc = document.getElementById('toy-collection');

  let addCurrentToys = (json) => {
    for (const toy of json) {
      //parts
      const div = document.createElement('div');
      let toyName = document.createElement('h2');
      let img = document.createElement('img');
      let p = document.createElement('p');
      let button = document.createElement('button');

      //actions taken on the parts
      div.className = 'card';
      toyName.textContent = toy.name;
      img.src = toy.image;
      img.className = 'toy-avatar';
      p.innerText = toy.likes + " likes";
      button.className = "like-btn";
      button.innerText = "Like <3";
      button.addEventListener('click', likeThisToy(toy.id))

      //add everything to the card
      div.appendChild(toyName);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(button);
      //add card to page
      tc.appendChild(div);
    };
  };

  let likeThisToy = (id) =>{
    debugger;
  };

  fetch('http://localhost:3000/toys').then(resp => resp.json()).then(json => addCurrentToys(json));

});

let addNewToy = (toyName, toyImage, likes = 0) => {
  let formData = {name: toyName, image: toyImage, likes: likes};
  let configObj = {
    method: 'post',
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(formData)
  };
  fetch('http://localhost:3000/toys',configObj)

};

