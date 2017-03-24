"use strict";

function getMovieTemplate(m) {
	//Extremely ugly dedenting! This is unfortunately the only way to have it print correctly
	//without using a third party library or using a an ugly polyfill of sorts
	return `Title: ${m.title} (${m.releaseYear})
Directed By: ${m.director}
Also Starring: ${m.starsList}`;
}

function getOtherStarsString (star, starsList) {
	//remove current star from list of stars
	starsList.splice(starsList.indexOf(star), 1);

	//reduce array to string separated by commas
	return starsList.reduce((otherStars, currentStar) => {
			return otherStars +  ", " + currentStar;
	});
}

function getOutput (starName, movies) {
	//create header 
	const s = movies.length !== 1 ? "s" : "";
	const header = `${movies.length} Movie${s} Featuring ${starName}`;
	
	//create results body, loop through each movie and append to body
	let body = '';
	for (let movie of movies) {
		movie.starsList = getOtherStarsString(starName, movie.starsList);
		body += '\n\n' + getMovieTemplate(movie);				
	}
	
	return header + body;
}

module.exports = {
	getOutput
};

