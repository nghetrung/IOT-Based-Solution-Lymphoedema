
// Conecting with the firebase
var config = {
  
    apiKey: "AIzaSyA6Hk7drZX9uuRbRnqExRKQFsGJ5bc3de4",
    authDomain: "test-c6de8.firebaseapp.com",
    databaseURL: "https://test-c6de8.firebaseio.com",
    projectId: "test-c6de8",
    storageBucket: "test-c6de8.appspot.com",
    messagingSenderId: "201430894267"
};

// Initialize  Firebase app
firebase.initializeApp(config);

var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function($scope, $firebaseArray) {

   var ref = firebase.database().ref();
   $scope.syncObject = $firebaseArray(ref);
   var affected = "affected";
   var unaffected = "unaffected";

  $scope.addPatient = function () {
      //$scope.myTxt = "You clicked submit!";
      //syncObject.$bindTo($scope, "data");
      //console.log(syncObject);
      //var name="trung";
	  //ref.child($scope.id).update({name :$scope.data.generalA});
    ref.child($scope.id).update({PatientID: $scope.id,  First_Name:  $scope.data.firstName});
    //ref.child($scope.id).set({PatientID: $scope.id});

    // ref.child($scope.id).set({});
	  ref.child($scope.id).child(affected).child($scope.data.initialDate).update({date: $scope.data.dateA,fortycm_reading: $scope.data.fortyA,thirtycm_reading: $scope.data.thirtyA,twentycm_reading: $scope.data.twentyA,tencm_reading: $scope.data.tenA,wrist: $scope.data.wristA});
    ref.child($scope.id).child(unaffected).child($scope.data.initialDate).update({date: $scope.data.dateB,fortycm_reading: $scope.data.fortyB,thirtycm_reading: $scope.data.thirtyB,twentycm_reading: $scope.data.twentyB,tencm_reading: $scope.data.tenB,wrist: $scope.data.wristB});
    //ref.child($scope.id).child(affected).child($scope.data.dateA).update({fortycm_reading: $scope.data.fortyA,thirtycm_reading: $scope.data.thirtyA,twentycm_reading: $scope.data.twentyA,tencm_reading: $scope.data.tenA,wrist: $scope.data.wristA});


	  // ref.child($scope.id).child(unaffected).set({date: $scope.data.dateU});
      // ref.child($scope.id).child(affected).child($scope.data.dateA);
      // ref.child($scope.id).child(unaffected).child($scope.data.dateU);
	  }
});
