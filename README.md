# Thread Talk API

## Description

**Thread Talk** is my first API project I created during my Software Development Bootcamp at Northcoders.  It's got cool features for handling users, creating posts, dropping comments, and even throwing in some votes. It's your go-to spot for all things chatting! 😄

## API

You can access it [**here**](https://news-project-emah.onrender.com/api/).

### Minimum requirements

- **Node**: minimum version v20.8.0, you can download Node.js [**here**](https://nodejs.org/en)
- **PostgreSQL**: v15.4, install PostgreSQL by following the instructions on the official [**PostgreSQL website**](https://www.postgresql.org/download/)
- **API Client**: Any API client can be used, but [**Insomnia**](https://insomnia.rest/download) is recommended for optimal testing and interaction with the Thread Talk API

### Steps required to run the code

1. **Fork** this repo by clicking on the icon in the top right of the page.

2. **Clone** this repo by clicking the `<>Code` icon and copying the HTTPS url. Once the url is copied, go into your local terminal and run the following command once you're in the desired save location:

```
git clone <paste url here>
```

If you're using **Visual Studio Code**, you can either open the folder straight from the app by clicking **open folder** or, you can do this from your terminal, by running the following command:

```
code <folder name>
```

3. You will then need to create two `.env` files in the root folder. These files will be used by Dotenv to establish the connections with the correct databases.
You can find the database names in `/db/setup.sql`.

```
.env.test
.env.development
```
>There is an example file `.env-example`, which shows the correct format required in the .env files. Make sure you link the correct databases to the correct .env files.

After creating the .env files, make sure that they appear in the `.gitignored`.

4. At this point you will need to install some dependencies and devDependencies to get the code running. You can do this by running `npm install` in your terminal.

5. Now that everything is installed and ready to go, it's time to run the scripts. Run the following commands in your terminal to set up the environment, seed the database and start the local server:

```
npm run setup-dbs
npm run seed
npm run start
```

6. In order to make requests, open the API client and make requests from there. If unsure about the requests you can make, please refer to [`Thread Talk API`](https://news-project-emah.onrender.com/api/) for the paths available.

7. To test the code, just run the following command in your terminal:

```
npm test
```

>If at any point you want to stop your script from running, click on the terminal and just press `CTRL+C`(Windows) or `Command+C`(Mac)

8. Happy coding! :smile_cat:
