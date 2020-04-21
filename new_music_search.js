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
$scope.token = "BQD26iTpXCne1w9gBvt1zA6to94heJVkrmwrDRLPumCe5WvEBQO5oOH8fl1nmMmB417w7N8Uy6IqrK5Ms3AzxKXbAxvIL_buC6CqMrXT5ewXSRNVTyJAgziUzxb8KG2KWXJOci9Ry-_QAexsYI0pUwCS4QRmd2k";
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
	
	$scope.hideTracks = function(index) {
		$scope.results.items[index].artistAndTracks = "ng-hide";
	}

	$scope.getAlbumInfo = function(index) {
		$scope.token = "BQD26iTpXCne1w9gBvt1zA6to94heJVkrmwrDRLPumCe5WvEBQO5oOH8fl1nmMmB417w7N8Uy6IqrK5Ms3AzxKXbAxvIL_buC6CqMrXT5ewXSRNVTyJAgziUzxb8KG2KWXJOci9Ry-_QAexsYI0pUwCS4QRmd2k";
		if ($scope.results.items[index].tracklist){
			return;	
		}
		else {
			let spotifykeyList = $scope.results.items[index].uri.split(':');
			let spotifykey = spotifykeyList[spotifykeyList.length - 1];
			$http.get('https://api.spotify.com/v1/albums/' + spotifykey, {
				headers: {
					"Authorization": 'Bearer ' + $scope.token
				}
			}).success(function(response){
				$scope.results.items[index].loading = "ng-hide";
				$scope.results.items[index].artistAndTracks = "ng-show";
				$scope.results.items[index].tracklist = response;
				console.log(response);
			})
			.error(function (response) {
				if (response["error"]["message"] == "The access token expired"){
					$window.location.href = 'https://accounts.spotify.com/en/authorize?client_id=89ce701ef13d43389301f57126506b0f&response_type=token&redirect_uri=https:%2F%2Fmnsaab.github.io%2FNew-Music-Search%2F';
				}
				alert(response["error"]["message"]);
			});;
		}
	}
	
}]);
