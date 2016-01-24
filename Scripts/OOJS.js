//Dynamic Objects
	//dynamic object - creation
	var cust = new Customer()
	{
		Name: "Shawn",
		"company name": "Wilder Minds",
		address: {
			streetAddress: "123 Main Street",
			cityState: "Atlanta",
			stateProvince: "Georgia",
			postalCode: "12345",
			country: "USA"
		}
	};

	//dynamic objects - properties
	//dot syntax 
	//bracket syntax

	var name = cust.name;
	var name2 = cust["name"];

	var company = cust."company name"; //wont work
	var company = cust.["company name"]; //have to use bracket syntax has it was defined with ""

	var addr = cust.address; //can get child objects
	var city = addr.cityState; //and access their proprerties
	var city2 = cust.address.cityState;	//or follow the path down from the main object to access properties of children objects

	//dynamic malileability
	//javascript can add members on the fly - as c# can with ExpandoObject
	var cust = {
		name: "Shawn"
		"company name": "Wilder Minds"
	};

	cust.phone = "404-555-1212";	//added new phone property
	cust.call = function () {
		var toCall = this.phone;	//add new call function that uses the phone property defined in line above
	};

//"Classes" in Javascript
	//no such thing as a "Class" in javascript - but you can mimc them with some effort
	
	//Constructor syntax
	function Customer(name, company) {			//Customer is going to treated as class
		this.name = name;
		this.company = company;
	}

	var cust = new Customer("Shawn", "Wilder Minds"); //new keyword - used to find a function called Customer to return an object that contains the shape as defined in the function
	var name = cust.name;

	//member functions of "Classes" work as expected
	function Customer(name, company){
		this.name = name;
		this.company = company;
		this.sendEmail = function (email) {console.log(email)};
	}

	var cust = new Customer("Shawn", "Wilder Minds");
	cust.sendEmail("my email");

	//private using closures
	function Customer(name, company){
		//public
		this.name = name;
		this.company = company;

		//non-public (e.g. private) using the var keyword!
		var mailServer = "mail.google.com";

		this.sendEmail = function (email) {
			sendMailViaServer(mailServer);
		};
	}

	//Properties
	//special syntax.. only use as necessary
	function Customer(name) {
		var _name = name;

		Object.defineProperty(this, "name", {
			get: function () {return _name;}
		});
	}

	var cust = new Customer("Shawn");
	var name = cust.name; //read only

	//setter is similar
	function Customer(name) {
		var _name = name;

		Object.defineProperty(this, "name", {
			get: function () {return _name;},
			set: function(value) { _name = value;}
		});
	}

	//normally just use fields but when you need to run code in the getting or setting of fields than use the above syntax, or when you need read only or write only props

	//Static members
	function Customer(name, company){
		this.name = name;
		this.company = company;
	}

	Customer.mailServer = "mail.google.com";

	var cust = new Customer();
	var svr = cust.mailServer;	//NOPE - cant access it on an instance
	svr = Customer.mailServer;

//Prototype Object
	
	function Customer(name, company){
		this.name = name;
		this.company = company;
	}

	//Works but you don't have access to private/member data of instance
	Customer.send = function(email) {};

	//instead use protoType which Gives access to each instance of Customer
	Customer.prototype.send = function(email) {};

	var cust = new Customer("Shawn");
	cust.send("shawn@foo.com"); //WORKS - body of send can access any data available to that customer

	//same for sharing data
	function Customer(name, company){
		this.name = name;
		this.company = company;
	}

	//Works but you don't have access to private/member data
	Customer.prototype.mailServer = "mail.google.com"; //property being on the prototype means its value is Shared amongst all instances, the property being in the constructor means the data is specific for that instance
	Customer.prototype.sendEmail = function (msg) {
		var svr = this.mailServer;
	};
	
	var cust = new Customer("Shawn", "Wilder Minds");
	cust.sendEmail("Hey buddy");

//Inheritance in Javascript
//basic inheritance
	function Animal(foodType) {
		this.foodType = foodType;
	}

	Animal.prototype.feed = function() {
		alert("Fed the animal: " + this.foodType);
	}

	var a = new Animal("None");
	a.feed();
	var test = a instanceof Animal; //true

	function Cow(color) {
		this.color = color;
	}

	//Inheritance using prototype
	Cow.prototype = new Animal("Hay");

	//when creating a cow call Animal first with some state data and then call the constructor for Cow
	var c = new Cow("White");
	c.feed();						// "Hay"
	var test = c instanceof Animal;	// true
	var test2 = c instanceof Cow;	// true

	//abstract classes
		//can create fake abstracts with some caveats
		//create as abstract as an object
		var Animal = {
			foodType: "None",
			feed: function () {
				log("Fed the animal: " + this.foodType);
			}
		};

		var a = new Animal(); //Fails (not a constructor) - animal is actually an object

		function Cow(color) {
			this.color = color;
			this.foodType = "Hay";
		}

		//Inheritance of abstract type
		Cow.prototype = Animal;

		var c = new Cow("White");
		c.feed();						// "Hay"
		var test = c instanceof Animal; // error - cant test for type if it was defined as an object
		var test2 = c instanceof Cow;	// true

//Interfaces
	//not necessary as loosely type lang - just get farmiliar with Duck Typing
	//Duck typing is a concept
	//	looks like a duck	
	//	smells like a duck
	//	walks like a duck
	//	it is a duck
	
		function sendEmail(r) {
			var to = r.email;
			var name = r.name;
		};

		//object has properties
		var Owner = {
			name: "Shawn",
			email: "shawn@foo.com",
			phone: "404-555-1212"
		};

		sendEmail(Owner); // works  as Owner has email and name fields

		//class has properties
		function Customer(name, email) {
			this.name = name;
			this.email = email;
			this.balance = 0;
		}
		var c = new Customer("Bob", "bob@foo.com");
		sendEmail(c); // also works - contract is a method not a type as in C#
	
//Reflections
	//object Reflections
		var cust = {
			name: "Shawn",
			"company name": "Wilder Minds",
			sendEmail: function() {
			}
		};

		for (var prop in cust) {
			alert(prop);		//property name
			alert(cust[prop]);	//property value
		}

	//detecting properties
		var c = new Customer();

		var has = c.hasOwnProperty("name");
		var isEnum = c.propertyIsEnumerable("name");

//Extension Methods
	//prototype can be used to add extension methods
		Array.prototype.calculateCount = function() {
			return this.length; //this to access property of object that is being extended
		};
		
		var a = ["one", "two"];
		var count = a.calculateCount();

//Patterns for Javascript Objects
	//Object creation patterns
		//Prototype Pattern - as seen above
		//Module Pattern
		//Revealing Prototype Pattern
		//Revealing Module Pattern
		//etc