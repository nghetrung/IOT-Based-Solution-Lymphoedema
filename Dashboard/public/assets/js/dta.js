(function() {

	 var config = {
    apiKey: "AIzaSyA6Hk7drZX9uuRbRnqExRKQFsGJ5bc3de4",
    authDomain: "test-c6de8.firebaseapp.com",
    databaseURL: "https://test-c6de8.firebaseio.com",
    projectId: "test-c6de8",
    storageBucket: "test-c6de8.appspot.com",
    messagingSenderId: "201430894267"
  };
  firebase.initializeApp(config);

	var app = angular.module("app", ["firebase"]);


		app.controller("MyCtrl", function($scope, $firebaseObject, $firebaseArray) {

			const rootRef = firebase.database().ref();

			// point to the baseline child
			const refBaseline = rootRef.child("Stanley");
			const refBaseline1 = refBaseline.child("affected");

			/*refBaseline1.on('value', function(snapshot) {
				var baseline = snapshotToArray(snapshot);	// this will give value only, no id,... so we need to sync it using $firebaseArray
				$scope.baselines2 = baseline;
				console.log(baseline);
			});

			// sync it to a local angular object
			$scope.baselines = $firebaseArray(refBaseline1);
			*/

			rootRef.on('value', function(snapshot) {
				var name = snapshotToArray(snapshot);	// this will give value only, no id,... so we need to sync it using $firebaseArray
				$scope.Name = name;
				console.log(name);

			});
			$scope.rootRefs=$firebaseArray(rootRef);

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
