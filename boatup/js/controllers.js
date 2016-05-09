app.controller('mainCtrl', function($scope, $timeout, $firebaseArray, $firebaseObject) {  
    
	$scope.rtime = Date().slice(0,-23);
    
    var firebaseRef = new Firebase("https://boatup.firebaseio.com/boat");

    //var postRef = firebaseRef.push();
    $scope.boats = $firebaseArray(firebaseRef);

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    var ImgObj = $firebaseObject(firebaseRef);

    function saveimage(e1) {
        var filename = e1.target.files[0];
        var fr = new FileReader();
        fr.onload = function (res) {
            $scope.image = res.target.result;
            ImgObj.image = res.target.result;
            ImgObj.$save().then(function (val) {
            }, function (error) {
                console.log("ERROR", error);
            })
        };
        console.log(fr.readAsDataURL(filename));
    }

    //document.getElementById("file-upload").addEventListener('change', saveimage, false);

    this.loadimage = function () {
        ImgObj.$loaded().then(function (obj) {
            $scope.pic = obj.image;
            console.log("loaded", $scope.pic);
            document.getElementById("profileImage").src = obj.image;
        }, function (error) {
            console.log("ERROR", error);
        });
    };
    this.loadimage();

   
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
   				date: $scope.rtime,
   				image: $scope.pic
   			});
	    		//add loader and redirect
	    		console.log('Sent');
	    		//window.location.replace("http://www.boatup.co/confirm");

    	} else {
            $("#allfields").css('display','none');
            $("#error").css("display", "block");
        }   
    };
    
});
