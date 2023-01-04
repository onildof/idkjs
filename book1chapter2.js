/*
typeof is an unary operator that returns a string telling us the type of a value. NOT the type of the variable, as JS variables don't have types.
JS has the following built-in types:
*/

var obj = {
  number: 3.141592,
  NaN: NaN, // Although NaN stands for "Not a Number", it actually has type number. We could say NaN is a very special number
  string: 'abc',
  boolean: true,
  null: null, // we'd expect it to return 'null', but it returns 'object'. That's a legacy bug
  undefined: undefined, // no different from a variable that has no value set yet
  symbol: Symbol('desc'),
}

console.log(typeof obj)
for (let key of Object.keys(obj)) {
  console.log(typeof obj[key])
}

/*
array and function are subtypes of object
*/
var arr = [1, 2, 3]
console.log(typeof arr) // we'd expect it to return 'array', but it instead returns 'object'

/*
An array is an object with numeric property names and an automatically updated 'length' property
We could actually use an array as a normal object, or create an object with numeric property names, but that'd give us no benefit.
The best way to go is using arrays when we need numerically positioned values, and objects when we need alfabetically named properties.

Since typeof is useless in telling us if a variable contains an array, we use the Array.isArray() function.
*/

console.log(Array.isArray(arr))

var fun = function () {
  return true
}
console.log(typeof fun)

/* built-in type methods

A string value has no methods. So when a method such as String.prototype.toUpperCase() is called on a string, 
what actually happens is JS implicitly uses an object wrapper (called as a constructor) new String(), passing that string in, and then calls the method on the returned object.
*/
console.log(obj.string.toUpperCase())

/* 
The same goes for a number value, which has a Number() object wrapper counterpart, which when called as a constructor, returns an object with access to all of Number.prototype methods. 
*/
console.log(obj.number.toFixed(4))

/*
and for boolean, there's new Boolean()
*/
console.log(typeof obj.boolean, typeof obj.boolean.toString()) // using Boolean.prototype.toString()

/*
Without the 'new' operator, String(), Number() and Boolean() only do coercion to their respective primitives
*/
console.log(Number('12'), typeof Number('12'))
console.log(new Number('12'), typeof new Number('12'))

/*
JS has only 7 falsy values
*/
var falsyProperties = {
  emptyString: '',
  minusZeroNumber: -0,
  zeroNumber: 0, // actually the same as +0
  NaN: NaN,
  falseBoolean: false,
  null: null,
  undefined: undefined,
}

for (let key of Object.keys(falsyProperties)) {
  console.log(key, falsyProperties[key], Boolean(falsyProperties[key]))
}

/*
The == operator checks for value equality with coercion enabled.
The === operator checks for value equality with coercion disabled, hence the "strict equals" nickname

You can read section 11.9.3 of the ES5 specification (http://www.ecma-international.org/ecma-262/5.1/) to see the exact rules of implicit coercion.

If either value (aka side) in a loose comparison could be the true, false, 0, "", or [] (empty array) value, avoid == and use ===.
In all other cases, you're safe to use ==. Not only is it safe, but in many cases it simplifies your code in a way that improves readability.
If both sides are objects, their references are compared.
If one side is an object and the other is a primitive, the object is coerced to a primitive value before comparison takes place.
*/

var arrA = [1, 2, 3]
var arrB = [1, 2, 3]
var arrStr = '1,2,3'
console.log(arrA == arrStr, arrB == arrStr, arrA == arrB)

/*
!= and !== are non-equality operators. Same coercion rules apply.
>, >=, <, and <= are inequality operators. Some coercion rules apply, but not the same as the previous.

Rules are:
1. if both sides of the inequality are strings, then lexicographical order takes place
2. if one of the sides is not a string, then type coercion takes place

For more information about the inequality comparison rules, see section 11.8.5 of the ES5 specification
*/
console.log('41' < '42')
console.log('41' < 42)
console.log('foo' < 42, 'foo' > 42, 'foo' == 42) // the string 'foo' is coerced to number NaN

/*
Fun fact: NaN is the only primitive value that is different from itself.
When we need to check if a number has value NaN, we must use Number.isNaN()
*/
console.log(obj.NaN == obj.NaN, Number.isNaN(obj.NaN))

/*
Identifiers can be reserved words if they're property names of an object.
The rules are never start with a number, and starting with $ and _ is allowed.
*/
var obj2 = {
  function: '',
  var: '',
  let: '',
  class: '',
  delete: '',
  $dollar: '',
  _underscore: '',
}

