const cafelist = document.querySelector('#cafe-list'); // How you target the HTML element with this ID
const form = document.querySelector("#add-cafe-form"); // How you target the form with this id


// create element and render cafe
function renderCafe(doc){
  let li = document.createElement("li");
  let name = document.createElement('span'); 
  let city = document.createElement('span');
  let cross = document.createElement("div");

  li.setAttribute('data-id', doc.id)
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x'; // add x for removing data.

li.appendChild(name);
li.appendChild(city); // make the list using text made from the firebase data.
li.appendChild(cross);


cafelist.appendChild(li); // add the list to the HTML element


// deleting data.
cross.addEventListener('click', (e) =>{
  e.stopPropagation();
  let id = e.target.parentElement.getAttribute('data-id');
  db.collection('cafe').doc(id).delete();
})

}
//Get all the data from the firestore database
// db.collection("cafe").get().then((snapshot) =>{
//   snapshot.docs.forEach(doc => { //loops through each document after the data has been retreived.
//     renderCafe(doc); // Function I made to display the data on the table
//   })
// })

// get some of the data
// db.collection("cafe").where("city", ">", "N" ).get().then((snapshot) =>{
//   snapshot.docs.forEach(doc => { //loops through each document after the data has been retreived.
//     renderCafe(doc); // Function I made to display the data on the table
//   })
// })

//Will throw an error message with a link to firebase asking you to make a new index first.
db.collection("cafe").where("city", "==", "Tokyo").orderBy("name").get().then((snapshot) =>{
  snapshot.docs.forEach(doc => { //loops through each document after the data has been retreived.
    renderCafe(doc); // Function I made to display the data on the table
  })
})

// allows you to enter data through a form.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('cafe').add({
  name: form.name.value,
  city: form.city.value
});
form.name.value = "";
form.city.value = "";
})

//Allows real time updates of the page
db.collection("cafe").orderBy('city').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if(change.type == 'added'){
      renderCafe(change.doc)
    } else if (change.type == 'removed'){
      let li = cafelist.querySelector('[data-id=' + change.doc.id + ']');
      cafelist.removeChild(li);
    }
  })
  
})
