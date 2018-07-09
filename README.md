# fast-assets
Scripts and Stylesheets for Form.io Projects

### Usage

Create a hidden component with the following default value (JavaScript)

```js
const scripts = ['common/js/formio.min.js'];
const styles = ['common/css/formio.min.css'];
const head = document.getElementsByTagName('head')[0];

scripts.forEach(function(path) {
  const script = document.createElement('script');
  script.src = `https://fast-assets.surge.sh/${path}`;
  head.appendChild(script);
});

styles.forEach(function(path) {
  const style = document.createElement('script');
  style.href = `https://fast-assets.surge.sh/${path}`;
  head.appendChild(style);
});
```