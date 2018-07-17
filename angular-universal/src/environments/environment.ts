// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDUOWIa9_uM2ez4inGji_rM4jcQh9T7Q3A",
    authDomain: "auth.viviendapp.co",
    databaseURL: "https://viviendapp-c3907.firebaseio.com",
    projectId: "viviendapp-c3907",
    storageBucket: "viviendapp-c3907.appspot.com",
    messagingSenderId: "1091906989597"
  }
};
