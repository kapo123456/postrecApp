angular.module('starter.controllers') 
.directive('validateendate', function($log)
		{
		    return {
		        restrict : 'A',
		        link : function($scope, $element, $attr)
		        {
		            $scope.$watch('message.endate', function()
		            {
		                var endate = Date.parse($scope.endate);
		                var startdate = Date.parse($scope.startdate);

		                console.log(endate);
		                console.log(startdate);

		                if ($scope.form.endate.$dirty)
		                {
		                    if (($scope.startdate == '') && ($scope.endate == ''))
		                    {
		                        $scope.form.endate.$setValidity("enterendate", true);
		                        $scope.form.startdate.$setValidity("enterstartdate", true);
		                    }
		                    else if (($scope.endate == '') && ($scope.startdate != ''))
		                    {
		                        $scope.form.endate.$setValidity("enterendate", false);
		                        $scope.form.endate.$setValidity("validateendate", true);
		                        $scope.form.startdate.$setValidity("validatestartdate", true);
		                    }
		                    else if (($scope.endate != '') && ($scope.startdate == ''))
		                    {
		                        $scope.form.startdate.$setValidity("enterstartdate", false);
		                    }
		                    else
		                    {
		                        $scope.form.endate.$setValidity("enterendate", true);
		                        $scope.form.startdate.$setValidity("enterstartdate", true);

		                        if (endate < startdate)
		                        {
		                            $scope.form.endate.$setValidity("validateendate", false);
		                        }
		                        else
		                        {
		                            $scope.form.endate.$setValidity("validateendate", true);
		                        }
		                    }
		                }
		            })
		        }
		    };
		})

.directive('validatestartdate', function($log)
		{
		    return {
		        restrict : 'A',
		        link : function($scope, $element, $attr)
		        {
		            $scope.$watch('message.startdate', function()
		            {
		                var endate = Date.parse($scope.endate);
		                var startdate = Date.parse($scope.startdate);

		                console.log(endate);
		                console.log(startdate);

		                if ($scope.form.startdate.$dirty)
		                {
		                    $scope.form.startdate.$setValidity("validatestartdate", true);
		                    $scope.form.endate.$setValidity("validateendate", true);

		                    if (($scope.startdate == '') && ($scope.endate == ''))
		                    {
		                        $scope.form.startdate.$setValidity("enterstartdate", true);
		                        $scope.form.endate.$setValidity("enterendate", true);
		                    }
		                    else if (($scope.startdate == '') && ($scope.endate != ''))
		                    {
		                        $scope.form.startdate.$setValidity("enterstartdate", false);
		                    }
		                    else if ($scope.endate == '')
		                    {
		                        $scope.form.endate.$setValidity("enterendate", false);
		                    }
		                    else if (($scope.startdate == '') && ($scope.endate == ''))
		                    {
		                        $scope.form.startdate.$setValidity("enterstartdate", true);
		                    }
		                    else
		                    {
		                        $scope.form.endate.$setValidity("enterendate", true);
		                        $scope.form.startdate.$setValidity("enterstartdate", true);

		                        if (endate < startdate)
		                        {
		                            $scope.form.startdate.$setValidity("validatestartdate", false);
		                        }
		                        else
		                        {
		                            $scope.form.startdate.$setValidity("validatestartdate", true);
		                        }
		                    }
		                }   
		        })
		        }
		    };
		    });