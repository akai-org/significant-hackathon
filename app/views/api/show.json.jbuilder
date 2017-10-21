json.Name do
  json.taskname @task.taskname
  json.author @task.author
end

json.Elements @task.elements

json.Values @task.values

json.Results @task.results
