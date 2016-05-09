app.controller('mainCtrl', function($scope, $timeout, $firebaseArray) {  
    
	$scope.rtime = Date().slice(0,-23);
    
    var firebaseRef = new Firebase("https://boatup.firebaseio.com/boat");

    //var postRef = firebaseRef.push();
    $scope.boats = $firebaseArray(firebaseRef);

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
   
    $scope.submitPost = function(){
    	if (($scope.title !== "") && ($scope.moreinfo !== "")
	       && ($scope.phone !== "") && ($scope.city !== "")
    	   && ($scope.price !== "") && (validateEmail($scope.email))){
	    	 $scope.boats.$add({
   				title: $scope.title,
   				description: $scope.moreinfo,
   				email: $scope.email,
   				pnumber: $scope.phone,
   				city: $scope.city,
   				price: $scope.price,
   				date: $scope.rtime
   			});
	    		//add loader and redirect
	    		console.log('Sent');

    	} else {
            $("#allfields").css('display','none');
            $("#error").css("display", "block");
        }   
    };
    
});
