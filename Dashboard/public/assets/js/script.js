(function() {
	
	var config = {
    apiKey: "AIzaSyA6Hk7drZX9uuRbRnqExRKQFsGJ5bc3de4",
    authDomain: "test-c6de8.firebaseapp.com",
    databaseURL: "https://test-c6de8.firebaseio.com",
    projectId: "test-c6de8",
    storageBucket: "test-c6de8.appspot.com",
    messagingSenderId: "201430894267"
	}
	firebase.initializeApp(config);
	
	var app = angular.module("myApp", ["firebase", "chart.js"]);
	var wrist = [];
	var tencm = [];
	var twentycm = [];
	var thirtycm = [];
	var fortycm = [];
	var names = [];
	var name=localStorage.getItem("storageName");	 
	
		app.controller("MyChartCtrl", function($scope, $firebaseObject, $firebaseArray) {
			
			
			const rootRef = firebase.database().ref();
			
			// point to the child
			const refUser = rootRef.child(name);
			const refAffected = refUser.child("affected");
			
			refAffected.on('value', function(snapshot) {
				var dayReadings = snapshotToArray(snapshot);	
				console.log(dayReadings);
				console.log(dayReadings[0]);      // SAME
				
				// create arrays for the chart
				snapshot.forEach(function(childSnapshot) {
					/*childSnapshot.forEach (function(childSnapshot2) {
						console.log(childSnapshot2.key);
					});*/
					var day = snapshotToArray(childSnapshot);
					console.log(day);
					
					console.log(childSnapshot.val());	// SAME
					//$scope.wrist.push(day[0]);
					/*$scope.wrist.push(childSnapshot.val().wrist);
					$scope.tencm.push(childSnapshot.val().tencm_reading);
					$scope.twentycm.push(childSnapshot.val().twentycm_reading);
					$scope.thirtycm.push(childSnapshot.val().thirtycm_reading);
					$scope.fortycm.push(childSnapshot.val().fortycm_reading);*/
				
				});
			});
		
			
			// sync it to a local angular object
			$scope.dayReadings = $firebaseArray(refAffected);     
			console.log($scope.dayReadings);
			
			// code to iterate the firebaseArray in the controller
			$scope.dayReadings.$loaded()
				.then(function(){
					angular.forEach($scope.dayReadings, function(dayReading) {
						console.log(dayReading);		// SAME
						//console.log(dayReading.wrist);
						wrist.push(dayReading.wrist);
						tencm.push(dayReading.tencm_reading);
						twentycm.push(dayReading.twentycm_reading);
						thirtycm.push(dayReading.thirtycm_reading);
						fortycm.push(dayReading.fortycm_reading);
						$scope.trendData = [wrist, tencm, twentycm, thirtycm, fortycm];
						//try to do this in the refAffected, probably the same thing
					});
				});
				

			//console.log($scope.trendData);
				
			rootRef.on('value', function(snapshot) {
				var name = snapshotToArray(snapshot);	
				snapshot.forEach(function(childSnapshot) {
					console.log(childSnapshot.key);
					names.push(childSnapshot.key);
					$scope.names = names;
				});
				console.log(name);
				console.log($scope.names);
			});
			$scope.rootRefs = $firebaseArray(rootRef);			// useful for table in html
			
			// chart variables
			$scope.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
			$scope.type = "line";
			$scope.series = ["wrist", "10cm", "20cm", "30cm", "40cm"];
			$scope.options = {
				legend: { display: true },
				elements: {
				  line: {
					tension: 0.3,
				  }
				}
			}
			
			$scope.chartTypes = ["Trend", "Interlimb"];
			
			$scope.toggle = function() {
				//$scope.type = $scope.type === "line" ? "bar" : "line";
				//console.log($scope.chartType);
				// reassign the chart variables to match the correct graph
				
				//$scope.$watch('chartType', function () {
					if ($scope.chartType == "Trend") {
						console.log("Trend");
						$scope.data = $scope.trendData;
					} else if ($scope.chartType == "Interlimb") {
						console.log("InterLimb");
						$scope.data = [[10, 22, 19, 25, 32, 40, 55], [5, 10, 15, 30, 50, 33, 20], [7, 12, 17, 23, 41, 37, 27]];
					}
				//});
			};
			
			
		});
		
	function snapshotToArray(snapshot) {
		var returnArr = [];
		
	
		snapshot.forEach(function(childSnapshot) {
			var item = childSnapshot.val();
			item.key = childSnapshot.key;

					returnArr.push(item);
		});

		return returnArr;
	};
	
		
}())