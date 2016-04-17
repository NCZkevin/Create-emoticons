angular.module('adminApp', ['720kb.tooltips'])
    .controller('tooltipCtrl', ['$scope',  'cfpLoadingBar', function($scope, cfpLoadingBar){
        
        cfpLoadingBar.complete();

    }])