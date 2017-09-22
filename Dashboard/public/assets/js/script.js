var database;
var array = [];

function setup() {

  var config = {
    apiKey: "AIzaSyA6Hk7drZX9uuRbRnqExRKQFsGJ5bc3de4",
    authDomain: "test-c6de8.firebaseapp.com",
    databaseURL: "https://test-c6de8.firebaseio.com",
    projectId: "test-c6de8",
    storageBucket: "test-c6de8.appspot.com",
    messagingSenderId: "201430894267"
  };
  firebase.initializeApp(config);
  database = firebase.database();

   createCanvas(0,0);

  // Start loading the data
  loadFirebase();

}

function loadFirebase() {
  var ref = database.ref('Stanley');
  ref.child('affected').on("value", gotData, errData);
}

function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}

// The data comes back as an object
function gotData(data) {

  var scores=data.val();
  var keys=Object.keys(scores);

  //console.log(keys);
  // var listname = createElement('ol');
  //listname.parent('namelist');

  //var list = createElement('ol');
  //list.parent('scorelist');


  for(var i=0;i<keys.length;i++)
  {

			var k=keys[i];
			//var name=scores[k].name;
			var wrist=scores[k].wrist;
			var tencm=scores[k].tencm_reading;
			var twentycm=scores[k].twentycm_reading;
			var thirtycm=scores[k].thirtycm_reading;
			var fortycm=scores[k].fortycm_reading;


			//var li1=createElement('li','Name '+name);
			//li1.parent(listname);
			//var li=createElement('li',' Tencm : '+tencm+' Twentycm : '+twentycm+' Thirtycm : '+thirtycm+' Fortycm : '+fortycm+' wrist :'+wrist);

			//li.class('listing');
			//li.parent(list);

			array.push(wrist,tencm,twentycm,thirtycm,fortycm);
			/*array.push(twentycm);
			array.push(thirtycm);
			array.push(fortycm);
			array.push(wrist);
			*/




  }
  console.log(array);
  	// Chart js
			// Our labels along the x-axis
		var days = ["Monday","Tuesday","wednesday","Thursday","Friday","Saturday"];
			// For drawing the lines
		var wristInitialIndex = 0;
		var tenInitialIndex = 1;
		var twentyInitialIndex = 2;
		var thirtyInitialIndex = 3;
		var fortyInitialIndex = 4;


		var wrist = [];
		for (var i = wristInitialIndex; i <= array.length - 5; i=i + 5) {
			wrist.push(array[i]);

		}

		var tencm = [];
		for (var i = tenInitialIndex; i <= array.length - 4; i=i + 5) {
			tencm.push(array[i]);
		}

		var twentycm = [];
		for (var i = twentyInitialIndex; i <= array.length - 3; i=i + 5) {
			twentycm.push(array[i]);
		}

		var thirtycm = [];
		for (var i = thirtyInitialIndex; i <= array.length - 2; i=i + 5) {
			thirtycm.push(array[i]);
		}

		var fortycm = [];
		for (var i = fortyInitialIndex; i <= array.length - 1; i=i + 5) {
			fortycm.push(array[i]);
		}

		//console.log(wrist1);
		var ctx = document.getElementById("myChart");

		var myChart = new Chart(ctx, {
			type: 'line',
		data: {
				labels: days,
				datasets: [
				{
					data: wrist,
					label : "Wrist",
					backgroundColor : '	rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,0.5)',
					borderWidth : 1
				},
				{
					data: tencm,
					label : "10 cm",
					backgroundColor : 'rgba(0,0,255,0.2)',
					borderColor: 'rgba(0,0,255,0.5)',
					borderWidth : 1
				},
				{
					data: twentycm,
					label : "20 cm",
					backgroundColor : 'rgba(0,255,0,0.2)',
					borderColor: 'rgba(0,255,0,0.5)',
					borderWidth : 1
				},
				{
					data: thirtycm,
					label : "30 cm",
					backgroundColor : 'rgba(54,162,235,0.2)',
					borderColor: 'rgba(54,162,235,1)',
					borderWidth : 1
				},
				{
					data: fortycm,
					label : "40 cm",
					backgroundColor : 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth : 1
				}
				]
		}
		});
//console.log(wrist1.length);
while(array.length>0)
{
	array.pop();
}



}
