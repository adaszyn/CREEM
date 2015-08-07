/**
 * Created by wojtek on 8/7/15.
 */
CREEMapp.directive('toNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            controller.$formatters.push(function(value) {
                return parseInt(value);
            });
        }
    }
});