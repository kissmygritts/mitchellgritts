---
title: Web Mapping, Intro
date: 2019-06-14
published: true
tags: ['gis', 'leaflet', 'maps']
canonical_url: true
description: 'An introduction to web mapping'
---

Web maps. Web maps are everywhere! They provide great visualizations of geospatial information, and are easy for users to understand. Web maps are dynamic maps powered by the web. These are different than digital maps, or just images of a map (the former lives on a computer and isn't accessible through the internet, and the former is static). Web maps are interactive, users can pan around the globe, zoom in or out, or even choose between several layers to display.

I don't know about you, but I open Google Maps at least once a day. The good news, creating web maps is easy. However, there is a bit of technical knowledge required to get started. If you are a web developer getting started will be easy. If you are coming from a data analaysis background it will be a little more difficult (but worth it).

I plan on writing a series of posts introducing web maps. This is mostly for my own benefit as I learn as much as I can about web mapping. In the spirit of contributing to the community I will be sharing my experiences. Hopefully a few others find this useful. All the code will be available [on GitHub](https://github.com/kissmygritts/web-mapping).

## Getting started with Leaflet

Leaflet is perhaps one of the most widely used JavaScript libraries for web mapping. It's lightweight, simple, and flexible. Leaflet isn't the only option out there, and I hope to get to some of the others, but it is the one I am most familiar with. The best introduction to Leaflet is from [Maptime Boston](http://maptimeboston.github.io/leaflet-intro/). You should definitely complete the Maptime Boston tutorial. In the rest of this post we will set up a simple HTTP server, talk about navigating the server, then build a simple leaflet map.

## A simple Leaflet map

A simple interactive Leaflet map has a few requirements:

1. An HTML page
2. Leaflet JavaScript library
3. Leaflet CSS Stylesheet
4. A `div` element for the map
5. A height for the map `div`
6. A script to generate the map

The HTML below will create a simple web map with Leaflet.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Simple Leaflet Map</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- load the Leaflet library and stylesheet -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"></script>

  <style>
    html, body {
      height: 100%;
      margin: 0;
    }

    /* give the map container a height */
    #map {
      height: 100vh;
    }
  </style>
</head>
<body>
  
  <div id="map"></div>


  <script>
    // initialize the map
    var map = L.map('map').setView([39.55, -117.0667], 8)

    // load tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map)
  </script>
</body>
</html>
```

Let's focus on the code within the `script` tag. 

1. Created a variable called `map`
2. Used `L.map()` to initialize the map object, we used the ID of the map element `div`
3. `setView()` to initialize the view of the map. In this case centered around Nevada
4. `L.tileLayer()` to create a baselayer of map tiles. The URL template using an `{z}/{x}/{y}` template that Leaflet uses to find the correct tiles
5. Added the tiles from the tile layer with `addTo()`

Save the file as `index.html`, then open it in a browser. You should see a map centered on Nevada. 

### Serve over an HTTP server

In future posts we will need to load data onto the map from local files. The best way I've found to do this is to create a simple HTTP file server. Almost every computer I've used has Python installed. Python comes with a simple HTTP server utility. In order to launch the server open your terminal or command line interface, change directories to the directory that contains your `index.html` file we created above. If you cloned the GitHub repo, go into the base directory. Below is the directory structure (again, if you cloned the GitHub repo, yours will look similar).

```bash
.
├── data
│   └── nv-hunt-units.geojson
├── leaflet-basics
│   └── index.html
└── leaflet-intro
    └── index.html
```

Now run this command to launch an HTTP server, `python -m SimpleHTTPServer 9000`. I want the server to run on port 9000, which is what the 9000 means in the command. Now, if you navigate to the URL `http://localhost:9000/leaflet-intro` you'll see the map as if we opened the `index.html` in our browser. The server autmatically renders the file `index.html`.

Let's say we create a second HTML file, `imagery.html`, we can navigate with the following URL, `https://localhost:9000/leaflet-intro/imagery.html`. The general pattern here is everything after the 9000 in the URL is either a folder or file. If it is a folder with an `index.html` that html file will be rendered by default (like `http://localhost:9000/leaflet-intro`). If there is another file you want to use (html or other extension) you'll need to use the extension. 

## Add data to the map

Now, let's add some data to the map. The easiest way to add data to a map is by using an array of geographic coordinates. In the `leaflet-intro/index.html` file change the script portion to match the following.

```html
<script>
  // initialize the map
  const map = L.map('map').setView([39.55, -117.0667], 8)

  // load tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map)

  // add marker
  const marker = L.marker([39.55, -117.0667]).addTo(map)

  // add line
  const line = L.polyline([
    [39.55, -117.0667],
    [39.80, -117.25],
    [40.01, -118.1]
  ], { color: 'purple' }).addTo(map)

  // add polygon
  const poly = L.polygon([
    [39.55, -117.0667],
    [37.55, -116.00],
    [38, -115]
  ], { color: 'red' }).addTo(map)
</script>
```

There are many other layers that can be added to the map. I'll leave it to you to look at the [documentation](https://leafletjs.com/reference-1.5.0.html#polyline) and figure out how to add them to the map.

## Wrap up

There you have it. The very basics of creating a map, and adding some data to the map. As I mentioned earlier, you should definetly check the [Maptime Boston](http://maptimeboston.github.io/leaflet-intro/) tutorial. It goes into more detail for the basics.

If you have any questions, comments, or corrections please create an issue at the [GitHub repo](https://github.com/kissmygritts/web-mapping).