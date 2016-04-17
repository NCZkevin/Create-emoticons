angular.module('adminApp')
    //定义一个常量
    .constant('getUser', 'src/data/user.json')
    .controller('userListCtrl', ['$scope', 'cfpLoadingBar', 'ngDialog',  '$state', '$http', 'getUser', function($scope, cfpLoadingBar, ngDialog, $state, $http, getUser){

        $scope.data = {
            pageSize: 5,
            mininum: 0,
            maxinum: 5
        };

        var listCache = [];

        //分页跳转
        $scope.toJump = function(idx, size){
            $scope.data.pageIdx = idx;
            $scope.data.mininum = (idx - 1) * size;
            $scope.data.maxinum = idx * size;
        };

        //ajax请求 获取数据
        $http.get(getUser).success(function(res){
            //更新数据
            $scope.data.list = listCache = res.list;
            //结束加载条
            cfpLoadingBar.complete();

        }).error(function(){
            console.log('页面数据加载失败!')
        });

        //删除指定id的条目
        function deleteItem(id){
            var res = false;
            angular.forEach($scope.data.list, function(item, index){
                if(item.id == id){
                    $scope.data.list.splice(index, 1);
                    var pageSize  = $scope.data.pageSize;
                    var pageTotal = Math.ceil($scope.data.list.length/pageSize);
                    $scope.data.pageIdx > pageTotal && $scope.toJump(pageTotal, pageSize)
                    res = true;
                }
            });
            return res;
        }

        //删除
        $scope.delete = function(id){
            if(!angular.isNumber(id))return;
            ngDialog.open({
                template: 'src/components/ngDialog/confirm.html',
                controller: function($scope){
                    $scope.confirm = function(){
                        deleteItem(id);
                        ngDialog.close();
                    }
                }
            })
        };


        //跳转到编辑页面
        $scope.edit = function(id){
            if(!angular.isNumber(id))return;
            $state.go('user/edit', {id: id});
        };



        $scope.search = function(){
            var val = angular.element('#keywords').val().replace(/^\s+|\s+$/, '');
            var reg = new RegExp(val);
            var list = [];

            angular.forEach(listCache, function(item, index){
                if(item.name.search(reg) > -1){
                    list.push(item)
                }
            });
            $scope.data.list = list;
        }


    }])