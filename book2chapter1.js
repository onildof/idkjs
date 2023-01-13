/*
JS compilation is always done by an Engine and has three steps:

1. lexing
  turns the authored code into an array of tokens
  
  var a = 2; becomes [var, a, =, 2, ;]

2. parsing
  turns the array of tokens into a tree of grammarly nested elements called an 
  Abstract Syntax Tree

3. code-gen
  turns the AST into a set of machine instructions

Because JS's compilation does not happen on a build step way ahead of time, but
microseconds before the machine code is executed, there's not much time to 
optimize.

We'll focus on two phases: parsing (the most important step of compilation) and 
execution (which comes right after compilation).

JS is compile-then-execute.

Consider this:
*/
// var greeting = 'hello'
// console.log(greeting)
// greeting = .'hi' //SyntaxError: unexpected token .
/*
Even though the code is well-formed in the first lines, the 'hello' greeting 
is not printed because JS is not interpreted (compile and run line-by-line). 
This proves the JS Engine compiles the whole program before executing it.

During compiling, parsing knows that token is out of place, so throws a 
SyntaxError.

Next, consider this:
*/
// console.log('howdy')

// saySomething('hello', 'hi')

// function saySomething(greeting, greeting) {
//   //SyntaxError: duplicate parameter name not allowed in this context
//   'use strict'
//   console.log(greeting)
// }
/*
Another SyntaxError thrown during compilation, because strict mode doesn't allow
a variable to be declared twice. 

That isn't a syntax error in the sense that it's not a malformed string of tokens,
but in strict mode this violation is required to be thrown before execution,
so SyntaxError is used as a gambiarra.

So remember SyntaxError is always thrown at compilation time.

In a non-strict mode, the compiler would just ignore all but the last declaration 

Now consider the following:
*/
// function saySomething() {
//   var greeting = 'hello'
//   {
//     greeting = 'howdy' // ReferenceError: Cannot access 'greeting' before initialization
//     let greeting = 'hi'
//     console.log(greeting)
//   }
// }

// saySomething()
/*
This error is also thrown during parsing, and seems to suggest that let and 
const declarations are not hoisted, which is not actually true. 
This error comes from a Temporal Dead Zone (TDZ), which we're not supposed to 
understand just yet.

Finally, let's consider the following code:
*/
// var students = [
//   { id: 14, name: 'Kyle' },
//   { id: 73, name: 'Suzy' },
//   { id: 112, name: 'Frank' },
//   { id: 6, name: 'Sarah' },
// ]

// function getStudentName(studentID) {
//   for (let student of students) {
//     if (student.id == studentID) {
//       return student.name
//     }
//   }
// }

// var nextStudent = getStudentName(73)
// console.log(nextStudent) // Suzy
/* 
Outside of declarations, all occurrences of identifiers are either as target of an assignment
or as the source of a value.

The JS engine labels each occurrence of a variable as a target or a source.

In our program, the 'var students' part is handled entirely at compilation time
as a declaration, and thus entirely irrelevant at execution time.

So for the sake of execution, let's leave declarations out of our minds and focus
only on variables being used as targets and sources.

So let's count our target assignment operations:
students = ...
function getStudentName(...) // like var getStudentName = function (...) {...}, but not quite. We'll delve into this in hoisting.
for(let student of students) // a value is assigned to student at each iteration
getStudentName(73) // 73 is assigned to the parameter studentID

The other variable references in the program are all source references.

In console.log(nextStudent), console is a source variable reference, log is a property, and nextStudent is a source variable reference as well.
*/

/*
The eval() function compiles and executes a string of code during execution time, 
being able to modify the scope eval() is currently executing in.
*/
// function badIdea() {
//   eval(`var oops = 'ugh!'`)
//   console.log(oops)
// }
// badIdea()

/* the with keyword dynamically turns an object into a local scope at runtime, 
with its properties being treated as variables */
var badIdea = { oops: 'Ugh!' }
with (badIdea) {
  console.log(oops)
}

/* eval and with are unavailable in strict mode */

/*
Outside of eval and with, JS's scope is determined at compile time; this means
JS has a lexical scope.

Compilation inserts extra code for defining the scopes and registering the identifiers
at each one during runtime
*/
