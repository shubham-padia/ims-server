# IMS ( A Privacy Based Image Management System API with a voting system )

IMS is an Image Management System based on 3 Privacy Status for each image which also provides the feature of upvote and downvote for each image
* Public ( any unregisterd user can view the image ) - `0`
* Restricted ( only visible to the registered users ) - `1`
* Private ( only visible to the owner of the image ) -  `any numeric value except 0 & 1`

***NOTE*** : Voting System is disabled for private images 

This api is completely built from scratch and uses Express framework for Node.js and uses MongoDB for storing data.

## API Calls :

Be sure to set HTTP Content-Type Header to `application/json` except for the upload api for which set `enctype="multipart/form-data"`. All the necessary checks have been implemented at each endpoint to respect the privacy status of each image.

### SignUp
* `/api/signup` e.g
   
  ```json
  {
      "name": "John Doe",
      "username": "johndoe",
      "password": "dummy",
      "email": "john_doe@email.com"
  }
    ```

### Login
* `/api/login` e.g

  ```json
  {
    "username": "johndoe",
    "password": "dummy"
  }
  ```

### Upload
* `/api/upload` - supports jpg, jpeg and png mimetypes

following are the fields for the file upload
  * fileUpload - the fieldname of the file to be uploaded
  * desc - description of the image
  * privacy - privacy status of the image in numeric value

###  Get Image Info
* `/api/myImg` - sends a json array of all the images ( along with their info ) of the currently logged in user 
* `/api/userId/:userId`-
    * ***For a logged in user*** : Sends a json array of all the Public and Restricted images ( along  with their info ) of the specified user. 
    * ***For a guest user*** : Sends a json array of all the Public images ( along  with their info ) of the specified user. 

### View Image
* `/api/view/:filename` - you can view the image if you fullfill the requiremenrts of the privacy status of the specified image, otherwise you'll get a message stating that access was unauthorized

### Voting System
* `/api/upvote/:filename` - upvotes the specified image
* `/api/downvote/:filename` - downvotes the specified image
* `/api/getVote/:filename` - sends the total no. of votes i.e ( upvotes - downvotes) of the specified image.

### Edit Image Info
* `/api/edit/:filename` - edit the info in the following format. Note that all of the fields are optional i.e you can only specify any one or two of them to edit the image info.

  ```json
  {
      "desc": "this is an edited description",
      "privacy": 0,
      "name": "edited the name also"
  }
  ```
    
### delete the image
* `/api/del/:filename` - delete the specified file


