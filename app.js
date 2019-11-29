const scorelst = document.querySelector('#scores-list'); // How you target the HTML element with this ID
const form = document.querySelector("#add-scores-form"); // How you target the form with this id


// create element and render scores
function renderScores(doc){
  let li = document.createElement("li");
  let name = document.createElement('span'); 
  let score = document.createElement('span');
  let cross = document.createElement("div");

  li.setAttribute('data-id', doc.id)
  name.textContent = doc.data().name;
  score.textContent = doc.data().score;
  cross.textContent = 'x'; // add x for removing data.
  score_display = (`score is ${score}`)

li.appendChild(name);
li.appendChild(score); // make the list using text made from the firebase data.
li.appendChild(cross);


scorelst.appendChild(li); // add the list to the HTML element


// deleting data.
cross.addEventListener('click', (e) =>{
  e.stopPropagation();
  let id = e.target.parentElement.getAttribute('data-id');
  db.collection('scores').doc(id).delete();
})

}
//Get all the data from the firestore database
db.collection("scores").get().then((snapshot) =>{
  snapshot.docs.forEach(doc => { //loops through each document after the data has been retreived.
    renderScores(doc); // Function I made to display the data on the table
  })
})

// get some of the data
// db.collection("scores").where("score", ">", "N" ).get().then((snapshot) =>{
//   snapshot.docs.forEach(doc => { //loops through each document after the data has been retreived.
//     renderScores(doc); // Function I made to display the data on the table
//   })
// })

//Will throw an error message with a link to firebase asking you to make a new index first.
// db.collection("scores").where("score", "==", "Tokyo").orderBy("name").get().then((snapshot) =>{
//   snapshot.docs.forEach(doc => { //loops through each document after the data has been retreived.
//     renderScores(doc); // Function I made to display the data on the table
//   })
// })

// allows you to enter data through a form.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('scores').add({
  name: form.name.value,
  score: game.score
});
form.name.value = "";
form.score.value = "";
})

//Allows real time updates of the page
db.collection("scores").orderBy('score').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if(change.type == 'added'){
      renderScores(change.doc)
    } else if (change.type == 'removed'){
      let li = scorelst.querySelector('[data-id=' + change.doc.id + ']');
      scorelst.removeChild(li);
    }
  })
  
})
