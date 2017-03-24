## Installation

### Install Node and npm
In order to run this script from the command line you will need Node and npm. If you do not have Node already installed, you can download it from [here](). A version of npm is installed automatically with Node but if you would like to ensure you have the latest version of npm you can follow the instructions [here]().

### Install Mocha
This script uses Mocha for automated unit testing. If you do not have Mocha installed, run `npm install` from the root directory of this project before running the tests. 


## Run the program
To run the program, enter into the command line `node movies.js [star name]`. For example: `node movies.js Tom Hanks`.


## Run the tests
To run the tests, enter into the command line `npm test`.

## Notes
We use two data structures to help us find the results quickly:

1. Movies Object - As we parse the data from the file, we create an object for each movie, such as:

		movie = {
			title: "Ocean's Eleven",
			yearReleased: "2001",
			director: "Steven Soderbergh",
			starsList: ["George Clooney", "Brad Pitt", "Matt Damon"]
		};

	Each movie is then stored in the movies object by it's movieId, so movie object ends up looking like:
   
	    movies = {           
	      0: {title: "Ocean's Eleven", releaseYear: "2001", ... },
	      1: {title: "Star Wars: Episode IV - A New Hope", releaseYear: "1977", ... },
	      ...
	    };

2. Stars MovieId Map - As we parse the data from the file, we also create an object to store each star's movies using the movieId. So the stars movieID map will look like: 
    
		starsMovieIds = {    
		  "George Clooney": [0],
		  "Brad Pitt": [0],
		  "Matt Damon": [0, 2, 3],
		  "Mark Hamill": [1]
		  ...
		};

We create the second object so that when we want to look up what movies an actor has appeared in there is no iteration. We get the movieId's out of the Stars MovieId Map and then get the movies out of the Movies Object based on the movieId.



