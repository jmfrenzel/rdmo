angular.module('options', ['core'])

.factory('OptionsService', ['$resource', '$timeout', '$window', '$q', 'utils', function($resource, $timeout, $window, $q, utils) {

    /* get the base url */

    var baseurl = angular.element('meta[name="baseurl"]').attr('content');

    /* configure resources */

    var resources = {
        optionsets: $resource(baseurl + 'api/v1/options/optionsets/:list_action/:id/:detail_action/'),
        options: $resource(baseurl + 'api/v1/options/options/:id/:detail_action/'),
        providers: $resource(baseurl + 'api/v1/options/providers/:id/'),
        conditions: $resource(baseurl + 'api/v1/conditions/conditions/:id/'),
        settings: $resource(baseurl + 'api/v1/core/settings/'),
    };

    /* configure factories */

    var factories = {
        optionsets: function() {
            return {
                order: 0,
                uri_prefix: service.settings.default_uri_prefix
            };
        },
        options: function(parent) {
            if (angular.isDefined(parent) && parent) {
                return {
                    order: 0,
                    optionset: parent.id,
                    uri_prefix: service.settings.default_uri_prefix
                };
            } else {
                return {
                    order: 0,
                    optionset: null,
                    uri_prefix: service.settings.default_uri_prefix
                };
            }
        }
    };

    /* create the options service */

    var service = {};

    service.init = function(options) {
        service.conditions = resources.conditions.query();
        service.providers = resources.providers.query();
        service.settings = resources.settings.get();
        service.uri_prefixes = []
        service.uri_prefix = ''

        service.initView().then(function () {
            var current_scroll_pos = sessionStorage.getItem('current_scroll_pos');
            if (current_scroll_pos) {
                $timeout(function() {
                    $window.scrollTo(0, current_scroll_pos);
                });
            }
        });

        $window.addEventListener('beforeunload', function() {
            sessionStorage.setItem('current_scroll_pos', $window.scrollY);
        });
    };

    service.initView = function(options) {
        return resources.optionsets.query({list_action: 'nested'}, function(response) {
            service.optionsets = response;

            // construct list of uri_prefixes
            service.uri_prefixes = []
            service.optionsets.map(function(optionset) {
                if (service.uri_prefixes.indexOf(optionset.uri_prefix) < 0) {
                    service.uri_prefixes.push(optionset.uri_prefix)
                }
                optionset.options.map(function(option) {
                    if (service.uri_prefixes.indexOf(option.uri_prefix) < 0) {
                        service.uri_prefixes.push(option.uri_prefix)
                    }
                });
            });
        }).$promise;
    };

    service.openFormModal = function(resource, obj, create, copy) {
        var fetch_resource = (resource === 'conditions') ? 'optionsets': resource;

        service.errors = {};
        service.values = utils.fetchValues(resources[fetch_resource], factories[resource], obj, create, copy);

        $q.when(service.values.$promise).then(function() {
            $('#' + resource + '-form-modal').modal('show');
            $('formgroup[data-quicksearch="true"]').trigger('refresh');
        });
    };

    service.submitFormModal = function(resource) {
        var submit_resource = (resource === 'conditions') ? 'optionsets': resource;

        utils.storeValues(resources[submit_resource], service.values).then(function() {
            $('#' + resource + '-form-modal').modal('hide');
            service.initView();
        }, function(result) {
            service.errors = result.data;
        });
    };

    service.openDeleteModal = function(resource, obj) {
        service.values = obj;
        $('#' + resource + '-delete-modal').modal('show');
    };

    service.submitDeleteModal = function(resource) {
        resources[resource].delete({id: service.values.id}, function() {
            $('#' + resource + '-delete-modal').modal('hide');
            service.initView();
        });
    };

    service.openShowModal = function(resource, obj) {
        service.values = utils.fetchValues(resources[resource], factories[resource], obj)

        $q.when(service.values.$promise).then(function() {
            $('#' + resource + '-show-modal').modal('show');
        });
    };

    service.hideOptionSet = function(item) {
        if (service.filter && item.key.indexOf(service.filter) < 0) {
            return true;
        }
        if (service.uri_prefix && item.uri_prefix != service.uri_prefix) {
            return true;
        }
    };

    service.hideOption = function(item) {
        if (service.filter && item.path.indexOf(service.filter) < 0
                           && item.text.indexOf(service.filter) < 0) {
            return true;
        }
        if (service.uri_prefix && item.uri_prefix != service.uri_prefix) {
            return true;
        }
    };

    return service;

}])

.controller('OptionsController', ['$scope', 'OptionsService', function($scope, OptionsService) {

    $scope.service = OptionsService;
    $scope.service.init();

}]);
