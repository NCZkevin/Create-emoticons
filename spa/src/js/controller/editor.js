angular.module('adminApp')
    .controller('editorCtrl', ['$scope',  'cfpLoadingBar', function($scope, cfpLoadingBar){
        
        cfpLoadingBar.complete();

        $scope.htmlContent = '<p>hishion</p>';
    }])