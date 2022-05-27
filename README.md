# MasterBUY


![Parts](https://github.com/rodaw92/Aerospace-Ontology/blob/main/bloom%20client.png)

---------
## Project Structure
MasterBUY is a fully functional website designed to help users purchase through it by a userfriendly frontend and to help the Admin user manage products, which are available on the website,
and customers’ orders. The website developed with a scalable backend and connected to a payment gateway (PayPal). The used languages/Techniques are HTML and CSS, user interactivity by
JavaScript, implement frontend using React and Redux, build a web API using Node and MongoDB.


## Techniques and developing Languages:
1. HTML5 and CSS3 including flexbox to design website.
2. JavaScript to make dynamic pages.
3. React.JS to implement a fully functional Ecommerce frontend like sign-in,cart etc.
4. Redux to manage the state of whole application in a predictable manner.
5. Node.JS and Express JS to build a scalable backend in measurable way “web server, API”.
6. Mongoose object data mapper to model data and create relationship between them.
7. JSONwebToken ‘JWT’ to authenticate users and http requests.
8. Bcryptjs to encrypt the passwords in the Database.
9. MongoDB to create and managed cloud-based database to save and retrieve data like products, orders, and users.
10. Payment API to make real payment on the website.
11. EmilJS to send payment notification to use.
12. Multer to upload files.

### Important functional requirements:
1. Create React App.
2. Create Node.Js Server
3. Fetch server Data
4. Add Redux to Home Screen
![Parts](https://github.com/rodaw92/Aerospace-Ontology/blob/main/bloom%20client.png)
6. Connect to MongoDB
![Parts](https://github.com/rodaw92/MasterBUY/blob/main/mongodb.png)
7. Create Place Order API
    
### Testing Results:
I used JMeter to test my website ability to handle high number of requests coming at the same time
(high-traffic).
Single Page Applications behavior is totally varied than typical web applications. During the
homepage load, all the objects will be loaded to the Document Object Model. Further navigation in
the application is purely based on how the application is designed.
1. When I recorded test results for my Application in JMeter using web protocols after running
testing plan for 2 minutes, it captured only the service calls, which is not the actual
communication between the client and the server in React application.
2. I made a client-side performance analysis using WebDriver sample. Firstly, I created a test plan
then a thread group represents the users and defined in it the number of expected
users(thread)=10, ramp up period=20 and make a loop count equal to 3. After that I created
WebDriver Sampler and in script section defined “http://localhost:3000” as tested client. Then I
added a config element for Chrome Driver Config and set the pat to chromedriver.exe as a
default driver. I added a listener as view results tree. Finally run the test plan.
3. I run the plan for more than 3 minutes and the response message of each request was ‘OK’ with code= 200, which means that the request sent successfully,
4. The load time & latency time. Here I consider these two fields only because these are the values, I need to use for analyzing my website performance:
    . Latency time is number of seconds taken to get the first initial response from the server for each request, which was 0 means that my server was in his ideal state for receiving the request and serving it.
    . Sample time is the time taken by the server to fully serve the request. Here I noticed that this time varies between the requests according to how many requests received by the server at the same time. At the very first requests the server takes longer to serve them and being faster on the last requests.
5. I tested all APIs in my application using developer tools feature in chrome web browser, by viewing XHR requests which received by the browser, where each service call will return its output in JSON format.

## References
1.  https://github.com/neo4j-labs/neosemantics
2.  https://neo4j.com/labs/neosemantics/4.0/
3.  https://neo4j.com/labs/neosemantics/4.0/config/
4.  https://neo4j.com/labs/neosemantics/4.0/import/
5.  https://medium.com/@hazzindu/import-ontology-to-neo4j-d3524f5e47dd](https://www.w3schools.com/
6. https://stackoverflow.com/
7. https://reactjs.org/
8. https://redux.js.org/
9. https://nodejs.org/en/
10. https://mongoosejs.com/
11. https://jwt.io/
12. https://www.npmjs.com/package/bcryptjs
13. https://www.mongodb.com/
14. https://developer.paypal.com/
15. https://www.emailjs.com/
16. https://www.npmjs.com/package/multer
17. https://code.visualstudio.com/
18. https://nodemon.io/
19. https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodbd2a7aa593c57/
20. https://www.npmjs.com/package/express-async-handler
21. https://www.npmjs.com/package/body-parser
22. https://www.npmjs.com/package/bcryptjs
23. https://www.npmjs.com/package/multer
24. https://jmeter.apache.org/download_jmeter.cgi
25. https://github.com/undera/jmeter-plugins-webdriver)
