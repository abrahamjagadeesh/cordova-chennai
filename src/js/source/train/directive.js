chennai.directive('invokeTrains', function ($rootScope, $timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'template/train/trainWidgetHome.html',
        scope: {
            sector: '='
        },
        controller: function ($scope) {
            $scope.stationsChanged = stationsChanged;
            $scope.reloadCurrentTime = reloadCurrentTime;
            $scope.sector = {};
        },
        link: function (scope, element, attrs) {

            scope.sector.port = attrs.port;

            scope.sector.orderofSourceStation = indexStationShortCode(Storage[scope.sector.port][0]);
            scope.sector.orderofDestinationStation = indexStationShortCode(Storage[scope.sector.port][1]);

            scope.sector.source = $rootScope.arrayStationNames[scope.sector.orderofSourceStation];
            scope.sector.destination = $rootScope.arrayStationNames[scope.sector.orderofDestinationStation];

            scope.sector.stationsChanged = scope.stationsChanged(scope.sector, scope.sector.source, scope.sector.destination, scope.sector.port, false, $rootScope);
            scope.reloadCurrentTime(scope, scope.sector, scope.sector.port, $timeout, $rootScope);


        }
    };
});

chennai.directive('listTrains', function ($rootScope, $timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'template/skeletion_list.html',
        scope: {
            sector: '='
        },
        controller: function ($scope) {
            $scope.stationsChanged = stationsChanged;
            $scope.reloadCurrentTime = reloadCurrentTime;
            $scope.changeInlineRequested = function (toggles) {
                $scope.sector.whenInlineChange = !toggles;
                $rootScope.whenLocationChange = true;
            };
        },
        link: function (scope, element, attrs) {

            scope.sector.port = attrs.port;
            scope.sector.orderofSourceStation = indexStationShortCode(Storage[scope.sector.port][0]);
            scope.sector.orderofDestinationStation = indexStationShortCode(Storage[scope.sector.port][1]);

            scope.sector.source = $rootScope.arrayStationNames[scope.sector.orderofSourceStation];
            scope.sector.destination = $rootScope.arrayStationNames[scope.sector.orderofDestinationStation];

            scope.sector.stationsChanged = scope.stationsChanged(scope.sector, scope.sector.source, scope.sector.destination, scope.sector.port, false, $rootScope);
            scope.reloadCurrentTime(scope, scope.sector, scope.sector.port, $timeout, $rootScope);

            scope.sector.whenInlineChange = false;


        }
    };
});

// chennai.directive('search', function () {
// 	return {
// 		restrict: 'EA',
// 		templateUrl: 'template/search.html',
// 		controller: function ($scope) {
// 			$scope.stationsChanged = stationsChanged;
// 		}
// 	};
// });

chennai.directive('widget', function ($rootScope, $timeout) {
    return {
        restrict: 'EA',
        transclude: true,
        templateUrl: 'template/widget.html',
        link: function (scope, element, attrs) {

            element.on('touchstart touchmove touchend', function (event) {
                swipeFunc.touchHandler(event, element);
            });
            if (window.innerWidth > 319) {
                element[0].style[swipeFunc.vars.proxytransform] = "translate3d(-105px,0,0)";
            }

        }
    };
});