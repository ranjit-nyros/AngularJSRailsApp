class EventsController < ApplicationController
  before_filter :authenticate_user!
  
	  respond_to :json 
  def index 
    respond_with(@events = Event.all)
  end

  def show
    @event = Event.find(params[:id])
    respond_with(@event)
  end

  def update 
    @event = Event.find(params[:id])
    respond_to do |format|
      if @event.update_attributes(params[:event])
        format.json { head :no_content }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @event = Event.new(params[:event])
    @organizers = Organizer.where(:id => params[:organizing_team])
    @event.organizers << @organizers 
    @event.save

    respond_with(@event)
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
