# CRUD-API
# CRUD-API

Making an API where a user can enter his detais(username,name,password,phone number),edit his previous saved response,and also see the user that has been already 
registered.

For this i had use nodejs and use some npm packages 
  ->Express
  ->ejs
  ->method-overide(as usually forms method can send only post and get request so with this package we can send put,patch,delete responses)
  ->mongoose
  
  First install all this 4 packages in my directory.
  The model of our schema is in models dir inside the file "details.js"
  
  We require all the above packages in file app.js and we alo start the mongoose database at port 27017 ,started the express app and also we require the model of our schema from the above mention location.After this we set the view engine and use some of the express crucial stuff like urlencoded(when data came from post request its not parsed so by using this we can retrive the data).
  
 Locally hosting on port 3000 using express.
 We store our data in mongoose database under the table name "user-details"
 
 Suppose to create a instance where some user had already registered
   To implement this i had made a new dir called "seeds" inside this i had 2 files
       ->seedhelpers.js =>  exported some fake data.
       ->index.js=> where i had inserted data into mongodb ,requiring mongoose,requiring model inside the file("detail.js") and using some model method.
  
 Now ,we will setup our basic routes (restful)
 
 http://localhost:3000/userdetails => In this port we will do two major stuffs
               1) Where we will show existing username until that instance(clickable links which will redirect us to show the deatils of that particular user)
  ##"SHOW"          using get request.
                  To "show" the data we will render the file index.ejs present inside the views dir.
                2) A button is present which will take us to the link where a new user can register himself/herself.
 
 http://localhost:3000/userdetails/new => In this port we will register the "new user" where we will ask for username,name,password,phonenumber.
          So fully implement this step first of all we have to redirect user to this link. And we will do this using a get request and in response user will get a       ##"NEW"       form which will be rendered from file "new.ejs" present in views dir and when the user will submit the form method "POST" on the route                                 http://localhost:3000/userdetails from this route we will collect the filled form using post request and then we will save this data to our database                  and redirect the user to show page /userdetails/:id.
  
 http://localhost:3000/userdetails/:id => This is a port where user can see his full details ,to implement this we use get request and after destructuring the id.                Now to show the data of that particular user will render the file show.ejs which is present in views dir where we will send object in which user details 
           are there and in this route we will show the user detail of particular user.
            
            In this show page we will have 3 buttons
              1)Home button which will take us to http://localhost:3000/userdetails.
  ##"EDIT"      2)edit button which will take us to a link where we can edit user detail.
                   For this operation we will use the route http://localhost:3000/userdetails/:id/edit
                        using a get request we will render the user to the file edit.ejs which is present in views dir where he/she can edit there details.
                        when user will submit the form to the port /userdetails/:id where the method used is PUT using method override. After destructuring the id 
                        we will update the user details and redirect the user to show page /userdetails/:id.
              
   ##"DELETE"   3)delete button from which we can "delete" that user.
                    For 3rd operation we will make a form which will use a method DELETE using method-override where form will end on the route                                              /userdetails/:id(particular user _id) and using a delete request we will delete that user.
                    
                
                  
   In the public dir there are some styling (without responsiveness) that we had encapsulated in our ejs files present in views dir.
   
   To start the app first cd where project is prsent then first run: node seeds/index.js (such that we had instace of data where some user had already register)
   
   after this use nodemon app.js to run the whole app.
                
