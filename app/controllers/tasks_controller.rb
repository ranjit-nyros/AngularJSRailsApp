class TasksController < ApplicationController

  respond_to :json 

  def index 
    @tasks = Task.all
    respond_with(@tasks)
  end

  def show
    @task = Task.find(params[:id])
    respond_with(@task)
  end

  def update 
    @task = Task.find(params[:id])
    respond_to do |format|
      if @task.update_attributes(params[:task])
        format.json { head :no_content }
      else
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @task = Task.new(params[:task])
    @task.save
    respond_with(@task)
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
