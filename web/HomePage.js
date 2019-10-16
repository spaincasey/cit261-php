/*OBJECTS - Variables that can contain many values in name:value pairs

Instantiation - spaces and line breaks are not important, so either
                instantiation works.*/ 
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};

var person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
  };

//You can access properties of the object in 2 ways
person.lastName;
person["lastName"];

/*OBJECT METHODS
Methods are actions that can be performed on objects.*/
var person = {
    
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
      return this.firstName + " " + this.lastName;
    }
};

//Constructor
// function Person(first, last, age, eye) {
//     this.firstName = first;
//     this.lastName = last;
//     this.age = age;
//     this.eyeColor = eye;
//     this.name = function() {
//       return this.firstName + " " + this.lastName
//     };
// }
  

//You can access an object method with the following syntax:
person.fullName();

/*You can add new properties to an existing object by simply giving it a value.
Assume that the person object already exists - you can then give it new properties:*/
person.nationality = "English";

//The delete keyword deletes a property from an object:
delete person.age;


//Function that creates an object and displays the name
// function changeHeading(){
//     function Person(first, last, age, eye) {
//         this.firstName = first;
//         this.lastName = last;
//         this.age = age;
//         this.eyeColor = eye;
//         this.name = function() {
//           return this.firstName + " " + this.lastName
//         };
//     }
//     var person1 = new Person("Bill", "Murray", 55, "green");
//     document.getElementById("heading").innerHTML = person1.name();
// }


class Person {
    constructor(first, last, age, eye) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.eyeColor = eye;
    }
    name() {
        return this.firstName + " " + this.lastName
    };
};

function changeHeading(){
  let person2 = new Person("Jared", "Smith", 38, "Blue");
  document.getElementById("heading").innerHTML = person2.name();
}