//https://app.pluralsight.com/player?course=js4cs&author=shawn-wildermuth&name=js4cs-m1-basics&clip=11&mode=live

//Function Parameters
	//no overloading - last definition of a function will overwrite any previous definitions, any calls with less parameters will treat the missing parameters as "undefined"
	function foo(one) {
		alert("first");
	}

	function foo(one, two) {
		alert("second");
	}

	foo(1); // will call 2nd defintion "second"- two is undefined

	//arguments object
	//you could define your function with no parameters but calling the function with parameters is fine as JS will add them to the arguments object for you to access using the arguments keyword
	function foo(one, two, three) {
		alert(arguments.length);
	}

	foo(1); //1
	foo(1, 2); //2
	foo(1, 2, 3); //3
	foo(1, 2, 3, 4); //4

	function foo() {
		alert(arguments.length);
	}

	foo(1); //1
	foo(1, 2); //2
	foo(1, 2, 3); //3

	//accessing the values
	function foo() {
		for (var x = 0; x < arguments.length; x++) {
			alert(arguments[x]);
		}
	}

	foo(1);		//alert: 1
	foo(1, 2);	//alert: 1, alert: 2
	foo(1, 2, 3);	//alert: 1, alert: 2, alert: 3

	//parameters are for mapping to arguments

//Functions that Return Values
	//all functions return a value
	//if not defined it's 'undefined'
	function foo() {
	}
	var x = foo(); //typeof is "undefined"

	function foo() {
		return;
	}
	var x = foo(); //typeof is "undefined"

	function foo() {
		return "";
	}
	var x = foo(); //typeof is "string"

//Function as an Object
	function log(s) { alert("yup"); }
	var x = log.length;		// length returns number of parameters - 1 parameter
	var y = log.name;		// "log" - this is Non-Standard - doesn't work the same across all browsers
	var z = log.toString;		// "function log(s) { alert("yup"); }" string representation of entire function

	var f = function (s) { alert("yup"); }
	var x = f.length;		// length returns number of parameters - 1 parameter
	var y = f.name;		// "log" - this is Non-Standard - doesn't work the same across all browsers
	var z = f.toString;		// "function log(s) { alert("yup"); }" string representation of entire function

	//to call it you can use the variable name
	f(1);

//What is 'this'
	//"this" returns the owner of the function
	var f = function () {
		alert(this);
	};

	f();	// [Object Window]

	var obj = {
		name: "myObj",
		myFunc: function () {
			log(this.name);
		}
	};

	obj.myFunc(); //obj is owner of function myFunc - as it is accessing the name property of the owner this line will return "myObj"

	//bind() lets you change the owner
	var obj = {
		name: "myObj",
		myFunc: function () {
			log(this);
		}
	};

	obj.myFunc();					//this == obj

	var f = obj.myFunc.bind(this);	//Copy Function to global

	f();							//this == global object

//Closures
	var x = 1;

	function someFunction() {
		//Works as it wraps 'x' with a closure - creates a reference to x;
		var y = x;
	}

	// call someFunction Much later
	someFunction();

//Scoping
	//in c#
	var a = "Hello";

	if (true) {
		var b = a; //this works
	}

	var c = b; //this doesn't work as b is not in scope

	//javascript
	var a = "Hello";

	if (true) {
		var b = a; //this works
	}

	var c = b; //this works as the {} doesn't create a scope

	var a = "Hello";

	function() {
		var b = a; //this works (closure)
	}

	var c = b; //this doesn work as functions define scope

//Namespaces
	//anonymous self-executing functions - to protect the global namespace
	function () {
		var appName = "foo";
		var compileTime = new Date();

		function printAppInfo() {
			return appName + " : " + compileTime;
		}
	}	// Hides it all but no way to execute it

	console.log(printAppInfo()); //doesn't work as it is out of scope (functions define scope)

	(function () {
		var appName = "foo";
		var compileTime = new Date();

		function printAppInfo() {
			return appName + " : " + compileTime;
		}
	})(); //creates anonymous function - Executes it to run the body immediately

	console.log(printAppInfo()); //still doesnt work - out of scope

	(function (w) {
		var appName = "foo";
		var compileTime = new Date();

		function printAppInfo() {
			return appName + " : " + compileTime;
		}
	})(window); //creates anonymous function - Executes it to run the body immediately

	console.log(printAppInfo()); //does work - as copied to global window

	//Construct or Import Namespace
	var MyNampspace = MyNampspace || {};	//make it the existing name of the namespace incase it has already been declared or create it is an empty object declaration
											
	MyNampspace.Models = MyNampspace.Models || {}; //create or reuse Models namespace

	MyNampspace.Models.Customer = function () {
		// ...
	};

//
	(function(ns) {
		var currentDate = new Date();

		ns.currentTIme = function () {
			return currentDate;
		};
	})(window.MyNampspace = window.MyNampspace || {});

	//window is a keyword that refers to the global scope