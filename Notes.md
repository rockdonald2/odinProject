# Notes

## 1. Introduction

### 1.1 How does the Web work?  

**What is the Internet?**

The internet is, in simplest terms, nothing more than networks of computers that are inter-connected, via these networks information can be exchanged.

The internet is a technical infrastructure on which individual computers connected to it can share information with each other.

The Web which we use to access information, in forms of webpages and websites, is built on this infrastructure, but the internet than only the mentioned documents.

On the internet, disregarding what we first imagine about it, computers are connected via cables, which are buried underground or under the sea. On this network, few computers have specific names assigned to them:
- clients;
- servers;
- routers;
- modems;
- ISPs;
- name servers;

<u>Clients</u>  
A client is an internet-connected device that requests some information from a server. We, as normal people browsing the internet, are clients, and when we enter a website's URL into our browsers' address bar, we make a request for a copy of that website's information.

<u>Servers</u>  
A server is an internet-connected computer which handles the clients' requests. Therefore, its job is to receive the request from the client, to interpret the data in the request, and finally to send an appropritate response with the correct data. These servers, store websites, webpages or even apps.
When we search on the internet for a website, we access a server through our browser, the browser makes a request for that website's data, and the server sends back a copy of the website, which our browser can display for us.

<u>Routers</u>  
When to computers need to communicate with each other they either have to be connected via a cable, thus physically, or wirelessly, through WI-FI or Bluetooth. This connection is not limited to two computers, infinitely amount of computers can be inter-connected this way, but things get very complicated fairly quickly.
Routers come into place to simplify things. When we have many computers each of them have to be physically connected to the other via a cable, so if we have a network of 10 computers, each computer will need 9 plugs to connect to the other 9 computers. But, if we use a router, every computer on this network will be connected with a single cable to this router, but through this special computer any computer can send information to any other.
This way, we only need one plug per computer for an individual connection to the router. Also, a router has another important task to carry out, it ensures that when we send data from one computer to another, it is sent to the right place.
Because a router is just another computer in this network we can connect one router to others routers, so our network is infinitely scalable. 

<u>Modems and ISPs</u>  
But, when we talk about routers in this sense, we only talk about a local network, because in this world computers need to be physically connected via a cable to the mentioned router. Fortunately, we now have cables running in and out from our homes: electricity, telephone cables, and all the others. So, if we could transform our data that we exchange through our cables into a form that is managable by the telephone infrastructure we could connect to anyone. This transformation is the modem's job. The modem turns the information from our network into another form that is managable by the mentioned infrastructure. Via the telephone wires, our information that was sent to a destination computer reaches our ISP, our internet provider. Our ISP have its own routers, which can access others ISPs' routers, so our information can reach any destination.

<u>Name servers</u>  
We haven't talked about a few things up until this point, and the thing we need to cover next is IP addresses. In our network, every computer has an IP address associated to it, through this unique number computers can be indentified. That is, when we send information from one computer to another on our network, our computers simply say that it sends some data, in forms of packets, which are little chunks of data, from one address to another. Things get more complicated when we send our data outside our own local network.
When we make a request from our browser to a website, which we want to load and browse, the first thing we ask for is the website files, that are going to be rendered by our browser. But, following the path that we described earlier, our computer sends one response to our router, to send some data to a destination IP address, but our router makes another request to another router to access the destination. Each and every new request adds another layer to our initial request. These layers mainly include that from which address the data is sent to which, and what data. This way, when we finally reach our destination, the response isn't going to be sent directly to our computer, on which we made our initial request, but the latest node in the network. So, it bounces back, and peals one layer at a time.
But, it would be hard to remember lengthy IP addresses to connect to websites, this is the reason why name server were invented. Name servers are the phonebooks of the internet, because we access website through their domain names, and the name servers job is to interpret this domain, and translate that into a connenctable IP address. Through name servers we can easily know on which server a webpage is hosted.
There're different name servers, and each level has its own purpose:
- resolving name server;
- root name server;
- TLD name server;
- authoritative name server;

