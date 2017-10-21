module Api
  class TasksController < ApplicationController

    def show
      @task = Task.find(params[:id])
      render 'api/show'
    end

    def index

      var = '{
  "Name":{
    "taskname":"Plane Potato",
    "author":"Adrian"
  },
  "Elements":[
    {
      "name":"Tomato",
      "xSize":"4%",
      "ySize":"2%",
      "xStart":"Plane.xStart",
      "yStart":"Plane.yStart",
      "isConstant":"false",
      "xVelocity":"Plane.xVelocity",
      "yVelocity":"Plane.yVelocity",
      "x":"",
      "y":""
    },
    {
      "name":"Plane",
      "xSize":"20%",
      "ySize":"10%",
      "xStart":"80%",
      "yStart":"60%",
      "isConstant":"false",
      "xVelocity":"100",
      "yVelocity":"0",
      "x":"",
      "y":""
    },
    {
      "name":"Pot",
      "xSize":"5%",
      "ySize":"2%",
      "xStart":"90%",
      "yStart":"0%",
      "isConstant":"true",
      "xVelocity":"",
      "yVelocity":"",
      "x":"",
      "y":""
    }
  ],
  "Results":[
      {
        "leftSide":"Potato",
        "relation":"isIn",
        "rightSide":"Pot"
      },
      {
        "leftSide":"Plane.y",
        "relation":">",
        "rightSide":"0"
      }
  ],
  "Values":[
      {
        "name":"Hp",
        "known":"false",
        "place":"Plane.y",
        "value":""
      },
      {
        "name":"Vxp",
        "known":"true",
        "place":"Plane.xVelocity",
        "value":""
      },
      {
        "name":"X",
        "known":"true",
        "for":"Pot.x-Plane.x",
        "value":""
      }
  ]
}'
      render json: var
    end
  end


end
