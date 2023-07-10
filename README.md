# The setup for Node/Express projects with TypeScript and TypeORM/PostgreSQL.

 ```Basic CRUD implemented for Users and Posts. Basic JWT Authentication and Authorization added.```

Steps to run this project:

-   Install postgresql from their offical site for the app to work on your machine.

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

```.env file only has secret key generated with crypto.randomBytes(32).toString('hex') ```
