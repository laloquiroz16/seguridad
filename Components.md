# Componentes

## Definición:

forbiden-data.component.js
```javascript
import ForbiddenDataTemplate from "./forbidden-data.component.html"; // Se importa el template del componente

class ForbiddenDataController { // Se define una clase como el controlador del componente (si hace falta un controllador)
    /*@ngInject*/ // Este comentario se debe colocar antes de la definición del constructor para que ng-annotate-loader inyecte correctamente las dependencias
    constructor($log) {
        /* En el constructor solo debe existir lógica para instanciar el controlador, no se deben realizar llamadas a servicios ni operaciones complejas en el constructor */
        this.$log = $log; // Si no se hace este tipo de inicialización no estará disponible fuera del scope del constructor la variable $log
    }
    $onInit() {
        /* Las operaciones de inicialización deben realizarse en este metodo (angularjs se encarga de llamar este método inmediatamente después de instanciar el controlador) */
    }
}

/*
Los componentes se registran en angularjs por medio de un objeto, por lo que se exporta el objeto que lo define
*/

export const ForbiddenDataComponent = {
    template: ForbiddenDataTemplate, // La variable importada como el template debe ser asignado a template, no templateUrl
    controller: ForbiddenDataController, // controller será asignado como el controlador de este componente
    controllerAs: "model", // Nombre de la variable por medio de la cual se hace accesible los elementos del controlador (antiguo $scope)
    bind: {
        forbiddenArea: "<",
        forbiddenData: "<"
    } // Objeto key-value que establece los parametros que puede recibir el componente
};

/*
Los componentes establecen un isolated scope, por lo que ninguna propiedad de los parent scopes está disponible al componente, para hacer uso de este tipo de datos
se debe recibir por medio de un input binding (<)
*/
```
forbidden-data.component.html:
```html
<div class="card no-radius">
    <div class="body p-r-none p-l-none">
        <div class="col-md-12 summary" ng-if="model.forbiddenArea">
        <!-- Las propiedades y metodos del controlador están disponibles a través de model, ya que se estableció controllerAs: "model" -->
            <div class="row m-b m-t">
                <div class="col-md-12 align-center">
                    <div><img src="/assets/images/ico.info.png" witdh="80" height="80"></div>
                    <p class="no_results_title">
                        No hay datos disponibles
                    </p>
                    <p class="no_results_subtitle">Está intentando acceder a resultados de un área a la que no tiene permisos.</p>
                </div>
            </div>
        </div>
        <div class="col-md-12 summary" ng-if="!model.forbiddenArea">
            <div class="row m-b m-t">
                <div class="col-md-12 align-center">
                    <div>
                        <img src="/assets/images/ico.info.png" witdh="80" height="80">
                    </div>
                    <p class="no_results_title">
                        No hay datos disponibles
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Registro en el módulo:

```javascript
import { ForbiddenDataComponent } from "./components/forbidden-data.component"; // Se importa el componente en el JS

export default angular.module(...)
    .component("forbiddenData", ForbiddenDataComponent); // Se registra el componente en el modulo
```

Los componentes se usan en el html siguiendo la misma forma que una directiva, es decir:

```javascript
"forbiddenData"
```
Se convierte en:

```html
<forbidden-data></forbidden-data>
```

## Enrutamiento

Los componentes pueden ser enrutados directamente en un state usando angular-ui-router:

```javascript
export function($stateProvider){
    $stateProvider.state({
        name: "forbiddenDataState", // Este nombre es arbitrario
        url: "/403",
        component:"forbiddenData" // Se debe usar el nombre con el cual se registró el componente en el módulo
    });
}
```