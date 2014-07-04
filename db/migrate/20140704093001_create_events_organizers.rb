class CreateEventsOrganizers < ActiveRecord::Migration
 def self.up
    create_table :events_organizers do |t|
      t.integer :event_id
      t.integer :organizer_id
    end
  end

  def self.down
  	drop_table :events_organizers
  end
end
