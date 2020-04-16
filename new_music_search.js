var app = angular.module('newMusicSearch', []);

app.controller('newReleases', ['$scope', '$http', '$location', '$window', 
function ($scope, $http, $location, $window) {
	
	$scope.checkAuthentication = function() {
		let params = $location.url().split('&');
		$scope.token = null;
		for (let i=0; i < params.length; ++i){
			if (params[i].includes("access_token")) {
				$scope.token = params[i].split('=')[1];
			}
		}
		if (!$scope.token){
			$window.location.href = 'https://accounts.spotify.com/en/authorize?client_id=89ce701ef13d43389301f57126506b0f&response_type=token&redirect_uri=https:%2F%2Fmnsaab.github.io%2FNew-Music-Search%2F';
		}
	};

	$scope.number = 50;

	$scope.getReleases = function() {
// $scope.token = "BQCSEgV8b1fMv1lUaCt4xkabaWcFPM50uJUqw8Zd10DEUhg-JuMaqk5Pktv4zDxtkN83TaNadW9jzWDqiyqQoHvGGRTJrfS_69HiQ4NvgOwmjXvpFUHOEaX-3qQG1688nAVNz5u8D56BfbBod227kxp46_dFrpY";
		let limit = 20;
		if ($scope.numberOfResults){
			limit = $scope.numberOfResults;	
		}
		$http.get('https://api.spotify.com/v1/browse/new-releases?limit=' + limit, {
			headers: {
				"Authorization": 'Bearer ' + $scope.token
			}
		}).success(function(response){
			$scope.results = response.albums;
			console.log($scope.results);
		})
		.error(function (response) {
			if (response["error"]["message"] == "The access token expired"){
				$window.location.href = 'https://accounts.spotify.com/en/authorize?client_id=89ce701ef13d43389301f57126506b0f&response_type=token&redirect_uri=https:%2F%2Fmnsaab.github.io%2FNew-Music-Search%2F';
			}
			alert(response["error"]["message"]);
		});;
	}

	$scope.formatArtists = function(artistArray) {
		let artists = ""; 
		
		for (let i=0; i < artistArray.length; ++i){
			artists += (i+1) == artistArray.length 
				? artistArray[i].name : artistArray[i].name + ", ";
		}
		
		return artists;
	}
	
}]);
