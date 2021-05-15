# ThereBnB

## Project Overview
***
[ThereBnB](https://therebnb.herokuapp.com/) is a clone of the popular AirBnB app. I attemped to recreate as much of the same functionality with a similar feel as the original application. This full stack project was created to gain practical experience using Google Map API calls as well AWS and help improve my skills with React / Redux. 

The MVP features and design that I have managed to incorperate so far are the following: 

### MVP Features
* CRUD Posting functionality
* View Postings
* Search for Postings
* Bookings
* CRUD Review Functionality

### Home Page

For the design on the main page, I wanted to closely capture the feel of the airbnb application with links to various pages and filters and a nice welcoming display prompting users to begin the hostings process. The navigation bar at the top displays a clickable title/logo that will redirect you from any page to the home page, as well as a searchbar set up with Google Places API autofill and session links that either render login and signup buttons, or a logout button and buttons that pull up the current postings and bookings associated with your account. 

![readme-therebnb1](https://user-images.githubusercontent.com/74081636/118336121-0f293e80-b4df-11eb-81c8-331e3d26795f.PNG)
![readme-therebnb2](https://user-images.githubusercontent.com/74081636/118336346-78a94d00-b4df-11eb-93b6-3aa6bea4f1d9.PNG)

### Searching for Postings

The search functionality is implimented using a Google Map API and the react-google-map component. Utilizing react hooks and the redux store, I was able to mimic the functionallity of the airbnb map, dynamically rendering information on the postings that are shown on the map as you move around the map. 

![readme-therebnb4](https://user-images.githubusercontent.com/74081636/118344710-c0d76800-b4fd-11eb-8007-298e43e784a4.PNG)
![readme-therebnbgif](https://github.com/arb5433/readmes/blob/main/newgif.gif)

### Posting Display Page

On the posting display page, you are able to add photos, edit certain information about the posting, and delete the posting, if the posting was initially posted by you. This page also has a calendar to show which dates are booked, as well as the functionallity to book new dates given they have not already been booked. The final bit of functionality on this page is a comprehensive list of reviews, which includes all CRUD functionality at the bottom incase a user would like to leave a review for a sepcific posting.
