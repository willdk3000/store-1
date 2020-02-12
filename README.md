# Store starter

Store starter : minimal backend setup for google oauth + react/hooks frontend
AND store template

### Prerequisites

```
This project uses MongoDB cloud account but could easily be replaced
with any local or cloud DB.

The project also uses Google OAuth : 
Google cloud console account + Project + Credentials + People API are also required.
```

### Installation

Step by step installation


```
Clone repo on local machine
```

```
npm install // server dependencies
create a .env file with DB, Google Client, Google Secret, Cookie Secret config
cd client
npm install // client dependencies
```

```
npm run dev // to start up app
```

## Tech-Stack

* [Express](http://expressjs.com/) - Backend
* [React](https://reactjs.org/) - Frontend
* [Bootstrap](https://getbootstrap.com/) - Styles
* [MongoDB Cloud](https://cloud.mongodb.com/) - Database

## Author

* **William Doucet-Koussaya**

## Other libraries

* create-react-app
* cookie-session
* passport
* monk (mongodb ODM)
