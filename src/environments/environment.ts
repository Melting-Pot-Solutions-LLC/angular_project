// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: 'AIzaSyBaVBgk0t6kqvr71CcsxXFjnNx26aGu7oY',
      authDomain: 'quoteliproj.firebaseapp.com',
      databaseURL: 'https://quoteliproj.firebaseio.com',
      projectId: 'quoteliproj',
      storageBucket: 'quoteliproj.appspot.com',
      messagingSenderId: '11703687479'
  }
};
