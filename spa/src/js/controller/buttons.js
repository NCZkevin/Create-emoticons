angular.module('adminApp')
    .controller('buttonsCtrl', ['$scope',  'cfpLoadingBar', function($scope, cfpLoadingBar){
        
        cfpLoadingBar.complete();

    }])