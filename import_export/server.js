const myModule = require('./module1.js');//nodejs automatically resolve the path we have to just give path from
// the parent folder of server file and that prent folder is represented by .

console.log(myModule.greeting); // Output: Hello, world!
console.log(myModule.sayHello('Alice')); // Output: Hello, Alice!
console.log(myModule.person); // Output: { name: 'John', age: 30 }