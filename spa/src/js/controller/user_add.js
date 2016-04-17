angular.module('adminApp')
    .controller('userAddCtrl', ['$scope', '$state', 'cfpLoadingBar', function($scope, $state, cfpLoadingBar){
        
        cfpLoadingBar.complete();

        $scope.data = {};

        //表单提交
        $scope.doSubmit = function(e){
            e.preventDefault();
            //这里简单判断下就提交了
            if($scope.data.name){
                alert('添加成功!');
                $state.go('user/list')
            }
        }

    }])