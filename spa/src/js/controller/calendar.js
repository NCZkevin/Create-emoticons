angular.module('adminApp')
    .controller('calendarCtrl', ['$scope', '$state', 'cfpLoadingBar', function($scope, $state, cfpLoadingBar){
        
        cfpLoadingBar.complete();

        $scope.changeDate = function (modelName, newDate) {
            console.log(modelName + ' has had a date change. New value is ' + newDate.format());
        }

    }])