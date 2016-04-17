
/*
* 暂时未完成
*/
angular.module('ngTooltip', [])
    .directive('ngTooltip', function(){
        return {
            restrict: 'A',
            link: function(scope, elem, attrs){

                elem.on('mouseover', function(e){
                    e.stopPropagation();
                    var direction = attrs['direction'] || 'top';
                    var text      = attrs['ngTooltip'];
                    var tooltip   = angular.element('<div class="ng-tooltip">'+ text +'</div>');
                    angular.element(document.body).append(tooltip.hide());

                    var x = e.pageX, y = e.pageY,
                        w = this.offsetWidth,
                        h = this.offsetHeight,
                        w2 = tooltip[0].offsetWidth,
                        left = 0, top = 0;

                    switch(tooltip){
                        case 'left':
                            left = x - w2;
                            top  = y + h/2;
                            break;
                        case 'right':
                            left = x + w;
                            top  = y + h/2;
                            break;
                        case 'top':
                            left = x + w/2;
                            top  = y;
                            break;
                        default:
                            left = x + w/2;
                            top = y + h;
                        break;
                    }
                    tooltip.css({'left': left+'px', 'top': top+'px', 'position': 'absolute'}).fadeIn(200).addClass('ng-tooltip ng-tooltip-' + direction);

                    this.$tooltip = tooltip;
                })
                
                .on('mouseover', function(){
                    console.log(2222)
                    var direction = attrs['direction'] || 'top';
                    this.$tooltip.removeClass('ng-tooltip-' + direction)
                })

            }
        }
    })

