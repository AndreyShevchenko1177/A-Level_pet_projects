let f = function ({ name = "vasya", surname = "petrov", age = 25 } = {}) {
    console.log("name - " + name);
    console.log("surname - " + surname);
    console.log("age - " + age);
};

f({ age: 100 });
