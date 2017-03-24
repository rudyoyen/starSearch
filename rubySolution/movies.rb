name = ARGV.first

class Search
	def initialize(word)
		@word = word
	end

	def print
		puts @word
	end	
end

# my_search = Search.new(name)

# my_search.print

class MovieDatabase
	def initialize(filename)
		#read file
		@raw_data = open(filename)
		@movies = [];
	end

	def make_movies
		split_by_line = @raw_data.read.split("\n")

		first = 0
		while first < split_by_line.length do 
			last = first + 3
			movie = Movie.new(split_by_line[first..last])
			@movies.push(movie)
			first += 5
		end
		
		@movies[0].make_stars
	end
end

class Movie
	def initialize(data_array)
		@title = data_array[0]
		@release_year = data_array[1]
		@director = data_array[2]
		@stars = data_array[3]
	end

	def make_stars 
		puts @stars.split(",").length
	end

end

class Star
	def initialize(name)
		@name = name
	end
end

movie_db = MovieDatabase.new("../data/movies.txt")
movie_db.make_movies