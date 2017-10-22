module Api
  class TasksController < ApplicationController
    def show
      @task = Task.includes(:values, :elements, :results)
                  .find(params[:id])
      render "api/show"
    end

    def index
      @tasks = Task.all
      render "api/index"
    end
  end
end
