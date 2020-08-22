let addToy = false;

const toyUrl = 'http://localhost:3000/toys',
      divCollection = document.getElementById('toy-collection');


function newtoy(toyData) {
  let toyObj = {
    'name': toyData.name.value,
    'image': toyData.image.value,
    'likes': 0
  };
  toyData.name.value = '';
  toyData.image.value = '';
  return toyObj;
};

let toy = {
  //query all toys and display on the page
  fetchAllToys: function() {
    fetch(toyUrl).then(resp => resp.json()).then(result => {
      const toysCollection = result;
      divCollection.innerText = '';
      this.displayToys(toysCollection);
    })
  },

  addNewToy: function(toyData) {
    fetch(toyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newtoy(toyData))
    }).then(resp => resp.json()).then(result => {
      this.renderToy(result);
    })
  },
  displayToys: function(toysCollection, divCollection) {
    toysCollection.forEach(toy => this.renderToy(toy));
  },
  renderToy: function(toy) {
    let elementCollection = [];
      const h2 = document.createElement('h2'),
            img = document.createElement('img'),
            p = document.createElement('p'),
            button = document.createElement('button');
      h2.innerHTML = toy.name;
      img.src = toy.image;
      img.className = 'toy-avatar';
      p.innerHTML = `${toy.likes} likes`;
      button.className = 'like-btn';
      button.id = toy.id;
      button.value = 'Like';
      button.addEventListener('click', event => {
        let increasedLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
        fetch(`${toyUrl}/${event.target.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({'likes': increasedLikes})
        }).then(resp => resp.json()).then(result => {
          event.target.previousElementSibling.innerText = `${result.likes} likes`
        })
      })
      elementCollection.push(h2, img, p, button);

      this.toysContainer(elementCollection);
  },
  toysContainer: function(elementCollection) {
    let divCard = document.createElement('div');
    divCard.className = 'card';
    elementCollection.forEach(element => {
      divCard.appendChild(element);
    });
    divCollection.appendChild(divCard);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', function(event) {
        event.preventDefault();
        toy.addNewToy(event.target);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toy.fetchAllToys();
  
});
