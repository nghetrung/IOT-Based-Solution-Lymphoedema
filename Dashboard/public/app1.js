 (function(){
 

  
  const btnLogout	 =	document.getElementById('logout');
  
  
  
  
  btnLogout.addEventListener('click', e=> 
  { 
     firebase.auth().signOut();
  });
  
  firebase.auth().onAuthStateChanged(firebaseUser => {
	   
	   if(firebaseUser)
	   {
		   console.log(firebaseUser);
		   btnLogout.classList.remove('hide');
		 
	   }
	   else
	   {
		    btnLogout.classList.add('hide');
		   console.log('not logged in');
		   window.open('login.html','_self',false);
	   }
  
  
  });
  
 
 }());