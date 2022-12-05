let content = document.getElementById("content");
let nameEm
let cardEm
let imgEm
let voteEm
let buttonEm
function getNames(){
    fetch("http://localhost:3000/characters")
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(data){
            data.forEach(animal => {
               nameEm = document.createElement("h3")
               cardEm = document.createElement("div")
               imgEm = document.createElement("img")
               voteEm = document.createElement("p")
                content.appendChild(cardEm)
                cardEm.appendChild(nameEm)
                cardEm.setAttribute("onClick", `getAnimalById(${animal.id});`)
                nameEm.innerHTML = animal.name
                //adding the class name
                cardEm.classList.add("card")
            });
        })
}
const getAnimalById = (id) => {
    console.log(window.location.pathname)
    sessionStorage.setItem("id", id);
    window.location.href = `http://127.0.0.1:5500/details.html`;
  }
  console.log(window.location.pathname)
if(window.location.pathname == "/"){
    getNames()
}else if(window.location.pathname == "/details.html"){
    let details = document.getElementById("details");
    function getDetails(){
        var id =sessionStorage.getItem("id");
        fetch( `http://localhost:3000/characters/${id}`)
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(data){
            console.log(data)
            nameEm = document.createElement("h3")
            cardEm = document.createElement("div")
            imgEm = document.createElement("img")
            voteEm = document.createElement("p")
            buttonEm = document.createElement("button")
             details.appendChild(cardEm)
             cardEm.appendChild(nameEm)
             cardEm.appendChild(imgEm)
             cardEm.appendChild(voteEm)
             cardEm.appendChild(buttonEm)
             cardEm.setAttribute("onClick", `getAnimalById(${data.id});`)
             nameEm.innerHTML = data.name
             //adding the class name
             cardEm.classList.add("card")
             imgEm.src = data.image
             voteEm.innerHTML =`Votes: ${data.votes}`
            buttonEm.innerHTML = "Vote";
            buttonEm.setAttribute("onClick", `updateVotes(${data.id},${data.votes});`)
        })
    }
    getDetails()
    function updateVotes(id, votes){
        var newVote=votes+1
        fetch(`http://localhost:3000/characters/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              votes: votes +1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
}