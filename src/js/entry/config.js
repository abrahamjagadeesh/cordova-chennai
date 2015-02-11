var Storage = Storage || {};

Storage['portion1'] = localStorage.getItem('portion1') === null ? (localStorage.setItem('portion1', ['TYMR', 'VLCY']), localStorage.getItem('portion1').split(",")) : localStorage.getItem('portion1').split(",");
Storage['portion2'] = localStorage.getItem('portion2') === null ? (localStorage.setItem('portion2', ['AVD', 'MAS']), localStorage.getItem('portion2').split(",")) : localStorage.getItem('portion2').split(",");
Storage['portion3'] = localStorage.getItem('portion3') === null ? (localStorage.setItem('portion3', ['TYMR', 'VLCY']), localStorage.getItem('portion3').split(",")) : localStorage.getItem('portion3').split(",");
Storage['portion4'] = localStorage.getItem('portion4') === null ? (localStorage.setItem('portion4', ['VLCY', 'TYMR']), localStorage.getItem('portion4').split(",")) : localStorage.getItem('portion4').split(",");


var chennai = angular.module('chennai', ['ngRoute', 'weather', 'news']);


//assign the array : all the station names to a rootscope variable
chennai.run(function ($rootScope) {
    $rootScope.arrayStationNames = arrayStationNames;
});

chennai.controller('main', function ($scope) {

});