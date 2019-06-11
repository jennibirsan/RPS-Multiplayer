// 1. Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAcJ7jshojl6r2AmE211PZFr_b_jwGdaHc",
  authDomain: "users-19844.firebaseapp.com",
  databaseURL: "https://users-19844.firebaseio.com",
  projectId: "users-19844",
  storageBucket: "",
  messagingSenderId: "772548765406",
  appId: "1:772548765406:web:837c90e0c7391085"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 // 2. Button for adding Trains
$("#submit-btn").on("click", function(event) {
  event.preventDefault();

   // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var nextArrival = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var trainFreq = moment($("#frequency-input").val().trim(), "mm").format("X");

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    arrival: nextArrival,
    frequency: trainFreq
  };
   // Uploads train data to the database
  database.ref().push(newTrain);
   // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.arrival);
  console.log(newTrain.frequency);
   alert("Train successfully added");
   // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

 // 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
   // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var nextArrival = childSnapshot.val().arrival;
  var trainFreq = childSnapshot.val().frequency;
  
   // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(nextArrival);
  console.log(trainFreq);

   // Solve for Min away
  var minAway = moment.unix(nextArrival).format("mm");
   // Calculate the min away
  var nextArrival = moment().diff(moment(minAway, "X"), "minutes");
  console.log(minAway);
 
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextArrival),
    $("<td>").text(minAway),
  );
   // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
