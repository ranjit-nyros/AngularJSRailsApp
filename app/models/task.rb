class Task < ActiveRecord::Base
  attr_accessible :description, :title ,:project_id
  belongs_to :project
end
