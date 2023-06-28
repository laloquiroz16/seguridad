# Internet Explorer Support

Para asegurar que la aplicación funcione correctamente en IE (9+)

## XMLHttpRequests

Para todo request que se pase a la api desde IE (cualquier versión) se debe usar [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) de lo contrario el request va a fallar, ej.:

```javascript
get_collaborators(survey_id, filters, format) {
    let url = '';

    if (format === 'xls') {
      url = `${this.endpoint_url}survey/${survey_id}/collaborators/?process_id=${this.process_id}`
    } else {
      url = `${this.endpoint_url}survey/${survey_id}/collaborators/?process_id=${this.process_id}`
    }

    if (filters) {
    /*
    * Aquí se usa encodeURIComponent
    * para evitar los problemas de IE
    */
      url += `&filters=${encodeURIComponent(angular.toJson(filters))}`
    }

    if (format) {
      url += `&dump_format=${format}`
    }

    return this.$http.get(url).then((survey) => {
      return JSON.parse(survey.data.data)
    }, (error) => {
      this.$log.debug('Error:', error);
      return error
    })
  }
```

Se debe cambiar todos los siguientes puntos en app:

## Atributo style

Usar la directiva ng-style en vez del atributo style="{{ someCss }}".
El último funciona en Chrome, Firefox, Safari y Edge pero no en Internet Explorer (incluso el 11)

## Atributo type

Usar la directiva ng-attr-type en vez del atributo type="{{ someExpression }}".
De usar el atributo, IE siempre sobrescribe la expresión por type="Submit", y no le da tiempo a AngularJS de realizar
la interpolación

## Atributo value

Usar la directiva ng-attr-value en vez del atributo value="{{ someExpression}}".
En caso de usar el atributo IE sobrescribe con value="0" antes de que AngularJS evalúe la expresión.

## Atributo placeholder

Usar la directiva ng-attr-placeholder en vez de placeholder="{{ someExpression }}".
Usando el atributo IE da error al acceder al valor del nodo en un nodo sin padre
