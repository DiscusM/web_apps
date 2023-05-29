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


Lastly lets shutdown the container with command `docker rm -f simple-server`

That concludes first assignment.


