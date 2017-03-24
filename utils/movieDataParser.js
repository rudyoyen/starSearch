"use strict";

const labels = ["title", "releaseYear", "director", "starsList"];
const numOfLinesPerMovie = labels.length;
const numOfLinesBetweenMovies = 1;


//add stars and their movies (by movieIds) to the starsMovieIds object
function updateStarsMovieIds (stars, movieId, starsMovieIds) {
	for (let star of stars) {
		if (!starsMovieIds[star]) starsMovieIds[star] = [];	//create array for star if doesn't already exist
		starsMovieIds[star].push(movieId);	//push movie id into the star's array
	}
}

function createMovie (movieData, movieId, starsMovieIds) {
	const movie = {};

	labels.forEach((label, index) => {
		//if element is list of stars
		if (label === 'starsList') {
			//convert comma separated string to array
			movieData[index] = movieData[index].split(", "); 
			
			//add current movieId to the stars object
			updateStarsMovieIds(movieData[index], movieId, starsMovieIds);
		} 
		//add new property to movie object
		movie[label] = movieData[index];
	});

	return movie;
}

function makeMovieDataObjects (flatMovieData) {
	const starsMovieIds = {};
	const moviesObject = {};
	let movieId = 0;

	while (flatMovieData.length > 0) { //loop through entire flat data array
		//remove movie chunk, size of chunk is determined by number of labels
		let movieDataChunk = flatMovieData.splice(0, numOfLinesPerMovie);	
		
		//create movie object from movie chunk and store in the movies object based on the movieId
		moviesObject[movieId] = createMovie(movieDataChunk, movieId, starsMovieIds);	

		movieId++;	//increment for next movie object to be created

		//if we have an extra space between moviesObject, remove it from array before getting next chunk of data
		flatMovieData.splice(0, numOfLinesBetweenMovies);
	}

	return {
		movies: moviesObject,	//object of all movies where keys are movieIds and values are movie objects
		starsMovieIds: starsMovieIds	//map of the stars names and arrays of the movies they appeared in based on movieId
	};
}

module.exports = {
	updateStarsMovieIds,
	createMovie,
	makeMovieDataObjects
};