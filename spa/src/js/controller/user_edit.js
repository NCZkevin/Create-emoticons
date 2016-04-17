angular.module('adminApp')
    .constant('getUser', 'src/data/user.json')
    .controller('userEditCtrl', ['$scope', '$state', '$stateParams', '$http', 'getUser', 'cfpLoadingBar', function($scope, $state, $stateParams, $http, getUser, cfpLoadingBar){
        
        var uid = parseInt($stateParams.id);

        //判断  id 是否存在
        if(angular.isNumber(uid) === false){
            throw new Error('id不存在!');
        }

        $scope.data = {};
        //由于数据是模拟的，因此返回后还需要匹配
        $http.get(getUser).success(function(res){
            angular.forEach(res.list, function(item){
                if(item.id == uid){
                    $scope.data = item;
                }
            })
        }).error(function(){
            console.log('数据查询失败!')
        });

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