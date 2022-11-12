# Nolla

- [Nolla](#nolla)
- [Installation](#installation)
    - [Scaffold](#scaffold)
    - [Database](#database)
- [The Basics](#the-basics)
  - [Routing](#routing)
    - [Basic Route](#basic-route)
    - [Available Router Methods](#available-router-methods)
    - [Required Parameters](#required-parameters)
    - [Named Routes](#named-routes)
    - [Middleware](#middleware)
    - [Route Prefixes](#route-prefixes)
    - [Controller Namespace](#controller-namespace)



# Installation

### Scaffold



To get started, you can scaffold the project with a clone of a starter project.


```
$ git clone https://github.com/kashi93/nolla.git project
$ cd project
$ cp .env.example .env
$ npm install
$ npm run serve / npm run start
```


Alternatively, to serve project without npm : 

**Production**

```
$ npm run build
$ node build/nolla serve
```

**Development**

```
$ ts-node lib/nolla serve
```

### Database



Create an empty mysql database for your project. In our example we created a database called “nolla”. Just create an empty database here, the exact steps will depend on your system setup.



Sync your created database with our project in your .env file for the database part.


```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nolla
DB_USERNAME=root
DB_PASSWORD=
```



Migrate the database.

**TypeScript**

```
$ ts-node lib/nolla migrate
```



In default migrations, the database is users and migrations table.

# The Basics

## Routing



The routes directory contains all of the route definitions for your application. By default directory : 



**Common JS**

```
$ routes/web.js
```

**TypeScript**

```
$ lib/routes/web.js
```



### Basic Route



```
const Route = require("../vendor/route/route").default;

Route.get("/", function () {
  return view("welcome");
});
```

### Available Router Methods



The router allows you to register routes that respond to any HTTP verb :



```
Route.get(url: string,argv: [controllerClassPath: string,method: string] | Function);
Route.post(url: string,argv: [controllerClassPath: string,method: string] | Function);
```

### Required Parameters

Sometimes you will need to capture segments of the URI within your route.



**Route**



```
$ Route.get("/user/:id/edit", ["user.controller", "edit"])
```

**Controller**



```
class UserController extends Controller {
    async edit(id) {
        return `user id is ${id}`;
    }
}

module.exports = UserController;
```

### Named Routes

Named routes allow the convenient generation of URLs or redirects for specific routes. You may specify a name for a route by chaining the name method onto the route definition:



```
$ Route.get("/", ["user.controller", "index"]).name("user.index");
```

### Middleware

To assign middleware to all or specific routes.



```
Route.middleware("auth", () => {
    Route.get("/", ["user.controller", "index"]).name("user.index");
});
```

### Route Prefixes

The prefix method may be used to prefix each route in the group with a given URI.



```
Route.prefix("admin", () => {
    Route.get("/users", ["user.controller", "index"]).name("user.index");
    // Matches The "/admin/users" URL
});
```


### Controller Namespace

By default controller namespace.

```
Route.controllerNameSpace("/app/controllers/", () =>
    Route.middleware("web", () => require("../../routes/web"))
);
```

You can refer to route providers.

**Common JS**

```
$ app/services/route.service.js
```

**TypeScript**

```
$ lib/app/services/route.service.js
```