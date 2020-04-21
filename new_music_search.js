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
			// $window.location.href = 'https://accounts.spotify.com/en/authorize?client_id=89ce701ef13d43389301f57126506b0f&response_type=token&redirect_uri=https:%2F%2Fmnsaab.github.io%2FNew-Music-Search%2F';
		}
	};

	$scope.number = 50;

	$scope.getReleases = function() {
$scope.token = "BQCqogEFtgSogYdYoFQ3Swh7c2plcCBjz6gd3LX0B8D1NtCqHT0zrohngbRL_9Bej_gNoioNx6K-u3JX7XlGyN41PH2F6Bcg8M_HDrL7cRwJj117WFJ_jiOXMHNZOLjPGWAwPb3VM_zDrovpHWFnQHRiLRDumlw";
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
