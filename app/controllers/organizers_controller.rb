class OrganizersController < ApplicationController
  before_filter :authenticate_user!
  
	  respond_to :json 
  def index 
    respond_with(@organizers = Organizer.all)
  end

  def show
    @organizer = Organizer.find(params[:id])
    respond_with(@organizer)
  end

  def update 
    @organizer = Organizer.find(params[:id])
    respond_to do |format|
      if @organizer.update_attributes(params[:organizer])
        format.json { head :no_content }
      else
        format.json { render json: @organizer.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @organizer = Organizer.new(params[:organizer])
    @organizer.save
    respond_with(@organizer)
  end

  def destroy
    @organizer = Organizer.find(params[:id])
    @organizer.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
