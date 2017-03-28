## Run the program
To run the program, enter into the command line `ruby movies.rb [star name]`. For example: `ruby movies.rb Tom Hanks`.

## Notes
Because a star can have be in many movies and a movie has many stars, the relationship between movies and stars is many to many.
We therefore have created junction table in our database to store the relationships between stars and movies. So for example if our data is the following:

			Good Will Hunting		<--movie id 0
			1997
			Gus Van Sant
			Matt Damon, Robin Williams, Ben Affleck		<--star ids 0, 1, 2 respectively

			Saving Private Ryan 	<--movie id 1
			1998
			Steven Spielberg
			Tom Hanks, Matt Damon, Tom Sizemore		<--star ids 3, 2, 4 respectively

			Forrest Gump 		<--movie id 2
			1994
			Robert Zemeckis
			Robin Wright, Tom Hanks, Gary Sinise 	<--star ids 5, 3, 6 respectively

Then our junction table will look like:

			star_id | movie_id
				0	|	0
				1	|	0
				2		|		0
				3		|		1		<--Tom Hanks (star id 3) in Saving Private Ryan (movie id 1)
				2		|		1
				4		|		1
				5		|		2
				3		|		2		<--Tom Hanks (star id 3) in Forrest Gump (movie id 2)
				6		|		2

So if we were looking for Tom Hanks movies, we would first get his id (3) and then find all star_ids equal to 3 in the junction table. For every row that is a match, we would get the movie id on the right side. We can use the same junction table to then look up all stars with the same movie id to get the cast of each movie. 


