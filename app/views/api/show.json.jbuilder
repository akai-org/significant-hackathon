json.Name do
  json.taskname @task.taskname
  json.author @task.author
end

json.Elements @task.elements.sort { |a, b| a.layer <=> b.layer } do |element|
  json.name element.name
  json.xSize element.xSize
  json.ySize element.ySize
  json.xStart element.xStart
  json.yStart element.yStart
  json.isConstant element.isConstant
  json.xVelocity element.xVelocity
  json.yVelocity element.yVelocity
  json.x element.x
  json.y element.y
  json.imageUrl element.image.url(:original)
end

standard_elements = [Value.new(name: "+"), Value.new(name: "*"),
            Value.new(name: "-"), Value.new(name: "/"),
            Value.new(name: "^"), Value.new(name: "sqrt"),
            Value.new(name: "="), Value.new(name: "t", known: "false"),
            Value.new(name: "g", known: "true", value: "10")]

json.Values @task.values.to_ary.concat(standard_elements)

json.Results @task.results
