

class MovieDatabase

	def initialize(filename, lines_per_movie, spaces_between_movie, stars_line_index)
		@stars_movie_table = []	#junction table of star ids on left column and movie ids on right column

		movie_data_by_line = open(filename).read.split("\n")

		first_line = 0
		last_line = stars_line_index - 1 #assumes last line of the movie data will always be the list of stars
		incrementor = lines_per_movie + spaces_between_movie

		while first_line < movie_data_by_line.length do 
			
			movie = Movie.new(movie_data_by_line[first_line..last_line])

			cast = movie_data_by_line[stars_line_index]

			cast.split(", ").each do |star_name|
				star = Star.create_or_get_star(star_name)
				@stars_movie_table.push([star.id, movie.id])
			end

			first_line += incrementor
			last_line += incrementor
			stars_line_index += incrementor
		end
	end

	def search(star_name)
		star = Star.get_star_by_name(star_name)

		if star == nil 
			return []
		end

		matching_movies = get_movies_of_star(star.id)

		matching_movies.each do |movie|
			movie.cast = get_stars_of_movie(movie.id)
		end
		matching_movies

	end

	def get_movies_of_star(star_id)
		matching_movies = []
		@stars_movie_table.each do |entry|
			if entry[0] === star_id
				matching_movies << Movie.get_movie(entry[1])
			end
		end
		matching_movies
	end

	def get_stars_of_movie(movie_id)
		stars = []
		@stars_movie_table.each do |entry|
			if entry[1] === movie_id
				stars << Star.get_star_by_id(entry[0]).name
			end
		end
		stars
	end

end

class Movie

	attr_reader :id, :title, :release_year, :director
	attr_accessor :cast

	@@movie_id = 0
	@@movies = Hash.new

	def initialize(data_array)
		@title = data_array[0]
		@release_year = data_array[1]
		@director = data_array[2]
		@cast = []
		@id = @@movie_id
		@@movies[@id] = self
		@@movie_id += 1
	end

	def self.get_movie(id)
		@@movies[id]
	end
end

class Star

	attr_reader :id, :name
	private_class_method :new

	@@star_id = 0
	@@stars = Hash.new

	def initialize(name)
		@name = name
		@id = @@star_id
		@@stars[name] = self
		@@star_id += 1
	end

	def self.get_star_by_id(star_id)
		@@stars.each {|name, star|
			if star.id === star_id 
				return star 
			end
		}
	end

	def self.get_star_by_name(star_name)
		@@stars[star_name]
	end

	def self.create_or_get_star(star_name)
		get_star_by_name(star_name) ? get_star_by_name(star_name) : new(star_name)
	end
end

class Output

	def initialize(movie_array, star_name)
		@movies = movie_array
		@star = star_name
	end

	def ascending 
		@movies.sort! { |movie_a, movie_b| movie_a.release_year <=> movie_b.release_year }
		self
	end

	def without_current_star
		@movies.each do |movie|
			index = movie.cast.find_index(@star)
			movie.cast.slice!(index)
		end
		self
	end

	def print
		s = @movies.length != 1 ? "s" : "";
		puts "#{@movies.length} Movie#{s} Featuring #{@star}"
		@movies.each do |movie|
			puts "\nTitle: #{movie.title} (#{movie.release_year})", "Directed By: #{movie.director}", "Also Starring: #{movie.cast.join(", ")}"
		end
	end
end




first_arg, second_arg = ARGV

first_name = first_arg || ""
last_name = second_arg || ""
full_name = last_name == "" ? first_name : first_name + " " + last_name


if full_name == ""
	puts "Please provid a star's name to search"
	exit(true)
end

ROWS_PER_MOVIE = 4
SPACES_BETWEEN_MOVIE = 1
STARS_ROW_INDEX = 3

movie_db = MovieDatabase.new("../data/movies.txt", ROWS_PER_MOVIE, SPACES_BETWEEN_MOVIE, STARS_ROW_INDEX)
results = movie_db.search(full_name)

Output.new(results, full_name).ascending.without_current_star.print


