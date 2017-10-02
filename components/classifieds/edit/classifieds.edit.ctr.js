(function()
{
    "use strict";
    angular
    .module('ngClassifieds')
    .controller('editClassifiedsController',function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory)
    {
        var vm=this;
        vm.saveEdit=saveEdit;
        vm.closeSideNav=closeSideNav;
        vm.classified = $state.params.classified;

        $timeout(function()
        {
            $mdSidenav('left').open();
        });
        
        $scope.$watch('vm.isSideNavOpen',function(sideNav)
        {
            if(sideNav===false)
            {
                $mdSidenav('left').close().then(function()
                {
                    $state.go('classifieds');
                });
            }
        });

        function closeSideNav()
        {
            vm.isSideNavOpen=false;
        }

        function saveEdit() {
            $state.params.classified = vm.classified;
            vm.isSideNavOpen=false;
            $scope.$emit('editSaved','Classified Edited!');
          }

    });
})();