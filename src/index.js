let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => rendertoys(json));
  setTimeout(() => butts(), 1000);
})

function rendertoys(toys) {
  let d = document.getElementById('toy-collection');
  toys.forEach(toy => {
    const a = document.createElement('div');
    a.className = "card"
    a.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes} likes</p><button class="like-btn">Like</button>`;
    d.appendChild(a);
  })
}

function butts() {
  let z = document.getElementsByClassName('like-btn');
  for (i = 0; i < z.length; i++) {
    const v = z[i];
    const id = i + 1;
    z[i].addEventListener("click", function() {
      const p = v.parentElement;
      let b = p.getElementsByTagName('p')[0];
      let a = Array.from(b.innerText);
      let n = parseInt(a.shift()) + 1;
      b.innerHTML = `${n} likes`;
      ob = {method: "PATCH", headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": n
      })};
      fetch(`http://localhost:3000/toys/${id}`, ob)
    })
  }
}

document.getElementsByClassName('submit')[0].addEventListener("click", function(e) {
  e.preventDefault();
  const a = document.getElementsByClassName("input-text");
  if (a[0].value.trim() != "") {
    ob = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify({
      "name": a[0].value,
      "image": a[1].value,
      "likes": 0
      })
    };
    fetch("http://localhost:3000/toys", ob);
    location.reload();
    return false;
  }
})