/*
* 定义一个名称为 nav 的指令
* 待完善
*/
angular.module('nav', [])
    .factory('nav', function(){
        return {
            //设置当前状态
            setCurrent: function(elem){
                $(elem).parents('ul.nav').find('li').removeClass('current-page');
                $(elem).parent('li').addClass('current-page');
            },
            //折叠 导航
            collapseNavigation: function(elem){
                var $target = $(elem).next('.child_menu');
                var $parent = $(elem.parentNode);

                if($parent.hasClass('side-menu')){
                    $parent.siblings('li').remove('active')
                        .find('.child_menu').slideUp('200');
                }else{
                    if($parent.hasClass('active')){
                        $parent.removeClass('active');
                        $target.slideUp(200);
                    }else{
                        $parent.addClass('active');
                        $target.slideDown(200);
                        $parent.siblings().removeClass('active')
                            .find('.child_menu').slideUp(200);
                    }
                }
            },
            //根据当前 url 找出默认的选中菜单
            findSelected: function(data, curUrl){
                for(var i = 0, len = data.length; i < len; i++){
                    var ret = data[i];
                    var child = ret.child;

                    if(ret.url == curUrl){
                        ret.className = 'current-page';
                        return data;
                    }
                    for(var j = 0, size = child.length; j < size; j++){
                        if(child[j].url == curUrl){
                            child[j].className = 'current-page';
                            return data;
                        }
                    }
                }
                return data;
            }
        }
    })
    .constant('getNav', 'src/data/navigation.json')
    .constant('navTpl', 'src/components/nav/nav.html')
    // 注入上面 factory定义的 nav, 以及常量 navTpl
    .directive('navList', function(nav, navTpl){ 
        return {
            //E,A,C,M 分别代表 element, Attribute, ClassName, 注释元素
            restrict: 'E',
            templateUrl: navTpl,
            controller: function($scope, $http, $state, $timeout, $location, getNav){
                //页面跳转
                $scope.goto = function(url, event){
                    //没有链接，表示有子菜单
                    if(!url){
                        nav.collapseNavigation(event.target)
                    }else{
                        nav.setCurrent(event.target);
                        $state.go(url)
                    }
                };

                $scope.data = {
                };
                
                //ajax 获取左侧菜单数据
                $http.get(getNav).success(function(res){
                    var list = nav.findSelected(res.list, $location.url().replace(/^\/(.*)\/$/, '$1'));
                    $scope.data.brandName = res.brandName;
                    $scope.data.list      = res.list;

                    //如果是子菜单，则需要给当前的 ul 打开
                    $timeout(function(){
                        $('.current-page').parent('.child_menu')
                            .slideDown('active').parent('li')
                            .addClass('active');
                    });

                }).error(function(){
                    console.log('数据获取失败!')
                });

            }
        }
    });
