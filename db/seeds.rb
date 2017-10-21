# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if Rails.env.development?
  AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

  task = Task.create!(taskname: "Taskname", author: "Author")

  task.elements.create(name: "Name", xSize: "xSize", ySize: "ySize", xStart: "xStart",
    yStart: "yStart", isConstant: "isConstant", xVelocity: "xVelocity", yVelocity: "yVelocity",
  x: "x", y: "y")
  task.elements.create(name: "Name", xSize: "xSize", ySize: "ySize", xStart: "xStart",
                       yStart: "yStart", isConstant: "isConstant", xVelocity: "xVelocity", yVelocity: "yVelocity",
                       x: "x", y: "y")

  task.values.create(name: "Name", known: "known", place: "place", value: "value")
  task.values.create(name: "Name", known: "known", place: "place", value: "value")

  task.results.create(leftSide: "leftSide", relation: "relation", rightSide: "rightSide")
  task.results.create(leftSide: "leftSide", relation: "relation", rightSide: "rightSide")
end
