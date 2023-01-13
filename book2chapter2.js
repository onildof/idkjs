// outer/global scope: RED

var students = [
  { id: 14, name: 'Kyle' },
  { id: 73, name: 'Suzy' },
  { id: 112, name: 'Frank' },
  { id: 6, name: 'Sarah' },
]

function getStudentName(studentID) {
  // function scope: BLUE

  for (let student of students) {
    // loop scope: GREEN

    if (student.id == studentID) {
      return student.name
    }
  }
}

var nextStudent = getStudentName(73)
console.log(nextStudent) // Suzy

/*
A function's parameters belong to that function's scope.
A for's initialization clause belongs to that for's scope, if its variables are 
declared with let or const.

The compiler, when finding a variable declaration, figures out to which scope 
it belongs.

Steps (compilation):
Does var students already exist for this scope? 
  Yes? Ignore this declaration (we're not talking about ignoring the assignment, though!)
  No? Produce code for creating var students in this scope.

Steps (execution):
Is var (not let, const) students accessible in current scope, so I can assign to it?
  Yes? Initialize it to undefined, then assign the array to it.
  No? Look in outer scope.
    Found it? Initialize it to undefined, then assign the array to it
    Not found? 
      Is it a source reference? Then throw ReferenceError
      Is it a target reference?
        Strict mode? Throw ReferenceError
        Non strict mode? Create global var, initialize it to undefined, then assign to it.
*/
