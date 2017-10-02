(function() {
"use strict";

angular
    .module("ngClassifieds")
    .controller("classifiedsController",function($scope,$stateParams,$state,$http,classifiedsFactory,$mdSidenav,$mdToast,$mdDialog)
    {
        var vm=this;
        vm.toggleSideBar=toggleSideBar;
        vm.editClassified=editClassified;
        vm.deleteClassified=deleteClassified;


        classifiedsFactory.getClassifieds().then(function(classifieds)
        {
            vm.classifieds = classifieds.data;
            vm.categories=getCategories(vm.classifieds);
        });

        $scope.$on('newClassified', function(event, data) {
            data.id = vm.classifieds.length + 1;
            vm.classifieds.push(data);
            showToast('Classified Saved');
          });
          
        $scope.$on('editSaved',function(event,message) {
            showToast(message);
        });

        var contact={
            name:"Rohan Pota",
            phone:"(513) 1446-5465",
            email:"sexrohanpota@gmail.com"
        }
       
        function toggleSideBar()
        {
            $state.go('classifieds.new');
        };

        function editClassified(classified) {
            vm.editing = true;
            vm.classified = classified;
            $state.go('classifieds.edit', { id: classified.id, classified: classified });
        }

        function deleteClassified(event,classified) 
        {
            var confirm=$mdDialog.confirm()
                        .title(`Are you sure you want to delete ${classified.title}?`)
                        .ok('Yes')
                        .cancel('No')
                        .targetEvent(event);

            $mdDialog.show(confirm).then(function()
            {
                vm.classifieds.splice(vm.classifieds.indexOf(classified),1);
                showToast("Classified Deleted!");
            },function()
            {
                
            });
        }

        function showToast(message)
        {
            $mdToast.show(
                $mdToast.simple()
                .content(message)
                .position('top, right')
                .hideDelay(3000)
            );
        }

        function getCategories(classifieds)
        {
            var categories=[];
            angular.forEach(classifieds,function(item)
            {
                angular.forEach(item.categories,function(category)
                {
                    categories.push(category);
                });
            });
            return _.uniq(categories);
        }
    });
})();