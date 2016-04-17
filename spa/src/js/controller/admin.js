angular.module('adminApp')
    .controller('adminCtrl', ['$scope', '$window', '$state', '$timeout', function($scope, $window, $state, $timeout){
        
        //重置页面的尺寸 
        angular.element($window).bind('resize', function(){
            //当更新 $scope 对象上的数据 视图不更新时，使用$scope.$apply即可。
            $scope.$apply(setHeight);
        });

        $timeout(setHeight, 1500);

        function setHeight(){
            $scope.height = angular.element(document).innerHeight();
        }

        setHeight();



        //跳转页面，在子模板中也能使用 相当于全局方法。
        $scope.toPage = function(page){
            $state.go(page)
        };


        //折叠左右菜单
        $scope.isCollapse = false;
        $scope.collapseNav = function(){
            $scope.isCollapse = !$scope.isCollapse;
        }

    }])