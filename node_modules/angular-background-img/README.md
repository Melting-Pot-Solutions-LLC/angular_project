# angular-background-image [![Build Status](https://travis-ci.org/Boyum/angular-background-image.svg?branch=master)](https://travis-ci.org/Boyum/angular-background-image)
A tiny (420 bytes) angular directive for dynamically setting an element's CSS background image.

## Installation
Fetch from [npm](https://www.npmjs.com/package/angular-background-img).
``` 
$ npm install angular-background-img
``` 

Add to your HTML (or build script or whatever). Remember to load it after angular itself.
```
<script type="text/javascript" src="./node_modules/angular/angular.min.js"></script>
<script type="text/javascript" src="./node_modules/angular-background-img/angular-background-img.min.js"></script>
```

Add to your app's dependency array
``` 
angular
  .module('my-module', [
    'sb-background-image'
  ]);
```


## Usage
```
<element sb-background-image="./cats.jpg"></element>
```

### Result
```
<element style="background-image: url(./cats.jpg);"></element> 
```

## Build
To build the app, run `npm run build`.

## License

MIT  
Copyright 2016 Sindre Bøyum
