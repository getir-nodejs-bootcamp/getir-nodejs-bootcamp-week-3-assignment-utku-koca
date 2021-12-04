# getir-nodejs-bootcamp-week-3-assignment-utku-koca

The project is a basic authentication. Users can only create, update and delete their accounts. Also, they can see other users or any user they want to see with their id's.

Array is used as a fake database. There are three middlewares which are logger, not-found and verifyToken.

- Logger middleware saves every coming request into content file.
- Not-found middleware handles any route which is note exist in the api.
- VerifyToken middleware controls if the user has valid token so that the user can make update, put, delete requests successfuly.

The reason there is a secret string in .env file is that webtoken method needs it to create token and validate if the token is valid.

To start the project, use following commands

npm install ==> install the dependencies
npm start ==> start to server

<br/>

End Points

GET METHODS

/api/v1/ ==> get all users  
/api/v1/:id ==> get specific user with id

<br/>
POST METHODS

/api/v1/register ==> register user (password, username, email)
/api/v1/login ==> login user (username, password)
<br/>

PATCH METHOD

/api/v1/ ==> update user
<br/>

PUT METHOD

/api/v1 ==> update user
<br/>

DELETE METHOD

/api/v1 ==> delete user
