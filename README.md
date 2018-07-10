# fast-assets
Scripts and Stylesheets for Form.io Projects

## Usage

Create a hidden component with the following default value (JavaScript)

```js
const scripts = ['base.min.js'];
const styles = ['base.min.css'];
const head = document.getElementsByTagName('head')[0];

scripts.forEach(function(file) {
  const script = document.createElement('script');
  script.src = `https://fast-assets.surge.sh/js/${file}`;
  head.appendChild(script);
});

styles.forEach(function(file) {
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = `https://fast-assets.surge.sh/css/${file}`;
  head.appendChild(style);
});
```

## Functions

The following are a collection of available functions.  Once the scripts are loaded, you may call these functions using custom javascript (either using default value, calculated value or custom button events).

### getLocation()

Returns the latitude and longitude reported by the browser's navigator Geolocation Web API.

```js
getLocation().then(function(pos) {
  // do something...
}).catch(function(err) {
  // handle navigator errors
});
```

### takeScreenshot(config)

Returns the screenshot file object using the browser's navigator MediaDevice Web API

```js
takeScreenshot().then(function(file) {
  // do something
}).catch(function(err) {
  // handle navigator errors
});
```

You can pass an optional configuration object to change some of the default settings

| Property    	| Description                                         	| Type   	| Default           	|
|-------------	|-----------------------------------------------------	|--------	|-------------------	|
| message     	| The dialog message                                  	| String 	| 'Take Screenshot' 	|
| options     	| The dialog options                                  	| Object 	| {}                	|
| placeholder 	| The image placeholder to use for blank image        	| String 	| ''                	|
| width       	| The width (in pixels) to save the screenshot image  	| Number 	| 400               	|
| heigth      	| The height (in pixels) to save the screenshot image 	| Number 	| 300               	|