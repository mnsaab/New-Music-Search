var app = angular.module('newMusicSearch', []);
// https://accounts.spotify.com/en/authorize?client_id=89ce701ef13d43389301f57126506b0f&response_type=token&redirect_uri=https:%2F%2Fmnsaab.github.io%2FNew-Music-Search%2F

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
	
}]);


