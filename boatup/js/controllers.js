app.controller('mainCtrl', function($scope) {  
    

	$scope.rtime = Date().slice(0,-23);
    console.log($scope.rtime);
    

    var firebaseRef = new Firebase("https://boatup.firebaseio.com/boats");
    $scope.boats = firebaseRef
    var postRef = firebaseRef.push();


    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

   
    $scope.submitPost = function(){
    	if (($scope.title !== "") && ($scope.moreinfo !== "")
	       && ($scope.phone !== "") && ($scope.city !== "")
    	   && ($scope.price !== "") && (validateEmail($scope.email))){
	    		postRef.set({Title: $scope.title, Description: $scope.moreinfo, Email: $scope.email, PNumber: $scope.phone, City: $scope.city, Price: $scope.price, Date: $scope.rtime});
	    		//add load and redirect
	    		console.log('Sent');

    	} else {
            $("#allfields").css('display','none');
            $("#error").css("display", "block");
        }   
    };
    
});
