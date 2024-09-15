// Exporting a variable
const greeting = 'Hello, world!';
module.exports.greeting = greeting;

// Exporting a function
function sayHello(name) {
    return `Hello, ${name}!`;
}
module.exports.sayHello = sayHello;

// Exporting an object
const person = {
    name: 'John',
    age: 30
};
module.exports.person = person;
