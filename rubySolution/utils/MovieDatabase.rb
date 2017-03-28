require "./utils/Movie"
require "./utils/Star"

class MovieDatabase

	def initialize(filename, lines_per_movie, spaces_between_movie, stars_line_index)
		@stars_movie_table = []	#junction table for many to many relationship of stars (star id column) and movies (movie id column)
		@star_id_column = 0	#star id column is on the left
		@movie_id_column = 1	#movie id column is on the right

		movie_data_by_line = open(filename).read.split("\n")

		first_line = 0
		last_line = lines_per_movie - 2 #subtract 2 because movie_data is zero-indexed and last line of the data is cast info
		incrementor = lines_per_movie + spaces_between_movie

		while first_line < movie_data_by_line.length do 

			movie = Movie.new(movie_data_by_line[first_line..last_line]) #grab all data for current movie and make movie object

			cast = movie_data_by_line[stars_line_index]	#get cast for current movie

			cast.split(", ").each do |star_name|	#for each cast member in current movie
				star = Star.create_or_get_star(star_name)	#create a star object
				@stars_movie_table << [star.id, movie.id]	#create new row in star-movie junction table
			end

			# increment all pointers to process next movie in data stream
			first_line += incrementor
			last_line += incrementor
			stars_line_index += incrementor
		end
	end

	def search(star_name)
		star = Star.get_by_name(star_name)

		#if star is not in database, then return empty array of matching movies
		if star == nil 
			return [] 
		end

		matching_movies = get_movies_of_star(star.id)

		#for each movie, build its cast based on the star-movie junction table
		matching_movies.each do |movie|
			movie.cast = get_stars_of_movie(movie.id)
		end
		matching_movies

	end

	def get_movies_of_star(star_id)
		movies = []
		@stars_movie_table.each do |row|
			if row[@star_id_column] === star_id 	#for every row in the junction table with a star id equal to star_id
				movies << Movie.get_movie(row[@movie_id_column])	#look at the corresponding movie id and get movie
			end
		end
		movies
	end

	def get_stars_of_movie(movie_id)
		stars = []
		@stars_movie_table.each do |row|
			if row[@movie_id_column] === movie_id #for every row in the junction table with a movie id equal to movie_id
				stars << Star.get_by_id(row[@star_id_column]).name 	#look at the corresponding star id and get star
			end
		end
		stars
	end

end