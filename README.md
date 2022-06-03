# MasterBUY



---------
## Project Structure
Independently designed a fully functional website, MasterBUY, as an open-source project, to help users purchase products through a user-friendly front-end and help the admin user manage products available on the website and customers’ orders. The website was developed with a scalable backend and connected to a payment gateway (PayPal). The used languages/Techniques are HTML and CSS, and user interactivity by JavaScript, implement frontend using React and Redux and build a web API using Node Js and MongoDB.


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
4. Add Redux to Home Screen.
      ![Parts](https://github.com/rodaw92/MasterBUY/blob/main/redux_store.png)
6. Connect to MongoDB.
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
1. https://stackoverflow.com/
2. https://reactjs.org/
3. https://redux.js.org/
4. https://nodejs.org/en/
5. https://mongoosejs.com/
6. https://jwt.io/
7. https://www.npmjs.com/package/bcryptjs
8. https://www.mongodb.com/
9. https://developer.paypal.com/
10. https://www.emailjs.com/
11. https://www.npmjs.com/package/multer
12. https://code.visualstudio.com/
13. https://nodemon.io/
14. https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodbd2a7aa593c57/
15. https://www.npmjs.com/package/express-async-handler
16. https://www.npmjs.com/package/body-parser
17. https://www.npmjs.com/package/bcryptjs
18. https://www.npmjs.com/package/multer
19. https://jmeter.apache.org/download_jmeter.cgi
20. https://github.com/undera/jmeter-plugins-webdriver)
