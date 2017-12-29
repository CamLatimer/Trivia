#Trivially: Node, Full Stack JS Trivia Game Site

[View a live demo of the project's current progress here.](https://still-ridge-33795.herokuapp.com/)

This is a site that lets users answer trivia questions and tracks their accuracy, leaning on the Open Trivia Database API to get questions.  Feel free to give constructive feedback.  I put this together as something fun to do on my own and keep learning and practicing.    

Tools used include Express for the back end, MongodB and Mongoose ODM and Mongoose Connect for user and session storage, and EJS and React for the front end.  I also use a combination of Gulp and Webpack for the build process.  

To see how things run for yourself locally, you can clone the repo and check out the development version. Make sure you get these first: Node, Gulp installed globally, and your own MongoDb setup. Then proceed like this:

a.) After cloning the repo, cd into it and get the dependencies:

`yarn install` or `npm install`

b.) Create a .env file and set a variable, MONGOURI, to your database's URI, just like this:

`MONGOURI=http://whereveryourdatabaseis:12345`


c.) Check out the development version by running `gulp` from the terminal.  Let the terminal output tell you the servers are up, you're connected to the database, and Webpack compiled your JS. Then check out http://localhost:3000 in your browser.    

You should be good to go from there.  Thanks for checking it out.
