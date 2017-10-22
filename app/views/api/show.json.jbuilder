json.Name do
  json.taskname @task.taskname
  json.author @task.author
end

json.Elements @task.elements.sort_by(&:layer) do |element|
  json.name element.name
  json.xSize element.xSize
  json.ySize element.ySize
  json.xStart element.xStart
  json.yStart element.yStart
  json.xEnd element.xEnd
  json.yEnd element.yEnd
  json.isConstant element.isConstant
  json.xVelocity element.xVelocity
  json.yVelocity element.yVelocity
  json.x element.x
  json.y element.y
  json.imageUrl "https://s3.eu-central-1.amazonaws.com/looks-tasty" + element.image.path
end

standard_elements = [Value.new(name: "+"), Value.new(name: "*"),
                     Value.new(name: "-"), Value.new(name: "/"),
                     Value.new(name: "^"), Value.new(name: "sqrt"),
                     Value.new(name: "="), Value.new(name: "t", known: "false"),
                     Value.new(name: "g", known: "true", value: "10"),
                     Value.new(name: "2", value: "2"), Value.new(name: "0.5", value: "0.5g")]

json.Values @task.values.to_ary.concat(standard_elements)

json.Results @task.results
