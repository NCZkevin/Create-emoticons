angular.module('adminApp')
    .controller('iconsCtrl', ['$scope',  'cfpLoadingBar', function($scope, cfpLoadingBar){
        
        cfpLoadingBar.complete();

    }])