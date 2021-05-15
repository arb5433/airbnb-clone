# ThereBnB

## Project Overview
***
[ThereBnB](https://therebnb.herokuapp.com/) is a clone of the popular AirBnB app. I attempted to recreate as much of the same functionality with a similar feel as the original application. This full stack project was created to gain practical experience using Google Map API calls as well AWS and help improve my skills with React / Redux. 

The MVP features and design that I have managed to incorporate so far are the following: 

### MVP Features
* CRUD Posting functionality
* View Postings
* Search for Postings
* Bookings
* CRUD Review Functionality

### Home Page

For the design on the main page, I wanted to closely capture the feel of the airbnb application with links to various pages and filters and a nice welcoming display prompting users to begin the hosting process. The navigation bar at the top displays a clickable title/logo that will redirect you from any page to the home page, as well as a search bar set up with Google Places API autofill and session links that either render login and signup buttons, or a logout button and buttons that pull up the current postings and bookings associated with your account. 

![readme-therebnb1](https://user-images.githubusercontent.com/74081636/118336121-0f293e80-b4df-11eb-81c8-331e3d26795f.PNG)
![readme-therebnb2](https://user-images.githubusercontent.com/74081636/118336346-78a94d00-b4df-11eb-93b6-3aa6bea4f1d9.PNG)

### Searching for Postings

The search functionality is implemented using a Google Map API and the react-google-map component. Utilizing react hooks and the redux store, I was able to mimic the functionality of the airbnb map, dynamically rendering information on the postings that are shown on the map as you move around the map. 

![readme-therebnb4](https://user-images.githubusercontent.com/74081636/118344710-c0d76800-b4fd-11eb-8007-298e43e784a4.PNG)
![readme-therebnbgif](https://github.com/arb5433/readmes/blob/main/newgif.gif)

Below is a code snippet of a portion of the code that I incorporated to dynamically render the postings that are shown on the map.

<img width="1086" alt="Screen Shot 2021-05-14 at 10 08 03 PM" src="https://user-images.githubusercontent.com/74081636/118345610-aef8c380-b503-11eb-9b74-0d46b78290d3.png">

### Posting Display Page

On the posting display page, you are able to add photos, edit certain information about the posting, and delete the posting, if the posting was initially posted by you. This page also has a calendar to show which dates are booked, as well as the functionality to book new dates given they have not already been booked. The final bit of functionality on this page is a comprehensive list of reviews, which includes all CRUD functionality at the bottom in case a user would like to leave a review for a specific posting.

![readme-therebnb5](https://user-images.githubusercontent.com/74081636/118345096-49ef9e80-b500-11eb-9353-c16addaf0c8a.PNG)
![readme-therebnb6](https://user-images.githubusercontent.com/74081636/118345097-4c51f880-b500-11eb-9372-1e015773d366.PNG)

### Adding a New Posting

To add a new posting, the user is lead through an interactive series of forms. Each page when rendered takes in a certain set of data and saves it in state until the entire form is filled out. Once the user has filled out the whole form there is a validation section that pops up so that they can ensure that their information is correct before submitting. 

![readme-therebnbgif2](https://github.com/arb5433/readmes/blob/main/newgif2.gif)

The code below shows how the pages are dynamically loaded based on a 'page' slice of state. You can also see how the inputs are saved into state making them controlled inputs within react. 

<img width="1046" alt="Screen Shot 2021-05-14 at 10 09 04 PM" src="https://user-images.githubusercontent.com/74081636/118345619-b8822b80-b503-11eb-892b-0698bd7ba6ca.png">

More information about the database, API routes, frontend routes, and react components can be found by checking out the [ThereBnB Wiki](https://github.com/arb5433/airbnb-clone/wiki).
