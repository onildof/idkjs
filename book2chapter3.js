/*
Scope chain is the sequence of scopes where variables are looked up at runtime.

The chain points upwards/outwards.

But variable scope lookup at runtime is not even a thing. The scope is determined at the beginning of compilation. Each variable's scope is noted in their AST entries or at least noted somewhere else and accessible from there.

A variable in an inner scope shadows the homonymous variable in an outer scope. It's therefore impossible to access to the outer scope variable in any nested scope. 

However, global var and function declarations expose themselves as properties of the global object. In the browser environment that's 'window'. Run this in a browser:
*/
// var studentName = 'Suzy'

// function printStudent(studentName) {
//   console.log(studentName)
//   console.log(window.studentName)
// }

// printStudent('Frank')
// // "Frank"
// // "Suzy"

/* Think of window properties as getter/setter accessors for the actual global variables (only works for variables declared with var or function).

Don't shadow a variable you'll need access to.
 */
// var one = 1
// let notOne = 2
// const notTwo = 3
// class notThree {}

// console.log(window.one) // 1
// console.log(window.notOne) // undefined
// console.log(window.notTwo) // undefined
// console.log(window.notThree) // undefined

/*
You can use an object's property to copy the shadowed variable value (if it contains a primitive), or reference (if it contains an object) and make it accessible. BUT first in the case of the primitive, that's a copy; you can't reassign the shadowed variable. AND in the case of the object, you can even mutate it, but not reassign it either. See:
*/

// var special = 42

// function lookingFor(special) {
//   var another = {
//     special: special,
//   }

//   function keepLooking() {
//     var special = 3.141592
//     console.log(special)
//     console.log(another.special) // Ooo, tricky!
//     console.log(window.special)
//   }

//   keepLooking()
// }

// lookingFor(112358132134)
// // 3.141592
// // 112358132134
// // 42

/*
Lexically accessing a variable means being able to reassign it to another value.

let can shadow var, but var cannot shadow let:
*/

// function something() {
//   var special = 'JavaScript'

//   {
//     let special = 42 // totally fine shadowing

//     // ..
//   }
// }

// function another() {
//   // ..

//   {
//     let special = 'JavaScript'

//     {
//       var special = 'JavaScript'
//       // ^^^ SyntaxError: Identifier 'special' has already been declared

//       // ..
//     }
//   }
// }

/* That boundary-crossing prohibition stops at each FUNCTION BOUNDARY, so the following code raises no exception:
 */

function another() {
  // ..

  {
    let special = 'JavaScript'

    ajax('https://some.url', function callback() {
      // totally fine shadowing
      var special = 'JavaScript'

      // ..
    })
  }
}

/*
So var (in an inner scope) can only shadow an outer scope's let if there is a function boundary in between.

What about this?
*/

var askQuestion = function ofTheTeacher() {
  console.log(ofTheTeacher)
}

askQuestion()
// function ofTheTeacher()...

console.log(ofTheTeacher)
// ReferenceError: ofTheTeacher is not defined

/*
ofTheTeacher is declared inside of the function expression, and is readonly. It fails silently in non strict mode, and throws TypeError in strict.

Here we have a "named function expression" and an "anonymous function expression":
*/

var turtle = function Donatello() {}
var rat = function () {}

/*
Other than having no declarative form (meaning they're always expressions), arrow functions have the same lexical scope rules as function functions.
*/
