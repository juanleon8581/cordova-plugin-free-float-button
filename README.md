# free-float-button-js

This is a simple library made with the intention to give freedom of movement to a button on the screen, it works with any html element.
To use it you must do the following:

### **Installation**

```bash
cordova plugin add free-float-button
```

### Params

elm --> html element to which the movement will be given.
zIndex --> z-index value that the button will have as needed.
corner --> false or true, it is responsible for setting the parameterization of the button cornering on the X axis

### how to use?

```jsx
let elm = document.getElementById('anyid')
let zIndex = 1000
let anyVar = new cordova.plugins.freeFloatButton.FloatFreeButton(elm,zIndex,true)
anyVar.goMoveIt(anyVar)
```