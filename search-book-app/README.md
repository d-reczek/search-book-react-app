# Search Book App

## Intro

## Search is a  [React](https://reactjs.org/) app

In the app you can save tasks, set reminders for events and manage your budget.
All your activities are saved in a private account where you can set your own avatar, change your password if necessary and, if need be, delete the account and clear your data.

# Demo

## [Home Organizer](https://homeorganizer-44534.web.app/)

### Demo user

### login: guest@guest.pl

### password: guest123

![HomePage](/intro.png)

# Enviroment

The application was written using the [REACT](https://reactjs.org/) library. Application was styled using [MaterialUI](https://mui.com/) library and [styled-component](https://styled-components.com/). <br/>
Application backend is based on Google service called [Firebase](https://firebase.google.com/).
All user data is stored thanks to [Firebase Firestore](https://firebase.google.com/docs/firestore) service, login and user verification is managed by [Firebase Authentication](https://firebase.google.com/docs/auth) service. The user avatar is stored in the [Firebase Storage](https://firebase.google.com/docs/storage) service.
The application has also been deployed thanks to the Firebase service, more precisely thanks to the [Firebase Hosting](https://firebase.google.com/docs/hosting) service.

# Features

- user can create an account by entering your name, surname and email
- user when forgetting the password has the possibility to reset the password by sending an email with a password reset link
- adding task
- budget:
  - management, ability to categorize expenses/income
  - ability to sum up all expenses/income by category
- calendar: - possibility of setting about the event - display a reminder for a given event on a given day, a day and two days before the event date
  -user panel: - ability to change avatar - ability to change user - possibility to change user data except name, surname and email - possibility to change user password - user can delete their account with all of his date

![HomePage](/tasks.png)
![HomePage](/budget.png)
![HomePage](/calendar.png)


