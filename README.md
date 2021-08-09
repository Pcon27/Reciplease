# Reciplease

A new kind of recipe book. In a world of online databases we created a user friendly personal cookbook. The user can upload family recipies or their personal favorites and share them with friends, family, and our Reciplease community. The next time you are at a bbq and taste someone's homemade mac n cheese asking, "Recipe, please!" is now as easy as a click of a button.

## Table of contents

- [Description](#description)
- [Getting Started](#getting)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Built With](#built)
- [Deployed Link](#deployed)
- [License](#license)
- [Contributors](#contributors)
- [Acknowledements](#acknowledements)

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

A great tool to see our database and check routes is Insonmia [HERE](https://insomnia.rest/download)

### Installing

From your terminal login to mysql inside the db file.

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

Now you can run an npm start to start your local server and see our database in action.

```
Reciplease % npm run start
```

From Insomnia you can run the routes and see what recipes our users have created.

public/img/insomiaGetRequest.png

End with an example of getting some data out of the system or using it for a little demo.

## Built With

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MySql](https://www.mysql.com)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Deployed Link

- [See Live Site](heroku)

## License

This application is licensed under [MIT](<(https://opensource.org/licenses/MIT)>).

## Contributors

See commit history [HERE](https://github.com/Pcon27/Reciplease/graphs/contributors)

**Alisha Pal**

- [Link to Portfolio Site](https://apal96.github.io/alisha-portfolio/)
- [Link to Github](https://github.com/apal96)
- [Link to LinkedIn](http://www.linkedin.com/in/alisha-pal-6635361b5)

**Eajay Delos Santos**

- [Link to Portfolio Site](https://www.linkedin.com/in/eajay-delos-santos-912950214/)
- [Link to Github](https://github.com/EajayD)
- [Link to LinkedIn](https://www.linkedin.com/in/eajay-delos-santos-912950214/)

**Peter Consagra**

- [Link to Portfolio Site](https://pcon27.github.io/MyWebsite/)
- [Link to Github](https://github.com/Pcon27)
- [Link to LinkedIn](https://www.linkedin.com/in/peter-consagra-4952401a8/)

**Jessica Giannini**

- [Link to Portfolio Site](https://jessgiannini.github.io/New-Web-Developer-Portfolio/)
- [Link to Github](https://github.com/jessgiannini)
- [Link to LinkedIn](https://www.linkedin.com/in/jessica-aletta-giannini-155b1310/)

## Acknowledgments

- We'd like to thank the Full Stack Web Development Boot Camp at UC Berkely for giving us the tools to create this application.
