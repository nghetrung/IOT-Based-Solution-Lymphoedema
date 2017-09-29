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
	var affectedSum = [];

	var wristU = [];
	var tencmU = [];
	var twentycmU = [];
	var thirtycmU = [];
	var fortycmU = [];
	var unAffectedSum = [];

		app.controller("MyChartCtrl", function($scope, $firebaseObject, $firebaseArray) {


			const rootRef = firebase.database().ref();

			// point to the child
			const refUser = rootRef.child(name);
			const refAffected = refUser.child("affected");
			const refUnaffected = refUser.child("unaffected");

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
			$scope.dayReadingsUnaffected = $firebaseArray(refUnaffected);
			console.log($scope.dayReadingsUnaffected);

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

						// data for the trend chart (wrist, 10cm, ... thoughout a week)
						$scope.trendData = [wrist, tencm, twentycm, thirtycm, fortycm];		//try to do this in the refAffected, probably the same thing

						// compute the sum to use in interlimb chart
						affectedSum.push(parseInt(dayReading.wrist)+parseInt(dayReading.tencm_reading)+parseInt(dayReading.twentycm_reading)
										+parseInt(dayReading.thirtycm_reading)+parseInt(dayReading.fortycm_reading));
						console.log(affectedSum);
						$scope.affectedSum = affectedSum;
					});
				});

			// getting data from unaffected and compute the sum for each day
			$scope.dayReadingsUnaffected.$loaded()
				.then(function(){
					angular.forEach($scope.dayReadingsUnaffected, function(dayReadingUnaffected) {
						console.log(dayReadingUnaffected);		// SAME
						//console.log(dayReading.wrist);
						wristU.push(dayReadingUnaffected.wrist);
						tencmU.push(dayReadingUnaffected.tencm_reading);
						twentycmU.push(dayReadingUnaffected.twentycm_reading);
						thirtycmU.push(dayReadingUnaffected.thirtycm_reading);
						fortycmU.push(dayReadingUnaffected.fortycm_reading);

						// compute the sum to use in interlimb chart
						unAffectedSum.push(parseInt(dayReadingUnaffected.wrist)+parseInt(dayReadingUnaffected.tencm_reading)+parseInt(dayReadingUnaffected.twentycm_reading)
											+parseInt(dayReadingUnaffected.thirtycm_reading)+parseInt(dayReadingUnaffected.fortycm_reading));
						console.log(unAffectedSum);
						$scope.unAffectedSum = unAffectedSum;
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
			//$scope.series = ["wrist", "10cm", "20cm", "30cm", "40cm"];
			/*$scope.options = {
				legend: { display: true },
				elements: {
				  line: {
					tension: 0.3,
				  }
				},
				title: {
					display: true,
					text: "Trend",
					fontSize: 20
				}
			};*/

			$scope.chartTypes = ["Trend", "Interlimb"];

			$scope.toggle = function() {
				//$scope.type = $scope.type === "line" ? "bar" : "line";
				//console.log($scope.chartType);
				// reassign the chart variables to match the correct graph

				//$scope.$watch('chartType', function () {
					if ($scope.chartType == "Trend") {
						console.log("Trend");
						$scope.series = ["wrist", "10cm", "20cm", "30cm", "40cm"];
						$scope.data = $scope.trendData;
						$scope.options = {
							legend: { display: true},
							elements: {
							  line: {
								tension: 0.3,
							  }
							},
							title: {
							  display: true,
							  text: "Trend",
							  fontSize: 20
							}
						};
					} else if ($scope.chartType == "Interlimb") {
						console.log("InterLimb");
						$scope.series = ["Difference"];
						var diff = [[]];
						angular.forEach($scope.affectedSum, function(value,index) {
							console.log(value);
							console.log($scope.unAffectedSum[index]);
							diff[0].push(value - $scope.unAffectedSum[index]);
						});
						console.log(diff);
						$scope.data = diff;
						$scope.options = {
							legend: { display: true },
							elements: {
							  line: {
								tension: 0.3,
							  }
							},
							title: {
							  display: true,
							  text: "InterLimb",
							  fontSize: 20
							}
						};
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
