const express = require('express');
const morgan = require('morgan');
morgan.token('post-data', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

const app = express();

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));
app.use(express.static('dist'));

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/info', (request, response) => {
    response.send(
      `<div><p>The phonebook has info for ${persons.length} people</p><p>${new Date()}</p></div>`
    )
})

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  const person = persons.find(p => p.id === id);

  if (person) response.json(person);
  else response.status(400).end();
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
});

app.post('/api/persons',(request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'Name of the person missing!'
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Phone number of the person missing!'
    });
  }

  if (persons.some(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'Name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: String(Math.ceil(Math.random() * 100000))
  }

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening in port ${PORT}`);
});