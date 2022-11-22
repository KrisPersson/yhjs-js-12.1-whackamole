let todos = [
    { task: 'Köp kaffe' },
    { task: 'Köp tidning' },
    { task: 'Brygg kaffe' },
    { task: 'Drick kaffe' }
]

let numbers = [1, 2, 3, 4, 5];
// const buttonElem = document.querySelector('button');

// // addEventListener tar en funktion som ett argument och detta är en callback
// buttonElem.addEventListener('click', () => {
//     console.log('Hej');
// });

// function handleClick() {
//     console.log('Hej');
// }

// buttonElem.addEventListener('click', handleClick); // Skickar med funktionen som argument

function greet(name) {
    console.log(`Hello ${name}!`);
}

function start(name, greet) {
    greet(name);
}

start('Christoffer', greet);

// Higher order functions
// map(), reduce() och filter()

// ----------- MAP --------------

// Fungerar liknande som en for-of loop
let id = 0;
todos.map((todo) => {
    console.log(todo);
    todo.id = id;
    id++;
});

// Visuell förklaring av map-metoden, vad som händer "bakom kulisserna"
function mapTest(callback) {
    for(let i = 0; i < todos.length; i++) {
        callback(todos[i]);
    }
}

// todos.mapTest((todo) => {
//     console.log(todo);
//     todo.id = id;
//     id++;
// });

console.log(todos);

// ----------- REDUCE --------------

let initialValue = 0;

let sum = numbers.reduce((previousValue, currentValue) => {
    console.log('previousValue:',  previousValue);
    console.log('currentValue: ', currentValue);
    return previousValue + currentValue;
}, initialValue);

console.log(sum);

// ----------- FILTER --------------

let persons = [
    { name: 'Ada', age: 28 },
    { name: 'Alice', age: 14 },
    { name: 'Christopher Robin', age: 12 },
    { name: 'Glenn', age: 47 }
]

let filteredPersons = persons.filter((person) => {
    if (person.age > 20) {
        return person;
    }
});

console.log(filteredPersons);

// Samma lösning fast med en for-loop

let filteredPersons2 = [];

for(let i = 0; i < persons.length; i++) {
    if (persons[i].age > 20) {
        filteredPersons2.push(persons[i]);
    }
}

console.log(filteredPersons2);