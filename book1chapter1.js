/*
A statement is a group of operators and operands that performs a task.
The operands might be variables or literal values.
Variables are symbolic placeholders for values.
A program is a collection of statements.

An expression is any set of characters that conveys some meaning. If it can be evaluated, it's an expression.
A statement is made of expressions.

a = b * 2 is a statement made of expressions
2 is a literal value expression
b is a variable expression
b * 2 is an arithmetic expression
a = b * 2 is an assignment expression

alert(a) is a statement, because it performs a task, the task of calling a function. It is also an expression because it can be evaluated (it evaluates to undefined).
So it's an expression statement.
*/

/*
In order for the computer to understand the program, the source code must be translated.

If it's translated whole prior to being run, it's compiled.
If it's translated and run line-by-line, then it is interpreted.

JS compiles on-the-fly, then runs.
*/

// http://blog.teamtreehouse.com/mastering-developer-tools-console

/*
var is not an operator, but a necessary keyword to declare a variable.
Using var, you only need to declare a variable once in each function scope.
The global scope can also have declared variables.

. is an object property access operator.

An object is a value that holds other values under named locations called properties.
These properties can be accessed via dot-notation (obj.a) and square-bracket-notation (obj['a']).

Some other operators:
== loose-equals
=== strict-equals
!= loose not-equals
!== strict not-equals
<= less-than or loose-equals
>= greater-than or loose-equals
*/

/*
In JS, type conversion is called "coercion".
The loose-equals operator first performs implicit coercion on one of the operands if they're of different types, before comparing them.
*/
var result = '99.99' == 99.99 // the left hand side string literal will be implicitly coerced to number before a comparison takes place
/*
There are rules for implicit coercion, which we'll see ahead.
*/

/*
Comments should be used to explain why, not what.
*/

/*
A variable is called such a name because its value can vary during the course of the program.
The sole purpose of variables is holding program state.

JS's Weak Typing (aka Dynamic Typing) means the variables are not assigned types, just the values. So in JS a variable can hold a value of any type.

People call constants variables, or "constant variables", but that's contradictory. Just call them constants, as they don't vary.
The constant naming convention of JS is ALL_CAPS_WITH_UNDERSCORES.
The function-scoped keyword var doesn't prevent you from changing the value of a constant. The naming convention for constants helps us avoid that mistake.
The newer block-scoped keyword const, on the other hand, doesn't let us reassign a constant.
*/

/*
The if statement is a control statement attached to a block.
The if statement expects a boolean between its parentheses. Any expression you pass to it will be implicitly coerced to a boolean.
Speaking of implicit coercion of values to type boolean, JS has lists of which values it considers "truthy" or "falsy".
*/

/*
Scope is a collection of variables as well as the rules for how those variables are accessed by name.
Only code inside a function can access that function's scoped variables.
The same variable name can appear in different scopes. Within the same scope, a variable name must be unique.
*/

function one() {
  // this `a` only belongs to the `one()` function
  var a = 1
  console.log(a)
}

function two() {
  // this `a` only belongs to the `two()` function
  var a = 2
  console.log(a)
}

one() // 1
two() // 2

/*
Scopes can be nested. Code inside the innermost scope can access variables from the outer scopes.
Lexical scope rules say that code in one scope can access variables of either that scope or any scope outside of it. LEX LOOKS OUTSIDE
*/
function outer() {
  var a = 1

  function inner() {
    var b = 2

    // we can access both `a` and `b` here
    console.log(a + b) // 3
  }

  inner()

  // we can only access `a` here
  console.log(a) // 1
}

outer()
