Rent A Car
==========

## What is it?
In Singapore where cars cost more than a fortune, Rent-A-Car seeks to allow people to earn some money from their personal vehicles to offset for the high cost of maintaining it. Typical usage of a private vehicle goes something like this: drive to work, park at office, work for 6 hours and drive home. More than half the time, the vehicles are left unused. Rent-A-Car hopes to connect people with ad-hoc need for cars and owners of vehicles! 

## Technologies Used
A large variety of open source softwares/tools have been used in building this application. They can be broadly categorized into developer tools, front-end libraries, back-end libraries, third-party APIs and hosting platforms.

## Developer Tools

### Bower
Quoted from Bower's project: "Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack."

Midway of building this project, I've realized that I needed a better way to manage all the external Javascript libraries that I am using. Bower was the solution to all these. It allows me to quickly import in an external library such as Twitter Boostrap and AngularFire. 

[Link to Bower Github Repo](https://github.com/bower/bower)

## Front-end Libraries

### AngularJS
The application is built mainly on the AngularJS framework. In particular, I felt that the use of directives for DOM manipulation to be really refreshing. It had helped improved code re-usability.

[Link to AngularJS' Directive Documentationn](http://docs.angularjs.org/guide/directive)

### Twitter Bootstrap
Popular frontend responsive framework with many great components. Needs no introduction. 

[Link to Twitter Bootstrap](http://getbootstrap.com/)

### Leaflet.js
Leaflet is a modern open-source JavaScript library for building mobile-friendly interactive maps. All the maps in this application were drawn with the use of this library.

[Link to Leaflet.js](http://leafletjs.com/)

## Back-end Libraries

### Node.js with Express Middleware
In a bid to stick to using just one language for the whole application, I have decided on using Node.js with Express to build my web-server. It was interesting to learn about non-blocking IO. Preliminary research online has praised Node.js for its performance benefits, but there isn't enough traffic to my application for me to make a judgment on this.

[Link to Node.js](http://nodejs.org/)

[Link to Express](http://expressjs.com/)

## Third Party APIs

### CloudMade Map Tiles
CloudMade is a company that provides geo-related APIs. Their services includes, map tiles, geocoding and routing. Specifically, I made use of their map tiles as it allows me to style the maps to my own liking! :D

_Initially, I wanted to use their geocoding API too, but I keep running into issues with CORS despite me setting the appropriate headers already. If anyone can shed some light on this, it will be greatly appreciated..._

[Link to CloudMade](http://cloudmade.com/)

### 