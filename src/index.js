let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";

      document.querySelector('.add-toy-form').addEventListener("submit", function(event) {
        event.preventDefault();
        const toyName = document.getElementById("new-toy-name").value;
        const toyImg = document.getElementById("new-toy-img").value;
        document.getElementById("new-toy-name").value = "";
        document.getElementById("new-toy-img").value = "";

        makeConfigObj(toyName, toyImg)
      
        }, false);

    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys();
});

function makeConfigObj(name, img) {
  const toy = {
    name: name,
    image: img,
    likes: 0
  };

  const configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
  };

  fetchNewToy(configObj)
}

function fetchNewToy(configObj) {
  return fetch("http://localhost:3000/toys", configObj)
        .then(function(response) {
        return response.json();
        })
        .then(function(object) {
            addToyCard(object)
        })
}

function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => json.forEach(toy => addToyCard(toy)));
}

function addToyCard(obj) {
  const main = document.getElementById('toy-collection')
  const toyCard = document.createElement('div');
  toyCard.className = 'card';
  toyCard.id = obj.id;
  toyCard.innerHTML += `<h2>${obj.name}</h2> <img src=${obj.image} class="toy-avatar" /> <p>${obj.likes} Likes</p>`
  
  const btn = document.createElement('button');
  btn.className = "like-btn";
  btn.innerText = "Like <3";
  btn.addEventListener('click', updateLike);
  
  toyCard.appendChild(btn);
  main.appendChild(toyCard);
}

function updateLike(event) {
  const toyCard = event.target.parentElement;
  const likesText = toyCard.querySelector('p').textContent;
  let likes = likesText.charAt(0);
  const updatedLikes = (parseInt(likes) + 1);

  const configObj = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": updatedLikes
      })
  };

  toyCard.querySelector('p').innerText = `${updatedLikes} Likes`;

  const url = `http://localhost:3000/toys/${toyCard.id}`;

  return fetch(url, configObj)
    .then(function(response) {
    return response.json()
  });
  
}
