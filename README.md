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

Returns the latitude and longitude reported by the browser's navigator Web API.

```js
getLocation().then(function(pos) {
  // do something...
}).catch(function(err) {
  // handle navigator errors
});
```