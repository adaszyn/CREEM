CREEMapp.controller("FormCtrl", ['$scope','CreemSettings','$http', function ($scope, CreemSettings, $http) {
    CreemSettings.setSettingsMenu({
        buildings: 1
    });
    $http.get('http://127.0.0.1:8080/epi?filterBy=POD&filterParams=IT001E00006682')
        .then(function (response) {
            if (response.status === 200) {
                $scope.data = response.data;
            }
        });
    $scope.submit = function () {
        var requestObject = {
            "idImmobile": $scope.data[0].modulo_epi.idImmobile,
            "denominazione": $scope.data[0].modulo_epi.denominazione,
            "codice": $scope.data[0].modulo_epi.codice,
            "pod": $scope.data[0].modulo_epi.pod,
            "comune": $scope.data[0].modulo_epi.comune,
            "indirizzo": $scope.data[0].modulo_epi.indirizzo,
            "provincia": $scope.data[0].modulo_epi.provincia,
            "tipologia": $scope.data[0].modulo_epi.tipologia,
            "latitudine": $scope.data[0].modulo_epi.latitudine,
            "longitudine": $scope.data[0].modulo_epi.longitudine,
            "gradigiorno": $scope.data[0].modulo_epi.gradigiorno,
            "gradigiorno_estivi": $scope.data[0].modulo_epi.gradigiorno_estivi,
            "zonaclimatica": $scope.data[0].modulo_epi.zonaclimatica,
            "oreriscaldamento": $scope.data[0].modulo_epi.oreriscaldamento,
            "rendimentonazionale": $scope.data[0].modulo_epi.rendimentonazionale,
            "quotaCaldaie": $scope.data[0].modulo_epi.quotaCaldaie,
            "quotaPdC": $scope.data[0].modulo_epi.quotaPdC,
            "irradianza_invernale": $scope.data[0].modulo_epi.irradianza_invernale,
            "irradianza_estiva": $scope.data[0].modulo_epi.irradianza_estiva,
            "datiedificio": $scope.data[0].modulo_epi.datiedificio,
            "supesterneopache": $scope.data[0].modulo_epi.supesterneopache,
            "componentitrasparenti": $scope.data[0].modulo_epi.componentitrasparenti
        };
        var confirmation = confirm("Sei sicuro di voler aggiornare i dati?");
        if (confirmation) {
            $http.post('http://127.0.0.1:8080/epi/update', requestObject)
                .then(function (response) {
                    if (response.status === 200) {
                        window.alert("Data updated!");
                    }
                    else {
                        window.alert("Something went wrong!");
                    }
                })
        }
    }
}]);