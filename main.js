"use strict";

const fs = require("fs");
const movieDataParser = require("./utils/movieDataParser.js");
const outputBuilder = require("./utils/outputBuilder.js");

function cleanAndSplitData (data) {
  //remove all return characters then split string into array so that each line is an element
  return data.replace(/\r/g, "").split("\n");
}

function findStarsMovies (name, movieData) {
	//get the movieIds for all movies in which the star appeared
	const movieIds = movieData.starsMovieIds[name] || [];  //[0, 2, 3]

  //return array of the movie objects corresponding to those Ids
  //array is sorted by releaseYear oldest to most recent
  return movieIds.map((movieId) => {
    return movieData.movies[movieId];
  }).sort((a, b) => { return a.releaseYear - b.releaseYear });
}

function onMovieDataReceived (rawData, starName) {
  //clean data and get an array of all data separated by new line characters
  const flatMovieArray = cleanAndSplitData(rawData);
  
  //Parse the flat movie array to build two movie data objects:
  const movieData = movieDataParser.makeMovieDataObjects(flatMovieArray);

  //get array of matching movies based on the star's movie ids
  const matchingMovies = findStarsMovies(starName, movieData);

  //transform movie objects into formatted string
  const output = outputBuilder.getOutput(starName, matchingMovies);

  return output;
} 

function readMovieSource (file, name, onDataReceived, onOutputGenerated) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) throw err;
    const output = onDataReceived(data, name); //pass raw data and name to onMovieDataReceived
    onOutputGenerated(output);
  });
}


module.exports = {
  cleanAndSplitData,
  findStarsMovies,
  onMovieDataReceived,
  readMovieSource
}

