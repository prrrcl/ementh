# Ementh

## Description


Ementh is a webapp for Crossfit gyms. It is designed for the client (book classes) and for the admin of the box (to manage user access and payments).

## User Stories
### As user
-  **404:** As an anon/user/admin I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can receive an invitation for sign up in the platform so that I can start booking class and edit my profile.
-  **Login:** As a user I can login to the platform so that I can book classes.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Book Class** As a user I can book on class list.
-  **List Class** As a user I can see the classes that I can book.
-  ----
### As Admin
-  **All user features**... and:
-  **Login** As an admin I can login to the platform with some exclusive features.
-  **Send Signup invitation** As an admin I can add a user and send him a link for sign up.
-  **Create Class** As an admin I can create a class for users.
-  **Edit Class** As an admin I can edit class.
-  **Delete Class** As an admin I can remove classes.
-  **Give the power** As an admin I can give the power to users for book classes. (If the user doesn't pay the monthly payment, he can't book this month).

## Backlog

User profile:
- See other users profile
- Add friends pages (List and feed)
- Chat between users and Box admin
- Pay with Paypal the monthly payment.
- Add benchmarks page

Admin profile:
- See all users with their payments and manage them from desktop.

  
# Client

## Routes

- / - Homepage/Dashboard with classes booked (if user isn't logged redirect to Login)
- /signup - Signup form
- /login - Login form
- /calendar - Select day and hour for booking
- /class/create - create a class
- /class/:id/edit - edit class hour
- /users/invite - invite to users for signup
- /users/:id/edit - edit access to the ID user. 
- /profile/me - my details
- /profile/edit - edit my details
- 404

## Pages

- Home Page (user and admin only)
- Sign in Page (anon with key only)
- Log in Page (anon only)
- Classes List Page (user only)
- Classes Create Page (admin only)
- Classes Edit Page (admin only)
- User Invite Page (admin only)
- User Manage Suscription Page (admin only)
- My Profile Page (user only)
- 404 Page (public)

## Components

- Menu Top
- Navbar Bottom
- Class card
- Day picker

## IO


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() 
** **
- Class Service
  - classes.list()
  - classes.create(data)
  - classes.edit(id)
  - classes.delete(id)


# Server

## Models

User model

```
isAdmin - Boolean
username - String // required
email - String // required & unique
password - String // required
box - [ObjectID<Box>]
suscription - Number
isActive - Boolean
```

Box model

```
name - String // required
members - [ObjectID<User>]
owner - String // required
phone - String // required
address - String // required
```

Classes model

```
participants - [ObjectID<User>]
maxParticipants - Number // required
typeOfClass - String // required
box - [ObjectID<Box>]
date - Date
```

## API Endpoints/Backend Routes

- GET /auth/me
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - email
    - password
- POST /auth/logout
  - body: (empty)
- GET /classes/:idBox
  - body:
    - idBox
- POST /classes/new
  - body:
    - idBox
    - date
    - maxParticipants
- PUT /classes/:id/edit
  - body:
    - date
- PUT /users/:id/edit
  - body:
    - userId
    - suscription

## Links

### Trello / Wireframes

[Ementh on Trello](https://trello.com/b/FHalxYvP/ementh)
[AdobeXD Wireframes](https://xd.adobe.com/view/40b36574-2f89-4568-5062-33ea3e4de831-3682/?fullscreen)
### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/prrrcl/ementh)
[Server repository Link](https://github.com/prrrcl/ementh-back)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)