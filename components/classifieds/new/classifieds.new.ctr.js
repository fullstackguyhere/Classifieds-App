(function()
{
    "use strict";
    angular
    .module('ngClassifieds')
    .controller('newClassifiedsController',function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory)
    {
        var vm=this;

        vm.saveClassified=saveClassified;
        vm.closeSideNav=closeSideNav;

        $timeout(function()
        {
            $mdSidenav('left').open();
        })
        
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

        function saveClassified(classified) {
            if(classified) {
    
              classified.contact = {
                name: "Ryan Chenkie", 
                phone: "(555) 555-5555",
                email: "ryanchenkie@gmail.com"
              }
    
              $scope.$emit('newClassified', classified)          
              vm.isSideNavOpen = false;
            }
          }

    });
})();