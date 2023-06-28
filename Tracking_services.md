Se ha implementado el servicio **amplitudeService** que implementa un método
llamado logEvent que permite registrar eventos en amplitude que permite realizar analiticas y
control de accesos a recursos basado en eventos.

La utilización es la siguiente :

1.- Inyectar el servicio amplitudeService en el controlador.
2.- Utilizar el método logEvent. Recibe un parámetro obligatorio y uno opcional.

```javascript
logEvent(ACCION, {});
```

ACCION: es un string que representa una accion realizada por el usuario. Por ejemplo: 'view_account_enterprise'
objeto opcional: Representa la data que se modificó o utilizó en la acción. Es opcional.

Ejemplo

```javascript
amplitudeService.logEvent("user_login", {
  subdomain: subdomain,
  username: $scope.username,
  with_google: $scope.user.g_info ? true : false
});
```
