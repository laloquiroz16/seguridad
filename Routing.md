# Enrutamiento

Las rutas de la aplicación se manejarán de la siguiente forma:

1.- Cada módulo definirá sus propias rutas, esto para mejorar la mantenibilidad:

## Definición de rutas

Se manejarán dos tipos de rutas, por lazy load y por módulo

### LazyLoaded routes

```javascript
{
    state: "performance.**",
    /*
    angular-ui-router reconoce esto como un wildcard, lo que activa la ruta siempre que inicie con el url definido, es decir
    /performance/xxxx/zzzz/yyyy activará la ruta
    */
    url: "/performance",
    lazyLoad: ($transition$) => {
        // Esta es una propiedad del ui-router, que ejecuta el llamado para cargar con lazy load el módulo que corresponde a la ruta
        let $ocLazyLoad = $transition$.injector().get("$ocLazyLoad"); // Se pide por medio de inyección de dependencias el servicio $ocLazyLoad
        return System.import("../modules/performance/performance.module.js").then(loadedModule => $ocLazyLoad.load(loadedModule.PERFORMANCE_MODULE));
        // Se importa la constante que haya sido exportada desde el module.js
        // Se utiliza sintaxis de System (Webpack reconoce ésta sintaxis), la cual importa On-Demand el módulo y $ocLazyLoad se encarga de inyectarlo en angularjs
    }
}
```

Las rutas que definen el lazyLoad no requieren información adicional, ya que los módulos que se importen tendrán la información necesaria para la ruta.

### Module Routes

Las rutas del módulo definen todas las rutas a las que se puede acceder a partir de un modulo (ej.: performance/reporting)

#### Definición

performance.routing.js:

```javascript
export function PerformanceRoutingConfiguration($stateProvider) {
  "ngInject";

  let states = [
    {
      name: "performance", // El nombre por si solo que identifica la ruta
      url: "/performance", // El url de la ruta
      template: require("./index.html"), // Los requires de los template deben solicitarse (require) de forma relativa al archivo routing
      abstract: true // Las vistas abstractas le dicen a ui-router que no pueden ser activas por si solas, que debe cargarse alguna vista hija.
    },
    {
      url: "/:process_id/monitoring/index",
      name: "performance.monitoring_index",
      // Las rutas hijas deben tener de prefijo el name del parent (usando dot notation), todas las rutas hijas se cargaran en el ui-view por defecto del parent
      template: require("./monitoring/index.html")
    },
    {
      url: "/:process_id/monitoring/evaluations/evaluators",
      name: "performance.monitoring_evaluations_evaluator",
      template: require("./collaborators/edit_collaborator/evaluation/evaluators/index.evaluators.html")
    },
    {
      url: "/:process_id/monitoring/evaluations/autoevaluation",
      name: "performance.monitoring_evaluations_autoevaluation",
      template: require("./collaborators/edit_collaborator/evaluation/autoevaluation/index.autoevaluation.html")
    },
    {
      url: "/:process_id/reporting/individual",
      name: "performance.individual_results",
      template: require("./reporting/index.individuals.html")
    },
    {
      url: "/:process_id/reporting/company?areaid&tab",
      name: "performance.company_results",
      template: require("./reporting/index.company.html")
    },
    {
      url: "/:process_id/company/action_plans?module",
      name: "performance.action_plans",
      template: require("./actionplans/index.html")
    },
    {
      url: "/:process_id/reporting",
      name: "performance.results",
      template: require("./reporting/index.html")
    },
    {
      url: "/process/:process_id/collaborators",
      name: "performance.collaborators",
      template: require("./collaborators/index.html")
    },
    {
      url: "/process/:process_id/collaborator/:user_token/edit",
      name: "performance.edit_collaborator",
      template: require("./collaborators/edit_collaborator/edit.collaborators.html")
    },
    {
      url: "/process/:process_id/collaborator/update?user_token=&module",
      name: "performance.update_collaborator",
      template: require("./collaborators/edit_collaborator/edit.collaborators.html")
    },
    {
      url: "/:process_id/new_process_config",
      name: "performance.new_process_config",
      template: require("./new_process/config/config.html")
    },
    {
      url: "/:process_id/new_process_areas",
      name: "performance.new_process_areas",
      template: require("./new_process/areas.html")
    },
    {
      url: "/:process_id/new_process_people",
      name: "performance.new_process_people",
      template: require("./new_process/collaborators_config/people.html")
    },
    {
      url: "/:process_id/new_process_evaluation_types",
      name: "performance.new_process_evaluation_types",
      template: require("./new_process/evaluation_types.html")
    },
    {
      url: "/:process_id/new_process_competences",
      name: "performance.new_process_competences",
      template: require("./new_process/competences.html")
    },
    {
      url: "/:process_id/new_process_goals",
      name: "performance.new_process_goals",
      template: require("./new_process/objectives/goals.html")
    },
    {
      url: "/:process_id/new_process_results",
      name: "performance.new_process_results",
      template: require("./new_process/results.html")
    },
    {
      url: "/:process_id/new_process_convertion_table",
      name: "performance.new_process_convertion_table",
      template: require("./new_process/convertion_table.html")
    },
    {
      url: "/:process_id/new_process_import_results",
      name: "performance.new_process_import_results",
      template: require("./new_process/import_results/import_results.html")
    },
    {
      url: "/:process_id/evaluation/instructions",
      name: "performance.evaluation_instructions",
      template: require("./evaluation/instructions.html")
    },
    {
      url: "/:process_id/evaluation/confirm_team",
      name: "performance.evaluation_confirm_team",
      template: require("./evaluation/confirm_team/index.confirm_team.html")
    },
    {
      url: "/:process_id/evaluation/detail",
      name: "performance.evaluation_evaluation",
      template: require("./evaluation/evaluation/index.evaluation.html")
    },
    {
      url: "/:process_id/evaluation/create_objectives",
      name: "performance.evaluation_create_objectives",
      template: require("./evaluation/evaluation/user_objectives/index.user_objectives.html")
    },
    {
      url: "/:process_id/evaluation/feedback",
      name: "performance.evaluation_feedback",
      template: require("./evaluation/feedback/index.feedback.html")
    },

    {
      url:
        "/:process_id/evaluation/feedback/collaborator?uid&module&plans&type&source&validable_id",
      name: "performance.feedback_collaborator",
      template: require("./collaborators_feedback/index.collaborator.html")
    },
    {
      url:
        "/:process_id/evaluation/feedback/collaborator?uid&module&plans&type&source&validable_id",
      name: "performance.feedback_collaborator",
      template: require("./collaborators_feedback/index.collaborator.html")
    },
    {
      url: "/satisfaction/:process_id/area?uid&process_token&module",
      name: "performance.area_profile",
      template: require("./satisfaction/profile/index.profile.html")
    },
    {
      url: "/evaluation/validation?process_id",
      name: "performance.validation",
      template: require("./evaluation/validation/index.html")
    },
    {
      url: "/evaluation/validation/evaluations?process_id&validable_id",
      name: "performance.validation_evaluation_status",
      template: require("./evaluation/validation/index.evaluations.html")
    }
  ];
  states.forEach(state => {
    $stateProvider.state(state.name, state);
  });
}
```

#### Configuración

```javascript
import {PerformanceRoutingConfiguration} from "./performance.routing";

export const PERFORMANCE_MODULE = angular.module("performance",[...])
    .config(PerformanceRoutingConfiguration);
```
