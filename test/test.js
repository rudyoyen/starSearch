const assert = require('assert');
const utils = require('./testSampleData.js');
const main = require('../main.js');
const movieDataParser = require('../utils/movieDataParser.js');
const outputBuilder = require('../utils/outputBuilder.js');
const sourceFile = "./data/movies.txt"


describe('main.js', function() {
	describe('readMovieSource', function() {
  	let fileSuccessfullyRead = false;
  	let actualRawData;
  	let actualName;
  	let expectedName = "starName";

  	before(function (done) {
  		function onDataReceived (data, name) {
  			fileSuccessfullyRead = true;
  			actualRawData = data;
  			actualName = name;
  			done();
  		}
  		function onOutput () {}
  		main.readMovieSource(sourceFile, expectedName, onDataReceived, onOutput);
  	});
  		
    it('should read the source file without error', function() { 
	   	assert.equal(fileSuccessfullyRead, true);
    });
    it('should pass the correct raw data to the callback', function() { 
    	const expectedRawData = utils.rawData;
	   	assert.equal(actualRawData, expectedRawData);
    });
    it('should pass the correct star name to the callback', function() { 
	   	assert.equal(actualName, expectedName);
    });
  });

  describe('findStarsMovies', function () {
  	it('should return empty array if no movies match', function() { 
    	const actualOutput = main.findStarsMovies("badName", utils.moviesData).length;
    	const expectedOutput = 0;
	   	assert.equal(actualOutput, expectedOutput);
    });
    it('should return an array with one element if there is one matching movie', function() { 
    	const actualOutput = main.findStarsMovies("George Clooney", utils.moviesData).length;
    	const expectedOutput = 1;
	   	assert.equal(actualOutput, expectedOutput);
    });
    it('should return an array with at least one element if there is more than one matching movie', function() { 
    	const actualOutput = main.findStarsMovies("Matt Damon", utils.moviesData).length;
    	const expectedOutput = 3;
	   	assert.equal(actualOutput, expectedOutput);
    });
  });

  describe('onMovieDataReceived', function() {
    it('should correctly return results for a star with three movies', function() { 
    	const starName = "Matt Damon";
    	const actualOutput = main.onMovieDataReceived(utils.rawData, starName);
    	const expectedOutput = utils.output[starName];
	   	assert.equal(actualOutput, expectedOutput);
    });
    it('should correctly return results for a star with two movies', function() { 
    	const starName = "Tom Hanks";
    	const actualOutput = main.onMovieDataReceived(utils.rawData, starName);
    	const expectedOutput = utils.output[starName];
	   	assert.equal(actualOutput, expectedOutput);
    });
    it('should correctly return results for a star with one movie', function() { 
    	const starName = "Carrie Fisher";
    	const actualOutput = main.onMovieDataReceived(utils.rawData, starName);
    	const expectedOutput = utils.output[starName];
	   	assert.equal(actualOutput, expectedOutput);
    });
		it('should correctly return results for a star with one word name and no movies', function() { 
    	const starName = "oneWrongName";
    	const actualOutput = main.onMovieDataReceived(utils.rawData, starName);
    	const expectedOutput = "0 Movies Featuring oneWrongName";
	   	assert.equal(actualOutput, expectedOutput);
    });    
  });
});

describe('movieDataParser.js', function() {	
	describe('updateStarsMovieIds', function() {
		const starsMovieIds = {};
		movieDataParser.updateStarsMovieIds([ 'George Clooney', 'Brad Pitt', 'Matt Damon' ], 0, starsMovieIds);
    
    it('should add new star property starsMovieIds if star is not already included', function() {     
      const actual = Object.keys(starsMovieIds).length;
      const expected = 3;
      assert.equal(actual, expected);
    });
    it('should add another movie id to a star\'s existing movie ids array', function() {
    	movieDataParser.updateStarsMovieIds([ 'Matt Damon' ], 1, starsMovieIds);
      const actual = Object.keys(starsMovieIds['Matt Damon']).length;
      const expected = 2;
      assert.equal(actual, expected);
    });
  });

	describe('makeMovieDataObjects', function () {
		const movieData = movieDataParser.makeMovieDataObjects(utils.flatMovieData);
		it('should return a defined object', function () {
			const actual = movieData != undefined;
			const expected = true;
			assert.equal(actual, expected);
		});
		it('should have a movies property', function () {
			const actual = movieData.movies != undefined;
			const expected = true;
			assert.equal(actual, expected);
		});
		it('should have a movie with a title property', function () {
			const actual = movieData.movies[0].title != undefined;
			const expected = true;
			assert.equal(actual, expected);
		});
		it('should have a movie with a releaseYear property', function () {
			const actual = movieData.movies[0].releaseYear != undefined;
			const expected = true;
			assert.equal(actual, expected);
		});
		it('should have a movie with a director property', function () {
			const actual = movieData.movies[0].director != undefined;
			const expected = true;
			assert.equal(actual, expected);
		});
		it('should have a movie with a starsList property', function () {
			const actual = movieData.movies[0].starsList != undefined;
			const expected = true;
			assert.equal(actual, expected);
		});
		it('should have a starsMovieIds property', function () {
			const actual = movieData.starsMovieIds != undefined;
			const expected = true;
			assert.equal(actual, expected);
		});
		it('should have a star with a movieId array property', function () {
			const actual = Array.isArray(movieData.starsMovieIds["George Clooney"]);
			const expected = true;
			assert.equal(actual, expected);
		});
	});
});

describe('outputBuilder.js', function() {
	describe('getOutput', function() {		
    it('should return correctly formatted results for three movies', function() { 
    	const starName = "Matt Damon";   
      const actual = outputBuilder.getOutput(starName, utils.matchingMovies[starName]); 
      const expected = utils.output[starName];
      assert.equal(actual, expected);
    });
    it('should return correctly formatted results for two movies', function() { 
    	const starName = "Tom Hanks";   
      const actual = outputBuilder.getOutput(starName, utils.matchingMovies[starName]); 
      const expected = utils.output[starName];
      assert.equal(actual, expected);
    });
    it('should return correctly formatted results for one movie', function() { 
    	const starName = "Carrie Fisher";   
      const actual = outputBuilder.getOutput(starName, utils.matchingMovies[starName]); 
      const expected = utils.output[starName];
      assert.equal(actual, expected);
    });
  	it('should return correctly formatted results for zero movies', function() { 
    	const starName = "no name";   
      const actual = outputBuilder.getOutput(starName, []); 
      const expected = "0 Movies Featuring no name";
      assert.equal(actual, expected);
    });
  });
});