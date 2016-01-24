//Practical Application
//Strictness
(function () {
	"use strict";

	var x = "hello";	//works in strict mode
	y = "good bye";		//doesnt work in strict mode
	var x = {name: "me", name: "us"};	//exception - duplicate object properties
	var s = "hello";
	s.length = 4;						//exception - writing to read-only properties
	var func = (function () {
		arguments = [];					//exception - modifying arguments Object
	})();

	return;
})();
//unscript code allowed here

//Iteration
(function () {
	var a = ["one", "two", "three"];
	for (var o in a) {
		console.log(o);		//o is the index of the item
	}

	for (var o in a) {
		console.log(a[o]);		//a[o] is the value of the item - for .. in is useful if you want to look at the properties of an object
	}

	//below for does the same as above
	for (var o = 0; o < a.length; o++) {
		console.log(a[o]);
	}

	return;
})();

//nature of Javascript APIs
//duck typing means construction of ad-hoc objects instead
var svr = new SmtpClient();

//Call method
svr.send(
	{
		to: "shawn@foo.com",
		from: "shawn@foo.com",
		body: "Hello",
		subject: "Test Msg"
	}
	);

//commonplace to accept an object and have defaults too
svr.send({
	to: "shawn@foo.com",
	body: "Hello",
	subject: "Test Msg"
});
//from is implied but can override - code inside send will use a default setting

//Implementing default properties
function SmtpClient() {}

SmtpClient.prototype.send = function(msg) {
	if (!msg.hasOwnProperty("to")) {
		msg.to = "shawn@foo.com"
	}

	if (!msg.hasOwnProperty("mailServer")) {
		msg.mailServer = "smtp.foo.com";
	}

	var to = msg.to;
};

//using jQuery extend
SmtpClient.prototype.send = function (msg) {
	var defaults = {
		to: "shawn@foo.com",
		mailServer: "smtp.foo.com"
	};

	$.extend(defaults, msg);
	//jQuery - extend
	//take me default object and add all the msg properties to my default
	//if the property already exists on default replace it
	//if the property doesn't exist on default add it

	var to = defaults.to;
};

//Handle events - passing in callbacks
svr.send({
	from: "shawn@foo.com",
	body: "Hello",
	subject: "Test Msg",
	complete: function (r) {
		alert("Success: " + r);
	},
	error: function (e) {
		alert("Failed: " + e);
	}
});

//Architecting Large Codebases
//1. isolate scripts with namespaces
	//page has two js files
	//first js
	(function (ns) {
		ns.Customer = function () {
			this.name = "";
		};
	}(window.WilderMinds = window.WilderMinds || {}));

	//second js
	(function (ns) {
		ns.Order = function (id, custName) {
			this.id = id;
			this.customer = new ns.Customer(custName);
		};
	}(window.WilderMinds = window.WilderMinds || {}));

	//first file adds Customer "class" and second adds Order "class" to WilderMinds namespace

	$(function () {
		var o = new WilderMinds.Order(1, "A Customer");
		alert(o.id);
		alert(o.customer.name);
	});

//2. RequireJS - Asynchronous Module Definiation (AMD) pattern
	//dependency injection for js
	//load scripts as they are needed instead of all at the start
	//main.js
	require(["Customer"], //Requires the Customer Module
		function (Customer) { //Call with required Modules - called after all required modules loaded
			//Initialisation code
			var c = new Customer("A Customer");
			var name = c.name;
		}
	);

	//Customer.js
	//define modules
	define( [], //Required Scripts (none)
		function () { //gets any required modules like main
			function Customer = function () {
				this.name = "";
			};

			return Customer; //Return the object that Requires constructor to allow you to call it
		}
	);

//Compiling Javascript Code
	