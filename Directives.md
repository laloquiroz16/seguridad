# Directivas

Las directivas deben ser utilizadas únicamente para modificar el comportamiento del html, en los
casos en los que haga falta una directiva que use un controlador, se debe utilizar un [componente](Components.md).

## Definición

```javascript
import angular from "angular";

function ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    let rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

function CustomNavBarBackgroundController($scope, $rootScope) {
    "ngInject";
    $scope.backgroundColor = $rootScope.current_user.enterprise.navbar_background;
    $scope.ElementSubscribed = false;
}

export class CustomNavBarBackground {
    constructor() {
        this.restrict = "A";
        this.controller = CustomNavBarBackgroundController;
    }
    link(scope, $element) {
        scope.$watch("backgroundColor", (backgroundColor) => {
            if (backgroundColor) {
                $element.css("background", backgroundColor);
                $element.css("border-bottom", `1px solid ${backgroundColor}`);
                scope.$watch(() => {
                    scope.activeElement = angular.element(".navbar .menu li.active.main-navbar");
                    scope.inactiveElements = angular.element(".navbar .menu li.main-navbar").not(".active");
                    return scope.activeElement[0];
                }, (element) => {
                    if (element) {
                        scope.inactiveElements.on("mouseenter", (event) => {
                            event.currentTarget.style.background = ColorLuminance(backgroundColor, -0.1);
                            scope.activeElement.css("background", ColorLuminance(backgroundColor, -0.2));
                        });
                        scope.inactiveElements.on("mouseleave", (event) => {
                            event.currentTarget.style.background = backgroundColor;
                            scope.activeElement.css("background", ColorLuminance(backgroundColor, -0.2));
                        });
                        scope.activeElement.css("background", ColorLuminance(backgroundColor, -0.2));
                        scope.inactiveElements.css("background", backgroundColor);
                    }
                });
            }
        });
    }
}
```

## Registro en el módulo

```javascript
import { CustomNavBarBackground } from "./directives/rkmCustomNavBarBackground.directive";

angular.module(...)
    .directive('rkmCustomNavBarBackground', () => new CustomNavBarBackground);
    // Las directivas que se definen con clases deben ser registradas instanciando la clase y no directamente con la clase.
```