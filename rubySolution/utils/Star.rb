class Star

	attr_reader :id, :name
	private_class_method :new

	@@star_id = 0
	@@stars = Hash.new

	def initialize(name)
		@name = name
		@id = @@star_id
		#stars are stored by name in hash so no duplicate stars are created with the same name
		#we could also store by id, but then we are looping through hash every time we want to create new star
		#if we were going to use stars in more ways, might be best practice to store by id rather than name
		@@stars[name] = self	
		@@star_id += 1
	end

	def self.get_by_id(star_id)
		@@stars.each do |name, star|
			if star.id === star_id 
				return star 
			end
		end
	end

	def self.get_by_name(star_name)
		@@stars[star_name]
	end

	def self.create_or_get_star(star_name)
		get_by_name(star_name) ? get_by_name(star_name) : new(star_name)
	end
	
end