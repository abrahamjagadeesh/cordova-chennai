angular.module('weather', []).directive('weatherWidget', function ($http) {
    'use strict';

    var condition,
        icons = ["windy2", "windy", "wind", "lightning5", "lightning5", "swony", "rainy4", "swony", "rainy", "rainy", "rainy", "rainy4", "rainy3", "snowflake", "swony", "swony", "swony", "sun", "sun", "sun", "weather3", "sun", "weather2", "sun", "windy4", "snowy3", "cloudy", "cloudy", "cloudy", "cloudy", "cloudy", "moon2", "sun2", "moon", "sun", "rainy", "sun", "lightning5", "lightning5", "lightning5", "rainy4", "snowflake", "snowy3", "snowy3", "cloudy", "lightning5", "snowy3", "lightning5", "Celsius"],
        loc = 'INXX0202',
        u = 'c',
        query = "SELECT item.condition FROM weather.forecast WHERE location='" + loc + "' AND u='" + u + "'",
        cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000),
        url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster,
        database = $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-type': 'application/jsonp'
            }
        });

    return {
        templateUrl: './template/weather.html',
        controller: function ($scope) {
            $scope.temperature = {};
        },
        link: function ($scope) {
            database.success(function (data) {
                condition = data.query.results.channel.item.condition;
                $scope.temperature.temp = condition.temp;
                $scope.temperature.text = condition.text;
                $scope.temperature.code = icons[condition.code];
            });

        }
    };
});