---

Furthermore, there are a few important terms which we need to remember:
- webpage;
- website;
- web server;
- search engine;
- web browser;

**Webpage** is a document which can be displayed in a web browser. Such documents are written in HTML, but it can contain other information as well, such as style information, that control how webpages feel and look, scripts, that make webpages interactive, and other media files.  
**Website** is a collection of webpages that are in some way grouped together.  
**Web server** is a server on which we host webpages and sites.  
**A search engine** is a special kind of website on the internet that we can use to find other webpages and sites.  
**Web browser** is a program on our computer that is capable of displaying webpages.  

---
<u>What are the packets?</u>
On the internet information is exchanged in packets, because it is simply more efficient, than to do it otherwise. When we want to load up a video on Youtube, the video isn't loaded all at once, but it is loaded progressively. So, when we send a request and get an appropriate response back, the data that is being sent back, is broken up into thousands of little chunks of data, that are rebuilt on our side.  
That is packets are the information of the internet, a format in which the information can be exchanged. Packets are sent from the sender to the receiver in a specific format that contains all the information needed to communicate.  

---

### 1.2 Git

Git is a version control system, a program which runs locally on your computer, and tracks changes in files and directories, but more importantly, it stores a historical record of changes. This enables you to revert to any previous file or directory states, that is you can recall files and directories, but you can also track how your project grows throughout its development cycle. That is, you can also track how modified the files, which lines they modified, what may cause problems, and so on. The list is endless.  

### Different types of version control systems

<u>Local VCS</u>  
It is a program that has a simple database that keeps all the changes to files under revision control.  
The important thing to remember is that, that it doesn't store whole files, but patches, that is the difference between file states, so it can re-create files by adding up all the patches.  
In brief, local VCS is a local database of file changes, but we cannot share this with other users of those files.  

<u>Centralized VCS</u>  
It is really similar to the previous type, but with one clever difference. The patches aren't stored locally, but on one server. That is, it enables for user to collaborate to the same project, and keeps track of any changes to files under revision. But, essentially it is the very same thing as the previous, this means, only one copy of the patches are stored, on a server, but many problems about this type of VCS arises from this design decision.   

<u>Distributed VCS</u>  
Distributed VCS solve all the problems from which centralized ones suffer. The main idea is, that each individual collaborator to a project stores a copy, a clone of the whole project locally, tracks all of its changes, but another copy is stored freely available on a server too, to which individual collaborators push their respective files. So, it simply combines local and centralized VCS very cleverly. There is one version database on the server, and individual databases locally on collaborator computers.  

### Important terminal commands

Terminal commands:
	ls - lists all of the folders 
	ls -la - lists all of the files 
	cd .. - returns one dir back 
	cd - enters a directory
	. - just install in the current directory 
	
On initial install:
	git --version - checks the version of the installed locally git
	git config --global user.name "Your Name" - sets up the name of the user 
	git config --global user.email "yourname@somemail.eu" - sets up the mail of the user
	git config --list - lists all the git configurations
	
For help on commands:
	git help <verb> (e.g. git help config) OR 
	git <verb> --help 
	
For initializing the project:
	git init - initializes the git repo in the current folder
	touch .gitignore - creates a git ignore file
	git status - check working tree - both on the git and on local 

Add files:
	git add -A - adds all of the files for commiting
	remember - git status - to check the state of the repo 
	
Remove files: 
	git reset - removes files to be commited 
	git reset somefile.js - removes somefile.js from the commit preparation
	
Committing:
	git commit -m "This is the commit message" - -m is used to add message
	
Check log:
	git log - renders commit ids, authors, dates
	
Clone a remote repo:
	git clone <url> <where to clone>

View info about the repo:
	git remote -v - lists infor about the repo
	git branch -a - lists all of the branches

View changes:
	git diff - shows the difference made in the files
	
Pull before push ALWAYS:
	git pull origin master
	
THEN PUSH:
	git push origin master - <origin> name of remote repo <master> the branch that we push to 
	
