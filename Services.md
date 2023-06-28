# Servicios

# Definición

```javascript
export class MonitoringService {
  // Los servicios se definen como clases
  /*@ngInject*/ // Se agrega el comentario previo al constructor para inyectar las dependencias
  constructor($log, global, $http) {
    // Se inicializan todos los valores locales del servicio
    this.$log = $log;
    this.endpoint_url = `${global.apiUrl}/engagement/`;
    this.$http = $http;
    this.process_id = null;
    this.survey_id = null;
  }

  summary_area(area_id, format) {
    // Todas las funciones definidas dentro de la clase son públicas, por lo que se exponen con el mismo nombre que se definen
    //Si hace falta una función privada, se debe definir fuera de un scope que se exporte
    let url = "";

    if (format === "xls") {
      url = `${this.endpoint_url}survey/${this.survey_id}/summary_area?process_id=${this.process_id}&area_id=${area_id}`;
    } else {
      url = `${this.endpoint_url}survey/${this.survey_id}/summary_area?process_id=${this.process_id}&area_id=${area_id}`;
    }

    if (format) {
      url += `&export_format=${format}`;
    }

    return this.$http.get(url).then(
      survey => {
        return JSON.parse(survey.data.data);
      },
      () => {
        return null;
        //console.log(error);
      }
    );
  }

  survey_summary(area_id /*, filters*/) {
    return this.$http
      .get(
        `${this.endpoint_url}survey/monitoring/${this.survey_id}/survey_monitoring_summary?area_id=${area_id}&process_id=${this.process_id}`
      )
      .then(
        survey => {
          return JSON.parse(survey.data.data);
        },
        (/*error*/) => {
          //console.log(error);
          return null;
        }
      );
  }

  survey_summary_with_filters(area_id, filters, result_type) {
    let data = {
      area_id: area_id,
      filters: filters
    };

    if (result_type) {
      data.result_type = result_type;
    }

    return this.$http
      .post(
        `${this.endpoint_url}survey/monitoring/${this.survey_id}/survey_monitoring_summary?process_id=${this.process_id}`,
        data
      )
      .then(
        survey => {
          survey = JSON.parse(survey.data.data);
          return survey;
        },
        error => {
          this.$log.log(error);
          return null;
        }
      );
  }
}
```

## Registro en el módulo:

```javascript
import { MonitoringService } from commons;
angular.module(...)
    .service("monitoringService", MonitoringService);
```
