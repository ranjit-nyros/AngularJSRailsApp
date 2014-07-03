class Project < ActiveRecord::Base
   attr_accessible :title, :description
   has_many :tasks
end