/*
Using the var keyword to declare a variable in the initialization clause of a for loop means the same as declaring a variable with var within its block:
their lexical scope is a function scope, not a block scope. Therefore both are accessible outside of the for block, as we know a for loop is NOT a function definition.
*/
c = 1

console.log(a, b, c) // prints undefined, undefined, 1 because both variable declarations are hoisted to the top of the scope, therefore accessible throughout the whole scope
for (var a = 0; a < 10; a++) {
  var b = 512
  var c = c * 2
  console.log(a) // iterates 10 times, printing 0 to 9
}

console.log(a, b, c) // prints 10, 512, 1024

/*
See that every time the for iterates we're redeclaring the variables b and c with the var keyword?
The compiler ignores the redeclarations WHY?

The code below works because the foo function declaration is hoisted
*/

var d = 2

foo()

function foo() {
  console.log(d) // Not so fast on conclusions! Please look through the rest of the function body for a local declaration of that variable

  d = 3 // Keep looking before making any assumptions

  console.log(d) // Keep looking...

  var d // Found it! This is hoisted to the top of foo's function scope, so the previous lines we just saw are manipulating a different 'd'. The global scope's 'd' is shadowed by foo's 'd'.
}

console.log(d)

/*
If we try to access a variable in a scope where it isn't available, a ReferenceError is thrown.
If we assign a value to a variable that hasn't been declared, in non-strict mode a variable is declared in the global scope. That's bad coding, though.
*/
try {
  console.log(e)
} catch (error) {
  console.log(error)
} // ReferenceError: e is not defined

function bar() {
  f = 128 // `a` not formally declared
}

bar()
console.log(f) // 128 -- oops, auto global variable :( Using strict mode would avoid this!

/*
The let keyword lets us declare variables with block scope.
*/

function baz() {
  var aa = 1

  if (aa >= 1) {
    let bb = 2
    var bbb = 222

    while (bb < 5) {
      let cc = bb * 2
      bb++

      console.log(aa + cc)
    }
  }
  try {
    console.log(bb)
  } catch (error) {
    console.log(error)
  }
  console.log(bbb)
}

baz()
/*
See that bbb is accessible outside of the if block because var variables in the if block actually belong to baz's function scope.
But not bb. It being declared with let means it's block scoped, not function scoped, so it's only accessible within the if block.
*/

/*
Strict mode, besides tightening the coding rules, makes the code more optimizable by the JS engine.
We should always USE it.
'use strict' can be placed globally, or inside functions if desired
*/

function woo() {
  'use strict'

  // this code is strict mode

  function war() {
    // this code is strict mode
    aaaa = 3 // throws ReferenceError instead of auto-declaring a global variable. Strict mode prevents us from declaring variables without a keyword
  }

  war()
}

// this code is not strict mode

try {
  woo()
} catch (error) {
  console.log(error)
}

/*
Because an IIFE is a function, and functions create variable scope, 
using an IIFE in this fashion is often used to declare variables that won't affect the surrounding code outside the IIFE:
*/
var g = 42
let h = 84

;(function IIFE() {
  var g = 10
  let h = 20
  console.log(g, h) // 10
})()

console.log(g, h) // 42
/*
It doesn't matter if we use var or let, the effect is the same.
*/

/*
Polyfilling is for taking novel functions in newer versions of JS and replicating them for old JS versions.
There's no way to polyfill new syntax, though. Transpiling is used in these cases.

Here's polyfilling of ES6's Number.isNaN() to ES5, whose Number type doesn't have it:
*/
if (!Number.isNaN) {
  Number.isNaN = function isNaN(x) {
    return x !== x
  }
}

/*
The code is authored in the new syntax, then a transpiler (transformer + compiler), which we typically place in
our build process, much like our linter, creates code in the old syntax that does the same thing.

We could avoid transpiling and just use older JS, but that prevents us from learning the new syntax,
and makes the code less readable and less maitainable as old syntax can be much more verbose or convoluted.
Also, serving code with the new syntax to browsers that support it opens doors for optimizations that are 
unavailable in older JS. At the same time we can serve transpiled code to older browsers.

Here's an illustration of a transpiled code that uses ES6's novel "default parameter values" syntax:
*/

function waz(a = 2) {
  console.log(a)
}

waz(undefined) // 2
waz(42) // 42

function transpiledWaz() {
  var a = arguments[0] !== void 0 ? arguments[0] : 2 // void 0 means undefined
  console.log(a)
}

transpiledWaz()
transpiledWaz(42)

/*
Babel is a JS transpiler
*/
