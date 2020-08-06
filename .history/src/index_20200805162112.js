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

  const tc = document.getElementById('toy-collection');
  let addCurrentToys = (json) => {
    for (const toy of json) {
      let div = document.createElement('div');
      let img = document.createElement('img');
      div.className = 'card';
      div.innerText = toy.name;
      img.url = toy.image;
      div.appendChild(img)
      tc.appendChild(div);
    };
  };

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => addCurrentToys(json));
});


