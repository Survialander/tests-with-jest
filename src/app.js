const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0) {
    return response.status(400).json({
      error: 'Project not found'
    })
  }

  repositories[index] = { 
    ...repositories[index],
    id,
    title,
    url,
    techs, 
  }

  return response.status(200).json(repositories[index])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if(index === -1 ) {
    return response.status(400).json({ error: 'Project not found' });
  }

  repositories.splice(index, 1);

  return response.status(204).json()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0 ) {
    return response.status(400).json({ error: 'Project not found' });
  }

  repositories[index].likes++

  return response.status(200).json({
    likes: repositories[index].likes
  })
});

module.exports = app;
