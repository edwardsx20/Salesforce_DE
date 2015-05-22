menuApp.controller('MenuController', function($scope){
	$scope.test = 'hi';

	$scope.menuItems = [
		{color: '#28ABE3', icon: 'fa-map-marker', id: 'maps'},
		{color: '#1FDA9A', icon: 'fa-database', id: 'db'},
		{color: '#F7EAC8', icon: 'fa-area-chart', id: 'chart'},
		{color: '#E8B71A', icon: 'fa-cloud', id: 'cloud'},
		//{color: '#DB3340', icon: 'fa-bug'},
	];
	$scope.restoreMenu = function (){
		$( ".menuBarItem" ).each(function (i, obj) { 
			var itemHeight = $(window).height() / $scope.menuItems.length;
		    $(this).css("height", itemHeight).transition({x: 0});
		});
	}
});