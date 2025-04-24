require('dotenv').config();

const express = require('express');
const Person = require('./models/person');
const morgan = require('morgan');

morgan.token('post-data', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

const app = express();

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));
app.use(express.static('dist'));

app.get('/info', (request, response) => {
  let persons = [];
  Person.find({}).then(result => persons = result);

  response.send(`<div><p>The phonebook has info for ${persons.length} people</p><p>${new Date()}</p></div>`);
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) response.json(person); else response.status(404).end();
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name, number: body.number, id: String(Math.ceil(Math.random() * 100000))
  });

  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then(person => {
      if (!person) return response.status(404).end();

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listening in port ${PORT}`);
});