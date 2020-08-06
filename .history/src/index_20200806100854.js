let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      debugger;
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const tc = document.getElementById('toy-collection');
  let addCurrentToys = (json) => {
    for (const toy of json) {
      const div = document.createElement('div');
      div.className = 'card';
      let toyName = document.createElement('h2');
      toyName.textContent = toy.name;
      let img = document.createElement('img');
      img.src = toy.image;
      img.className = 'toy-avatar'
      div.appendChild(toyName);
      div.appendChild(img);
      div.innerHTML += '<p>4 likes</p><button class="like - btn ">Like <3</button>';
      tc.appendChild(div);
    };
  };

  const tf = document.getElementsByClassName('add-toy-form');
  tf.addEventListener('submit',addNewToy(tf[0][0].value,tf[0][1].value))

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => addCurrentToys(json));
});

let addNewToy = (toyName, toyImage) => {
  let formData = {name: toyName, image: toyImage};
  let configObj = {
    method: 'post',
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(formData)
  };
  return fetch('http://localhost:3000/toys',configObj)
    .then(resp => resp.json())
    .then(json => addCurrentToys(json));
};
