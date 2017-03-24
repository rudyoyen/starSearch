const rawData = `Ocean's Eleven
2001
Steven Soderbergh
George Clooney, Brad Pitt, Matt Damon

Star Wars: Episode IV - A New Hope
1977
George Lucas
Mark Hamill, Harrison Ford, Carrie Fisher

Good Will Hunting
1997
Gus Van Sant
Matt Damon, Robin Williams, Ben Affleck

Saving Private Ryan
1998
Steven Spielberg
Tom Hanks, Matt Damon, Tom Sizemore

The Lord of the Rings: The Fellowship of the Ring
2001
Peter Jackson
Elijah Wood, Ian McKellen, Orlando Bloom

Forrest Gump
1994
Robert Zemeckis
Robin Wright, Tom Hanks, Gary Sinise
`;


const flatMovieData = [ 'Ocean\'s Eleven',
  '2001',
  'Steven Soderbergh',
  'George Clooney, Brad Pitt, Matt Damon',
  '',
  'Star Wars: Episode IV - A New Hope',
  '1977',
  'George Lucas',
  'Mark Hamill, Harrison Ford, Carrie Fisher',
  '',
  'Good Will Hunting',
  '1997',
  'Gus Van Sant',
  'Matt Damon, Robin Williams, Ben Affleck',
  '',
  'Saving Private Ryan',
  '1998',
  'Steven Spielberg',
  'Tom Hanks, Matt Damon, Tom Sizemore',
  '',
  'The Lord of the Rings: The Fellowship of the Ring',
  '2001',
  'Peter Jackson',
  'Elijah Wood, Ian McKellen, Orlando Bloom',
  '',
  'Forrest Gump',
  '1994',
  'Robert Zemeckis',
  'Robin Wright, Tom Hanks, Gary Sinise',
  '' 
];


const moviesData = {
	"movies": { '0': 
	  { title: 'Ocean\'s Eleven',
	    releaseYear: '2001',
	    director: 'Steven Soderbergh',
	    starsList: [ 'George Clooney', 'Brad Pitt', 'Matt Damon' ] },
  	'1': 
	  { title: 'Star Wars: Episode IV - A New Hope',
	     releaseYear: '1977',
	     director: 'George Lucas',
	     starsList: [ 'Mark Hamill', 'Harrison Ford', 'Carrie Fisher' ] },
	  '2': 
	  { title: 'Good Will Hunting',
	     releaseYear: '1997',
	     director: 'Gus Van Sant',
	     starsList: [ 'Matt Damon', 'Robin Williams', 'Ben Affleck' ] },
	  '3': 
	  { title: 'Saving Private Ryan',
	     releaseYear: '1998',
	     director: 'Steven Spielberg',
	     starsList: [ 'Tom Hanks', 'Matt Damon', 'Tom Sizemore' ] },
	  '4': 
	  { title: 'The Lord of the Rings: The Fellowship of the Ring',
	     releaseYear: '2001',
	     director: 'Peter Jackson',
	     starsList: [ 'Elijah Wood', 'Ian McKellen', 'Orlando Bloom' ] },
	  '5': 
	  { title: 'Forrest Gump',
	     releaseYear: '1994',
	     director: 'Robert Zemeckis',
	     starsList: [ 'Robin Wright', 'Tom Hanks', 'Gary Sinise' ] } 
  },
	"starsMovieIds": { 'George Clooney': [ 0 ],
	  'Brad Pitt': [ 0 ],
	  'Matt Damon': [ 0, 2, 3 ],
	  'Mark Hamill': [ 1 ],
	  'Harrison Ford': [ 1 ],
	  'Carrie Fisher': [ 1 ],
	  'Robin Williams': [ 2 ],
	  'Ben Affleck': [ 2 ],
	  'Tom Hanks': [ 3, 5 ],
	  'Tom Sizemore': [ 3 ],
	  'Elijah Wood': [ 4 ],
	  'Ian McKellen': [ 4 ],
	  'Orlando Bloom': [ 4 ],
	  'Robin Wright': [ 5 ],
	  'Gary Sinise': [ 5 ] 
	}
};



const mattDamonMatchingMovies = [ { title: 'Good Will Hunting',
    releaseYear: '1997',
    director: 'Gus Van Sant',
    starsList: [ 'Matt Damon', 'Robin Williams', 'Ben Affleck' ] },
  { title: 'Saving Private Ryan',
    releaseYear: '1998',
    director: 'Steven Spielberg',
    starsList: [ 'Tom Hanks', 'Matt Damon', 'Tom Sizemore' ] }, 
  { title: 'Ocean\'s Eleven',
    releaseYear: '2001',
    director: 'Steven Soderbergh',
    starsList: [ 'George Clooney', 'Brad Pitt', 'Matt Damon' ] } ];

const tomHanksMatchingMovies = [ { title: 'Forrest Gump',
    releaseYear: '1994',
    director: 'Robert Zemeckis',
    starsList: [ 'Robin Wright', 'Tom Hanks', 'Gary Sinise' ] },
  { title: 'Saving Private Ryan',
    releaseYear: '1998',
    director: 'Steven Spielberg',
    starsList: [ 'Tom Hanks', 'Matt Damon', 'Tom Sizemore' ] } ];

const carrieFisherMatchingMovies = [ { title: 'Star Wars: Episode IV - A New Hope',
    releaseYear: '1977',
    director: 'George Lucas',
    starsList: [ 'Mark Hamill', 'Harrison Ford', 'Carrie Fisher' ] } ];

const matchingMovies = {
	"Matt Damon": mattDamonMatchingMovies,
	"Tom Hanks": tomHanksMatchingMovies,
	"Carrie Fisher": carrieFisherMatchingMovies
};

const mattDamonOutput = `3 Movies Featuring Matt Damon

Title: Good Will Hunting (1997)
Directed By: Gus Van Sant
Also Starring: Robin Williams, Ben Affleck

Title: Saving Private Ryan (1998)
Directed By: Steven Spielberg
Also Starring: Tom Hanks, Tom Sizemore

Title: Ocean's Eleven (2001)
Directed By: Steven Soderbergh
Also Starring: George Clooney, Brad Pitt`;

const tomHanksOutput = `2 Movies Featuring Tom Hanks

Title: Forrest Gump (1994)
Directed By: Robert Zemeckis
Also Starring: Robin Wright, Gary Sinise

Title: Saving Private Ryan (1998)
Directed By: Steven Spielberg
Also Starring: Matt Damon, Tom Sizemore`;

const carrieFisherOutput = `1 Movie Featuring Carrie Fisher

Title: Star Wars: Episode IV - A New Hope (1977)
Directed By: George Lucas
Also Starring: Mark Hamill, Harrison Ford`;

const output = {
	"Matt Damon": mattDamonOutput,
	"Tom Hanks": tomHanksOutput,
	"Carrie Fisher": carrieFisherOutput
};


module.exports = {
	rawData,
	flatMovieData,
	moviesData,
	matchingMovies,
	output
};