/*
* 制作人: hishion
* site: www.byex.cn
*/
var _G = {
    baseUrl: 'src/',
    tplDir: 'src/views/',
    ctrlDir: 'src/js/controller/',
    /*
    *  获取模板
    */
    getTemplate: function(module, operation){
        return this.tplDir + module + (operation ? '_' + operation : '') + '.html'
    },
    /**
    *  获取控制器
    */
    getControl: function(module, operation){
        return this.ctrlDir + module + (operation ? '_' + operation : '') + '.js'
    },


    /**
    *  获取路由配置
    *  opt => {
    *       module: 功能模块
    *       operation: 模块下的操作
    *       files:   Array 需要动态加载的css,js文件
    *       params: 参数
    *
    *  }
    */
    getRouteOptions: function(opt){
        if(!opt)return;
        var url = [opt.module];
        opt.operation && url.push(opt.operation);
        opt.params    && url.push(opt.params)

        return {
            url: '/' + url.join('/') + '/' ,
            templateUrl: this.getTemplate(opt.module, opt.operation),
            resolve: {
                deps: ['$ocLazyLoad', 'cfpLoadingBar', function($ocLazyLoad, cfpLoadingBar){
                    cfpLoadingBar.start();
                    return $ocLazyLoad.load([
                            _G.getControl(opt.module, opt.operation)
                        ].concat(opt.files || []));
                }]
            }
        }
    },

    loadScript: function(url, callback){
        var script = document.createElement("script");
        script.type = "text/javascript";
        //IE
        if(script.readystate){
            script.onreadystatechange = function(){
                if(script.readystate == "loaded" || script.readystate == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            }
        }else{
            script.onload = function(){
                callback();
            }
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

angular.module('adminApp',
['ui.router',
'oc.lazyLoad',
 'angular-loading-bar',
  'nav',
   'topbar',
    'simditor',
     'textAngular'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider){
        //此处关闭了 html5模式
        //$locationProvider.html5Mode(true);
        cfpLoadingBarProvider.includeSpinner = true;
        //配置路由
        $stateProvider
            .state('user/list', _G.getRouteOptions({
                    module: 'user',
                    operation: 'list',
                    files: [
                        'src/components/ngDialog/ngDialog.js',
                        'src/components/ngDialog/ngDialog.css',
                        'src/components/ngDialog/ngDialog-theme-default.css',

                        //分页
                        'src/js/ngmodules/paging.js',
                        'src/css/'
                    ]
                })
            )
            .state('user/add', _G.getRouteOptions({
                    module: 'user',
                    operation: 'add'
                })
            )
            .state('user/edit', _G.getRouteOptions({
                    module: 'user',
                    operation: 'edit',
                    params: ':id'
                })
            )
            .state('dashboard', _G.getRouteOptions({
                    module: 'dashboard',
                    files: [
                        'src/js/plugins/echarts.min.js'
                    ]
                })
            )

            .state('editor', _G.getRouteOptions({
                    module: 'editor',
                    files:  [
                        'src/components/simditor/simditor.css',
                        'src/components/simditor/font-awesome.css',
                        'src/components/simditor/simditor/simditor-all.js',
                        'src/components/simditor/angular-editor.js',

                        'src/components/textAngular/textAngular.css'
                    ]
                })
            )

            .state('calendar', _G.getRouteOptions({
                    module: 'calendar',
                    files: [
                        'src/components/datepicker/angular-datepicker.css',
                        'src/components/datepicker/angular-datepicker.js'
                    ]
                })
            )

            .state('file_upload', _G.getRouteOptions({
                    module: 'file_upload',
                    files: [
                        'src/js/ngmodules/angular-file-upload.js'
                    ]
                })
            )

            .state('buttons', _G.getRouteOptions({
                    module: 'buttons'
                })
            )

            .state('icons', _G.getRouteOptions({
                    module: 'icons'
                })
            )

            .state('tooltip', _G.getRouteOptions({
                    module: 'tooltip',
                    files: [
                        'src/components/tooltips/angular-tooltips.css',
                        'src/components/tooltips/angular-tooltips.js'
                    ]
                })
            )


            //默认地址
            $urlRouterProvider.otherwise('/dashboard/')
    })
