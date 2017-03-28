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