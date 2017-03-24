"use strict";

const main = require("./main.js");
const fileName = "./data/movies.txt";
const firstName = process.argv[2] || "";
const lastName = process.argv[3] || "";
const starName = lastName === "" ? firstName : firstName + " " + lastName;

function onOutputGenerated (output) {
	console.log(output);
}

function start () {
  if (starName === "") {
    console.log("Please provide a name to search");
    return; 
  }
  main.readMovieSource(fileName, starName, main.onMovieDataReceived, onOutputGenerated);
}

start();
