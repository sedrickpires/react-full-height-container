# React full container height

A react component for creating a container which extends to the bottom of a page. Created for creating full height containers in complex layouts where using 'vh' or flex does not solve the problem.

## Installation
### via npm
```
$ npm install react-full-container-height
```
### Include in project
```
import ReactFullHeight from 'react-full-container-height';
```
### Usage
```
render(){
    return(
        <div className="container">
            <ReactFullHeight>
                // Include your components or code here..
            </ReactFullHeight>
        </div>
    )
}    
```

## Options

| Param | Description | Type | Default value
| ------ | ------ | ------ | ------ |
| marginBottom | Add a bottom margin to the container. | number | 0
| disabled | Whether to disabled the full height caculation. | boolean | false
| onInit | A callback function returning the height when first calculated. | function(height) | -
| onChange | A callback function executed every time the container height changes. Container height would change on page resize. | function(height) | -
| dynamicHeight | Whether to re-calculate the container height on every render. | boolean | false
| delay | Duration to wait before re-calculation of container height. | milliseconds | 0


License
----

MIT




