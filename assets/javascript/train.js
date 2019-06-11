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
var database = firebase.database()
 // 2. Button for adding Trains
$("#submit-btn").on("click", function(event) {
  event.preventDefault();

   // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    first: firstTrain,
    frequency: trainFreq
  };
  
  // Uploads train data to the database
  database.ref().push(newTrain);
  
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
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
  var firstTrain = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().frequency;
  
   // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrain);
  console.log(trainFreq);

  // current time  // first start // frequecy 
  // current time - fist time (minutes)
  // total minutes / frequency = numeber of trains until now + some minutes remain 
   // next train will be current time + minutes remain 
  
  var firstTrainArray= firstTrain.split(":")

  var firstTrainM = moment()
  .hours(firstTrainArray[0])
  .minutes(firstTrainArray[1])
  

  var minAway = moment(firstTrainM).format("mm");
   console.log(minAway);

  // Calculate the min away
  var totalMinutes = moment().diff(moment(firstTrainM), "minutes");
  console.log("tot: ", totalMinutes);
  var minutesRemain = totalMinutes % trainFreq
  console.log("remaining min:" , minutesRemain)
  var minutesAway = trainFreq - minutesRemain
  console.log("Min away:" , minutesAway)
 var nextTrain = moment().add(minutesAway, "minutes").format("HH:mm");
 console.log(nextTrain)

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<d>").text(minutesAway),
  );
   // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// bonus: add timer, table in the array, update every minute, update the moment, add id to "<td>",  