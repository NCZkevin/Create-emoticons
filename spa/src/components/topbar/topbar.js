angular.module('topbar', [])
    .constant('topbarTpl', 'src/components/topbar/topbar.html')
    .directive('topBar', function(topbarTpl){
        return {
            restrict: 'E',
            templateUrl: topbarTpl,
            controller: function($scope){
                //切换
                $scope.isOpen = false;
                $scope.toggle = function(){
                    $scope.isOpen = !$scope.isOpen;
                }

                $scope.username = 'hishion';

                $scope.photo = 'src/images/img.jpg'
            }
        }
    })