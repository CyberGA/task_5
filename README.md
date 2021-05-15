#**ZURI TASK 5**


The project url is (https://user-server-app.herokuapp.com/)

#API Endpoints
 REQUEST  | ENDPOINTS | ACTION | SAMPLE 
 ------------- | ------------- | ------------- | ------------- |
 GET  | ("/")  | Homepage/Landing Page  | https://user-server-app.herokuapp.com/  
 GET  | ("/users")  | Get all users  | https://user-server-app.herokuapp.com/users  
 POST  | ("/create/user/:name/:email/:country")  | To add new user data (postman) | https://user-server-app.herokuapp.com/create/user/Ivy/ivy@outlook.com/Nigeria
 PUT  | ("/update/user/:newName/:oldName")  | To update existing user (postman)  | https://user-server-app.herokuapp.com/update/user/Precious/Ivy
 DELETE  | ("/delete/user/:name")  | To delete a specific user  | https://user-server-app.herokuapp.com/delete/user/Precious
 DELETE  | ("/delete/users")  | To delete all users  | https://user-server-app.herokuapp.com/delete/users
