/* Let's not just "avoid using the global scope" and forget it.

With respect to browser-executed applications:

If we're using ES Modules, these files are loaded individually by the JS environment, meaning an HTTP request is made for each imported module.

If we're using a bundler in our build process, however, all modules are concatenated into a single file before it's delivered to the browser.

If we're using different <script> tags for different JS files, then each one has their top-level variable declarations ending up as global variables.
*/

/*
BROWSER "WINDOW"

Say we have a js file loaded in an inline <script src="..."> tag in a web page in a browser, or even have the code between <script> tags, or even a dynamically created <script> tag.

A global object property can be shadowed by a global variable.
*/

window.something = 42

let something = 'Kyle'

console.log(something)
// Kyle

console.log(window.something)
// 42

/*
That's some shitty coding. People will be pissed.

This confusion can be avoided by using only var declarations for globals. Leave let and const for block scopes.
*/

window.something = 42

var something = 'Kyle'

console.log(something)
// Kyle

console.log(window.something)
// Kyle

/*
A DOM element with an id automatically creates a global variable that references it.
*/
<ul id="my-todo-list">
   <li id="first">Write a book</li>
   ..
</ul>
<script>
first;
window["my-todo-list"];
</script>

/*
my-todo-list is only accessible through the global object window via bracket notation, because its identifier is not a valid lexical name.

This is legacy, though. Don't use it.
*/

/*
Web Workers are a web platform extension on top of browser-JS behavior, which allows a JS file to run in a separate thread from the thread that's running the main JS program.

Web Worker code has no acces to the DOM (meaning it has no window global object), however some Web APIs are made available to them, such as navigator.

The Web Worker's global object is self.

*/
var studentName = "Kyle";
let studentID = 42;

function hello() {
    console.log(`Hello, ${ self.studentName }!`);
}

self.hello();
// Hello, Kyle!

self.studentID;
// undefined

/*
ES6 introduced support for the module pattern.

Consider this:
*/
var studentName = "Kyle";

function hello() {
    console.log(`Hello, ${ studentName }!`);
}

hello();
// Hello, Kyle!

export hello;

/*
studentName and hello, in this case, are not global variables, but "module-wide" (or "module-global").

In a module there's no implicit module-wide scope object, either.

However, all variables that exist in the global scope (we're talking about browsers here) are accessible from inside the module's scope.
*/

/*
Node treats every single .js file as a module, including the one you start the Node process with. The practical effect is that the top level of your Node programs is never actually the global scope.

This is a CommonJS module, which Node supported before ES Modules came up:
*/
var studentName = "Kyle";

function hello() {
    console.log(`Hello, ${ studentName }!`);
}

hello();
// Hello, Kyle!

module.exports.hello = hello;

/*
Before processing, Node wraps such code in a function, so that the var and function declarations are contained in that wrapping function's scope, so that they're not treated as global variables:
*/

function Module(module,require,__dirname,...) {
    var studentName = "Kyle";

    function hello() {
        console.log(`Hello, ${ studentName }!`);
    }

    hello();
    // Hello, Kyle!

    module.exports.hello = hello;
}

/*
Node then invokes that Module() wrapping function to run our module.

So the require() function is not actually a global variable, but a parameter of the Module() function declaration.

Such another parameter is "global". And global contains a reference to the global object:
*/

global.studentName = "Kyle";

function hello() {
    console.log(`Hello, ${ studentName }!`);
}

hello();
// Hello, Kyle!

module.exports.hello = hello;

/* So global is not defined by JS, but by Node itself */

/*
ES2020 defined a standardized reference to the global scope object: globalThis.

That's a sucky name because there's no such thing as a global "this" binding. But whatever...

Here's a globalThis polyfill for older engines:
*/

const theGlobalScopeObject = 
(typeof globalThis != 'undefined') ? globalThis :
(typeof global != 'undefined') ? global :
(typeof window != 'undefined') ? window :
(typeof self != 'undefined') ? self :
(new Function('return this'))()