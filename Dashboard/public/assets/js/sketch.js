
var database;

function setup() {

 var config = {
    apiKey: "AIzaSyCp1e5AfyI4vCI6ouO6ys0kyjwXrYVgwdM",
    authDomain: "testingautomation-67004.firebaseapp.com",
    databaseURL: "https://testingautomation-67004.firebaseio.com",
    projectId: "testingautomation-67004",
    storageBucket: "",
    messagingSenderId: "52135975992"
  };
  firebase.initializeApp(config);
  database = firebase.database();

 
  // Start loading the data
  loadFirebase();
 
}

function loadFirebase() {
  var ref = database.ref('people');
  ref.on("value", gotData, errData);
  /*var data=
  {
	  name:"stanley",
	  tencm:23,
	  twentycm:34,
	  thirtycm:45,
	  fortycm:66,
	  wrist:6
  }
  ref.push(data)*/
}

function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}

// The data comes back as an object
function gotData(data) {
  
  var listings = selectAll('.listing');
  clearList(listings);
  
  var scores=data.val();
  var keys=Object.keys(scores);
  
  console.log(keys);
   var listname = createElement('ol');
  listname.parent('namelist');
  
  var list = createElement('ol');
  list.parent('scorelist');
  
  
  for(var i=0;i<keys.length;i++)
  {
			var array = [];
			var k=keys[i];
			var name=scores[k].name;
			var tencm=scores[k].tencm;
			var twentycm=scores[k].twentycm;
			var thirtycm=scores[k].thirtycm;
			var fortycm=scores[k].fortycm;
			var wrist=scores[k].wrist;
			console.log(name,tencm,twentycm,thirtycm,fortycm,wrist);
			var li1=createElement('li','Name '+name);
			li1.parent(listname);
			var li=createElement('li',' Tencm : '+tencm+' Twentycm : '+twentycm+' Thirtycm : '+thirtycm+' Fortycm : '+fortycm+' wrist :'+wrist);
			
			li.class('listing');
			li.parent(list);
			
			array.push(name);
			array.push(tencm);
			array.push(twentycm);
			array.push(thirtycm);
			array.push(fortycm);
			array.push(wrist);
			
			console.log(array);
	
  }
 
  
  
  
}

// Clear everything
function clearList(listItems) {
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].remove();
  }
}
