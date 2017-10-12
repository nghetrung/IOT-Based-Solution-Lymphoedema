 (function(){
 
 const config = {
    apiKey: "AIzaSyA6Hk7drZX9uuRbRnqExRKQFsGJ5bc3de4",
    authDomain: "test-c6de8.firebaseapp.com",
    databaseURL: "https://test-c6de8.firebaseio.com",
    projectId: "test-c6de8",
    storageBucket: "test-c6de8.appspot.com",
    messagingSenderId: "201430894267"
  };
  firebase.initializeApp(config);
  
  
  const txtEmail 	 =	document.getElementById('username');
  const txtPassword  =	document.getElementById('password');
  const btnLogin	 =	document.getElementById('login');
 
  
  btnLogin.addEventListener('click', e=>  {
	  const email 		= txtEmail.value;
	  const pass		= txtPassword.value;
	  const auth		= firebase.auth();
	  
	  const promise 	= auth.signInWithEmailAndPassword(email,pass);
	  promise.catch(e=> console.log(e.message));
	  
	 
  });
  

  
  firebase.auth().onAuthStateChanged(firebaseUser => {
	   
	   if(firebaseUser)
	   {
		   console.log(firebaseUser);
		  
		   window.open ('index.html','_self',false)
	   }
	   else
	   {
		    btnLogout.classList.add('hide');
		   console.log('not logged in');
	   }
  
  
  });
  
 
 }());