var express = require("express");
const fs = require("fs");
var cors = require("cors");
var app = express();
const path = require("path");
const pathToDate = "./date.json";
const dates = [];
console.log(dates);
var data = require("./data.json");

app.use(cors());
app.use(express.urlencoded({
  extended: true
}));

app.get("/date", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index3.html"));
});

app.get("/url", (req, res) => {
  res.json(data);
});


app.post("/date/", (req, res, next) => {
  const date = req.body;
  // Output the book to the console for debugging
  console.log(date);
  dates.push(date);
  //res.send('Date is added to the database');
  const dateJSON = JSON.stringify(date, null, 4);
  fs.writeFile("date.json", dateJSON, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON date is saved.");
    planets_now(date);
    res.sendFile(path.join(__dirname, "public", "index3.html"));
  });

  // Add Access Control Allow Origin headers
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Content-Type, application/json"
    );
    next();
  });
});
//app.use(express.static("public"));

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});

// HERE STARTS THE FUNCTION
//==========================

var date = new Date();
var datezz = require("./date.json").date;
var date = new Date(datezz);

console.log("updated date zz:", datezz);

import {
  createTimeOfInterest
} from "astronomy-bundle/time";
import {
  createEarth
} from "astronomy-bundle/earth";
import {
  createMercury,
  createVenus,
  createMars,
  createJupiter,
  createSaturn,
  createNeptune,
} from "astronomy-bundle/planets";

//=======================================================

async function planets_now() {
  const toi = createTimeOfInterest.fromDate(date);
  let mercury = createMercury(toi);
  let venus = createVenus(toi);
  let earth = createEarth(toi);
  let mars = createMars(toi);
  let jupiter = createJupiter(toi);
  let saturn = createSaturn(toi);
  let neptune = createNeptune(toi);

  let positionme =
    await mercury.getHeliocentricEclipticSphericalJ2000Coordinates();
  let positionve =
    await venus.getHeliocentricEclipticSphericalJ2000Coordinates();
  let positionea =
    await earth.getHeliocentricEclipticSphericalJ2000Coordinates();
  let positionma =
    await mars.getHeliocentricEclipticSphericalJ2000Coordinates();
  let positionju =
    await jupiter.getHeliocentricEclipticSphericalJ2000Coordinates();
  let positionsa =
    await saturn.getHeliocentricEclipticSphericalJ2000Coordinates();
  let positionne =
    await neptune.getHeliocentricEclipticSphericalJ2000Coordinates();

  const dme = await mercury.getDistanceToEarth();
  const dve = await venus.getDistanceToEarth();
  const dma = await mars.getDistanceToEarth();
  const dju = await jupiter.getDistanceToEarth();
  const dsa = await saturn.getDistanceToEarth();
  const dne = await neptune.getDistanceToEarth();

  console.log(
    "Mercury position as seen from the Sun now:",
    "longitude:",
    positionme.lon,
    "distance in astronomical units:",
    positionme.radiusVector,
    "distance from Earth:",
    dme,
    "km"
  );
  console.log(
    "Venus position as seen from the Sun now:",
    "longitude:",
    positionve.lon,
    "distance in astronomical units:",
    positionve.radiusVector,
    "distance from Earth:",
    dve,
    "km"
  );
  console.log(
    "Earth position as seen from the Sun now:",
    "longitude:",
    positionea.lon,
    "distance in astronomical units:",
    positionea.radiusVector
  );
  console.log(
    "Mars position as seen from the Sun now:",
    "longitude:",
    positionma.lon,
    "distance in astronomical units:",
    positionma.radiusVector,
    "distance from Earth:",
    dma,
    "km"
  );
  console.log(
    "Jupiter position as seen from the Sun now:",
    "longitude:",
    positionju.lon,
    "distance in astronomical units:",
    positionju.radiusVector,
    "distance from Earth:",
    dju,
    "km"
  );
  console.log(
    "Saturn position as seen from the Sun now:",
    "longitude:",
    positionsa.lon,
    "distance in astronomical units:",
    positionsa.radiusVector,
    "distance from Earth:",
    dsa,
    "km"
  );
  console.log(
    "Neptune position as seen from the Sun now:",
    "longitude:",
    positionne.lon,
    "distance in astronomical units:",
    positionne.radiusVector,
    "distance from Earth:",
    dne,
    "km"
  );

  const data = {
    mercury: positionme,
    venus: positionve,
    earth: positionea,
    mars: positionma,
    jupiter: positionju,
    saturn: positionsa,
    neptune: positionne,
  };
  const data2 = [
    positionme.lon,
    positionve.lon,
    positionea.lon,
    positionma.lon,
    positionju.lon,
    positionsa.lon,
    positionne.lon,
  ];

  const mean_lon =
    (positionme.lon +
      positionve.lon +
      positionea.lon +
      positionma.lon +
      positionju.lon +
      positionsa.lon +
      positionne.lon) /
    7;
  console.log("mean longitude: ", mean_lon);

  const dataJSON = JSON.stringify(data, null, 4);
  fs.writeFile("data.json", dataJSON, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}
//planets_now();