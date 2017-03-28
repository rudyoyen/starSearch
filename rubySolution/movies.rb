require "./utils/MovieDatabase"
require "./utils/Output"


first_arg, second_arg = ARGV

first_name = first_arg || ''
last_name = second_arg || ''
full_name = last_name == '' ? first_name : first_name + ' ' + last_name

if full_name == ''
	puts "Please provide a star's name to search"
	exit(true)
end


#Define meta data for source file
FILE_NAME = "./movies.txt"
LINES_PER_MOVIE = 4
SPACES_BETWEEN_MOVIE = 1
STARS_LINE_INDEX = LINES_PER_MOVIE - 1	#assumes the line with the list of stars is last in each movie data chunk

movie_db = MovieDatabase.new(FILE_NAME, LINES_PER_MOVIE, SPACES_BETWEEN_MOVIE, STARS_LINE_INDEX)
results = movie_db.search(full_name)

Output.new(results, full_name).ascending.without_current_star.print


