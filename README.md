# Reciplease

A new kind of recipe book. In a world of online databases we created a user friendly personal cookbook. The user can upload family recipies or their personal favorites and share them with friends, family, and our Reciplease community. The next time you are at a bbq and taste someone's homemade mac n cheese asking, "Recipe, please!" is now as easy as a click of a button.

## Getting Started

First, clone the repository [HERE](git@github.com:Pcon27/Reciplease.git)

### Prerequisites

Install the node_modules and package.json by running an npm i from your terminal. Be sure to include express, sequelize, mysql2, bcrypt, and dotenv packages.

Be sure to populate the .env file with your mysql password.

```
DB_NAME=recipe_db
DB_USER=root
DB_PASSWORD=SECRETPASSWORD
```

### Installing

Log in to mysql inside the db file.

```
Reciplease % cd db

db % mysql -u root -p

Enter password:

Welcome to the MySQL monitor.
```

Then source the database and exit:

```
mysql> source schema.sql;
Query OK, 4 rows affected (0.06 sec)

Query OK, 1 row affected (0.00 sec)

mysql> exit
```

Exit mysql and leave the db folder. Then run a npm seed command to seed our database.

```
db % cd ..
Reciplease % npm run seed
```

```
Reciplease % npm run start
```

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

What things you need to install the software and how to install them.

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development environment running.

Say what the step will be:

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo.

## Built With

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Deployed Link

- [See Live Site](https://github.com/JessGiannini/QuizMe)

## Authors

**Jessica Giannini**

- [Link to Portfolio Site](https://jessgiannini.github.io/WebDeveloperPortfolio/)
- [Link to Github](https://github.com/jessgiannini)
- [Link to LinkedIn](https://www.linkedin.com/in/jessica-aletta-giannini-155b1310/)

## Acknowledgments

- Thank you to my amazing classmates who help me navigate the ins and outs of coding.
- Thanks to all the YouTube stars who helped me see the many ways to pet a cat.
- Thanks to my friend Kelsey for inspiring me to take this course.