First time push of the branch:
	git push -u origin <name of the branch> - -u coordinates the two branches (local and on server)
	
Create a branch:
	git branch <name of the branch>

Checkout a branch:
	git checkout <name of the branch>

Merge a branch:
	git checkout master
	git pull origin master
	git branch --merged - see which branches are merged 
	git merge <name of the branch you want to merge>
	git push origin master 

Delete a branch:
	git branch -d <name of the branch> - this deletes it locally!!!
	git branch -a - check the repo branches 
	git push origin --delete <name of the branch> - this deletes it from the repo!


---


### 1.3 JavaScript fundamentals

- How do you declare a variable?
A variable in JavaScript is nothing more than a little data storage, a name assigned to a specific value.
We declare variables in JavaScript mainly by using the keyword **let, var and const**; but let and const are preferred; var behaves differently in some cases, that is, it enables **hoisting** for
example, where you can initialize a variable, before actually declaring it.
The important thing to remember is that when you declare a variable as a const, you must initialize it as well, and you cannot change its value after initialization. So it conveys the information that this data will not change throughout our application.  

- Which one should you use, and when?
As I said earlier we should use const when we declare a variable with a constant value, that won't change in our code.
In any other cases we should use let. Let allows use to change the variables value after declaring it. In all cases we should prefer let over var.  

- What are the rules for naming variables?
We can use any character, even non-english ones, but there are a few rules we need to remember while coding in JavaScript.
Variables cannot start with a digit, but it can contain arbitrary number of letters, digits and $, _ special characters.
Generally, we use camelCase in JavaScript and another rule is that when we declare a const that is known before run-time, we should name it in all uppercase, separating words with underscore (_).
Furthermore, we cannot use reserved keywords as variable names.  

- What are operators, operands, and operations?
We describe mathematical calculations, or any sort of calculation, or operations, inside code as expressions.
Expressions must have to parts:
	- operators;
	- operands;
Operands are the values, e.g. variables, constants, literals.
Operators on the other hand are the operations itself, e.g. addition, subtraction, multiplication, division, etc.
We use arbitrary combinations of operands and operators to calculate our values that we need.
The fact that we must remember when writing expressions, is the operator precendence. Generally, in JavaScript, expressions are evaluated 
from left to right, but operators with higher precendence are evaluated before operators with lower precendence.

- What is concatenation and what happens when you add numbers and strings together?
The important thing is that when you add together a string and any other type, the other type is casted into string, because when 
we use addition together with a string it is evaluated as concantenation, so the other value will be concatenated to our string.

- What are the different types of operators in JavaScript?
There are unary, binary and even tertiary operators in JavaScript, and we can tell them apart by counting how many operands a single expression with them
contains.
For example, the mathematical addition in JavaScript is a binary operator, because we need two operands to calculate their sum, e.g. 3 + 5.
On the other hand, the minus sign can be an unary and binary operator as well, same goes with the plus sign.
When we use the minus sign as a unary operator, e.g. -x, where x is a variable declared by let, it negates our operand.
We have only one tertiary operator in most programming languages, and in JavaScript as well, that is the conditional operator, 
(condition) ? (if condition is true, this part will be evaluated) : (else this).

- What is the difference between == and ===?
The difference between these two operators are unseemingly easy, the strict equality operator, ===, checks if the type and the value of
two operands are the same, returns true if they are the same, else false.
The equality operator, ==, only checks the value of the operands, therefore it can happen that the operands are from different types,
but their value are equal, such can happen with strings and numbers.

- What are the increment/decrement operators?
Increases the value of a variable by one, or decreases it by one.
The important thing to remember is that it also returns the value of the variable, prior or after the change.

- What is the difference between prefixing and post-fixing them?
It determines that we change the value of the variable before or after evaluating the expression.
E.g., when we write i++ + 1, we use first the initial value of i when adding up with 1, after that the value of i is increased by 1.
If we write ++i + 1, the incrementation happens first, and after that the value of i is added up with 1.
Also, it determines which value will be returned by the operator, the changed or the unchanged one.  