module Api
  class TasksController < ApplicationController

    def show
      @task = Task.includes(:values, :elements, :results).
          find(params[:id])
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
            "name":"Puf",
            "imageUrl":"/images/Puf.png",
            "xSize":"5%",
            "ySize":"5%",
            "xStart":"40%",
            "yStart":"5%",
            "isConstant":"false",
            "xVelocity":"100",
            "yVelocity":"0",
            "x":"",
            "y":""
        },
        {
            "name":"Plane",
            "imageUrl":"/images/Plane.png",
            "xSize":"20%",
            "ySize":"20%",
            "xStart":"50%",
            "yStart":"5%",
            "isConstant":"false",
            "xVelocity":"100",
            "yVelocity":"0",
            "x":"",
            "y":""
        },
        {
            "name":"Tomato",
            "imageUrl":"/images/Tomato.png",
            "xSize":"4%",
            "ySize":"2%",
            "xStart":"53%",
            "yStart":"5%",
            "isConstant":"false",
            "xVelocity":"%Plane.xVelocity%",
            "yVelocity":"%Plane.yVelocity%",
            "x":"",
            "y":""
        },
        {
            "name":"Pot",
            "imageUrl":"/images/Pot.png",
            "xSize":"10%",
            "ySize":"2%",
            "xStart":"70%",
            "yStart":"95%",
            "isConstant":"true",
            "xVelocity":"",
            "yVelocity":"",
            "x":"",
            "y":""
        }
    ],
    "Results":[
        {
            "leftSide":"%Tomato%",
            "relation":"isIn",
            "rightSide":"%Pot%"
        },
        {
            "leftSide":"%Plane.y%",
            "relation":">",
            "rightSide":"0"
        }
    ],
    "Values":[
        {
            "name":"Hp",
            "known":"false",
            "place":"%Plane.y%",
            "value":""
        },
        {
            "name":"Vxp",
            "known":"true",
            "place":"%Plane.xVelocity%",
            "value":""
        },
        {
            "name":"X",
            "known":"true",
            "for":"%Pot.x%-%Plane.x%",
            "value":""
        }
    ]
}'
      render json: var
    end
  end


end
