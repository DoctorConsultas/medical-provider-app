# MedicalProviderApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.





Despliegue
`https://docs.google.com/document/d/1Zy6-83G1DR7YxM7MS5mYrNfvNxblda8SUzCi3Y234fo/edit`

# Listar las imágenes almacenadas en tu Docker Registry desde una máquina local
```az acr repository list --name adaazureregistry --output table```
```az acr repository show-tags --name adaazureregistry --repository medical-provider-app --output table```

# VPN down

# build image
docker build -t medical-provider-app .

# VPN up

# Tag
docker tag medical-provider-app:latest medical-provider-app:1.0.0


# docker run local
docker run -d --name medical-provider-app -p 4200:80 -t medical-provider-app

# docker run develop
docker run -d --name medical-provider-app -p 4200:80 -e API_URL='http://prestadores.recetalia.com:8080' -t medical-provider-app

# push to registry
docker push medical-provider-app

##### docker run consuming a different api than api Url: 'http://localhost:8060'
docker run -d --name medical-provider-app -p 4200:80 -e API_URL='(ip recetalia-api-rest)' -t medical-provider-app