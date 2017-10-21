json.Name do
  json.taskname @task.taskname
  json.author @task.author
end

json.Elements @task.elements do |element|
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

json.Values @task.values

json.Results @task.results
