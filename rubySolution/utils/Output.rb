class Output

	def initialize(movie_array, star_name)
		@movies = movie_array
		@star = star_name
	end

	#sort in ascending order by release year
	def ascending 
		@movies.sort! { |movie_a, movie_b| movie_a.release_year <=> movie_b.release_year }
		self
	end

	#remove the name of the star currently being searched from the movie's list of stars
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