---
title: "Let's explore Mapbox GL JS"
date: 2020-06-13
published: true
tags: ["web development", "spatial", "gis", "mapbox"]
canonical_url: false
description: "Mapbox GL JS is an awesome web mapping framework that uses WebGL under the hood."
---

[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) is a JavaScript library that uses WebGL to create interactive maps. Layers are built with vector tiles and Mapbox styles. Rendering runs with WebGL so it is fast, even with a ton of data.

I decided to start exploring Mapbox GL JS (I'm going to call it mapgoxgl from now on) over the last week for a project at work. I'm currently using Leaflet because of the Vue2-Leaflet library that integrates nicely with Vue. There are a few mapboxgl libraries for Vue, all at various stages of development. My favorite thing about the Vue2-Leaflet package is that it is very easy to interact with the Leaflet map using the `$L` binding. Going this route means using the methods defined in the Leaflet documentation. 

My knowledge of mapboxgl isn't as good as Leaflet. So I decided to get a hang of the library and build some cool stuff!

## Create a super simple sandbox

Let's create a sandbox to further explore the features of mapboxgl. [Clone this repo](https://github.com/kissmygritts/mapboxgl-sandbox) to get started. Then `cd` into the directory, run `npm install` (or yarn) the packages. Finally, `npm run start` to start the dev server.

I'm using ParcelJS as a bundler and dev server. Beware, there are a [few tricky bugs associated](https://github.com/parcel-bundler/parcel/issues/1128#issuecomment-497251288) with the mapboxgl library and how Parcel transpiles node modules in the directory. I've gotten around them by only supporting recent browsers. An easy decision since I am not going to be deploying this sandbox.

*Note that there are several branches in this git repo. This helps me refer back to earlier steps along the way when I come back to the code. If you're just starting out I recommend switching to the `basic-setup` branch*

## Our first map

Creating a map is pretty easy. A single html file will work.

```html
<html>
<head>
  <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js'></script>
  <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css' rel='stylesheet' />

  <style>
    /* set the style for a full screen map */
    html,
    body {
      height: 100%;
      margin: 0;
    }
  
    #map {
      height: 100vh;
    }
  </style>
</head>

<body>

  <div>
    <div></div>
    <div id="map"></div>
  </div>
  
  <script>
    mapboxgl.accessToken = 'your mapbox token'
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v10',
      center: [-116.77592011899117, 38.64954285997146],
      zoom: 6
    })
  </script>

</body>
</html>
```

I've setup the project to split out the CSS, HTML, and JavaScript in their own files. The gist is that the `main.css` file contians similar CSS as above. `index.html` has the HTML portion. And `index.js` has the script portion. The snippet above is nice because you can copy that into an HTML file and get started.

### The repo setup

Here are the files individually.

```html
<!-- index.html -->
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="main.css">
  </head>
  <body>
    <div id="map"></div>
    <script src="./index.js"></script>
  </body>
</html>
```

Nothing super interesting here. I'm not referencing the mapboxgl JavaScript or css in the head because I'll import that in the JavaScript file.

```js
// index.js
const mapboxgl = require('mapbox-gl')
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.MAPBOX_KEY

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-116.77592011899117, 38.64954285997146],
  zoom: 6
})

const nav = new mapboxgl.NavigationControl()
const scale = new mapboxgl.ScaleControl({
  unit: 'imperial'
})
const fullscreen = new mapboxgl.FullscreenControl()

map.addControl(nav, 'top-left')
map.addControl(scale, 'bottom-left')
map.addControl(fullscreen, 'top-left')
```

Parcel provides a few nice utilities (all by default) to import CSS styles and `dotenv`. I'm importing the mapboxgl JavaScript and CSS here. I probably could have used `import mapboxgl from 'mapbox'` but I didn't .

I'm using a `.env` file to read my mapbox API key and insert it into this file. All that is needed is the following in the file: `MAPBOX_KEY=yourreallylongaccesskeygoesherejustlikethis`

Finally, the CSS. Again nothing too special. I've started it out with a simple CSS reset.

```css
/* main.css */
html {
  box-sizing: border-box;
  font-size: 16px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

#map {
  height: 100vh;
  width: 100vw;
  background-color: springgreen;
}
```

Once all these files are in place run `npx parcel index.js` (add this to the start script in the `package.json`, then run with `npm run start`). Hopefull you'll get something that looks like this.

<iframe
     src="https://codesandbox.io/embed/mapboxgl-basics-9z3iy?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="mapboxgl-basics"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Go ahead an play around with that map.

## And now the fun (frustration) begins

The mapboxgl library seems huge. Not only is it the JavaScript library, but their styles that you have to learn. Each class in the library has tons of methods, or events, etc. It is a comprehensive mapping library after all. I've hit many stumbling blocks along the way.

My biggest advice moving forward is to read the documentation. Don't just look at the examples and copy the code. And when trying the examples actually type the code in, don't copy and paste.

### Mouse coordinates

I like to know where my mouse is when hovering over a map. It might not be super userful, but it's a fun experiment. You can look at the [`mouse-coords` branch](https://github.com/kissmygritts/mapboxgl-sandbox/tree/mouse-coords) to see how that is done. The biggest takeaway is to use the `map.on` listener/method (I don't know what it is... TODO for me I guess) to respond to `mousemove` events.

```js
// index.js
// ... other code
map.on('mousemove', (e) => {
  const { lng, lat } = e.lngLat

  document.getElementById('long').innerHTML = Math.round(lng * 10000) / 10000
  document.getElementById('lat').innerHTML = Math.round(lat * 10000) / 10000
})
```

Now everytime the mouse moves an event fires with the coordinates of the mouse in the `e.lngLat` property. Then set the longitude and latitude of some DOM element. I've rounded the values to the nearest thousandths place as that is something we frequently do at work. 

This example is pretty much directly [from the documentation](https://docs.mapbox.com/mapbox-gl-js/example/mouse-position/).

### Toggle layers

Another feature of web maps is the ability to toggle layers on and off. This is very common in desktop GIS system, as well as many web maps (GAIA GPS, CalTopo, OnX). Getting a single layer to toggle on and off is pretty straight forward (and [straight from the documentation](https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/)). Check the [`layer-toggle` branch](https://github.com/kissmygritts/mapboxgl-sandbox/tree/layer-toggle) for more details. 

I suppose the biggest pain is trying to do this with vanilla JavaScript. I'll admit I'm one of those people that jumped straight into a framework without a great understanding of vanilla JavaScript. Or, at least not working with the DOM. My JavaScript knowledge came from working with Node building a few APIs. 

## Wrap up

A few more interesting feature ideas to work on

* Turn multiple layers on and off
* Alter the opacity of layers when there are many layers loaded
* Style points based on attribute data
* Draw on the map
* The possibilities are endless

Ultimately, I'm working on rounding out my knowledge of mapboxgl, and vanilla JavaScript, before applying all that knowledge within a framework like Vue (or Svelte. Svelte seems awesome). Needless to say there is a lot to learn!