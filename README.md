# matti_seiteri_web_apps

Hello! This is my blog that I will update as I progress through the Web development course.

## Assignment 0: Introduction

First task was to take a dip into various different technologies that will give you basic understanding about what web development really is. There was articles and videos about databases, frameworks, scaling, backend and Docker. I will quicky go through most important things about them.
- JSON is lightweight data-interchange format and it is used to send data back and forth to server in text format.
- REST is architectural style and HTTP is one notable technology that uses REST.
- MongoDB is non-relational database, which means joints cannot be used to connect database's tables. Non-relational databases also are easier to scale and perform better.
- Vertical scaling is increasing hardware of single server ie. increasing RAM, faster CPU
- Horizontal scaling is increasing amount of servers ie. having 4 instead of 2 servers. 
- Docker is very useful in web development. Containers help developers by giving chance to isolate processes and applications, and also eliminating bugs that might appear if applications were made only in local machines.

That was my biggest gettings from the first part of the course and now it is time to get into first assignment.

## Assignment 1: Hello World!

Okay first lets make and fill with tutorial the three required files server.js, package.json and Dockerfile. Nothing too hard there.

Then we build and run our docker with:

`docker build -t test/simple-web-server .`

`docker run --name simple-web-server -p 3000:3000 test/simple-web-server`

We can the open our browser and go to localhost:3000

![Hello world](/images/1.png)

Looks to be working fine.

Lastly lets shutdown the container with command `docker rm -f simple-web-server`

That concludes first assignment.

## FullStackOpen 0

Okay the now we will start the main part of the course: The FullStackOpen net-course. It has total of 13 parts, but our aim is complete the 7 first parts. Without further ado let's head into part one.

## FullStackOpen Part1: React Basics

### CourseData

First real task was to make app to show coursedata in web page. The result was looking like this: 

![CourseData](/images/2.png)

In this first task we learned about components, variables, functions and tables. We also learned that you cannot render whole object, but you should render it's attributes separately.

### Unicafe

Second task of part 1 was to make app that collects feeback. App also show stats for feedback given. 

![Anecdotes](/images/4.png)

We learned about conditional rendering to not show stats if no votes are given yet. Also we learned not to declare component insede another componet.

### Anecdotes

Third assingment of part 1 was to make app that gives random anecdote and you can vote them. App also shows anecdote with most votes. 

![Anecdotes](/images/3.png)

We manged to make this with by knowledge learned from previous tasks. 

## FullStackOpen Part2

### CourseData 2

We started second part of fullstackopen by modifying our coursedata task from part 1. We separated components into their own files and the imported them as modules where they were needed. We also learned how to use mapping. 

![CourseData](/images/5.png)

### PhoneBook

In this phonebook assignment we learned some backend with json server. We can use command `npx json-server --port=3001 --watch db.json` to open server. In code we used effect hook to get all saved contacts from server to the app. We also used css to get custom notification popup when new contact was added to the phonebook.

![CourseData](/images/6.png)

## FullStackOpen Part3

Link to my phonebook app https://web-apps-btns.onrender.com/




