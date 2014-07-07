class ProjectsController < ApplicationController
  before_filter :authenticate_user!
  respond_to :json 

  def index 
    @projects = Project.all
    respond_with(@projects)
  end

  def show
    @project = Project.find(params[:id])
    respond_with(@project)
  end

  def update 
    @project = Project.find(params[:id])
    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.json { head :no_content }
      else
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @project = Project.new(params[:project])
    @project.save
    respond_with(@project)
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
