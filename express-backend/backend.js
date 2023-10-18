// backend.js
import express from "express";
import cors from 'cors';

const app = express();
const port = 8000;

const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).end(); // Update the status code to 201 for successful creation
});

function addUser(user){
    users['users_list'].push(user);
}

function generateRandomID() {
    return Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric ID
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateRandomID(); // Assign a random ID to the new user
    addUser(userToAdd);
    res.status(201).json(userToAdd); // Return the updated representation of the object
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const deletedUser = deleteUserById(id);
    if (deletedUser) {
        res.status(204).end(); // Successful delete, status code 204 (No Content)
    } else {
        res.status(404).send('Resource not found.'); // Resource not found, status code 404
    }
});

function deleteUserById(id) {
    const index = users['users_list'].findIndex(user => user.id === id);
    if (index !== -1) {
        const deletedUser = users['users_list'].splice(index, 1);
        return deletedUser[0];
    }
    return null;
}
      