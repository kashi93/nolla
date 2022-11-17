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
  - [Middleware](#middleware-1)
    - [Defining Middleware](#defining-middleware)
    - [Registering Middleware](#registering-middleware)
    - [Assigning Middleware To Routes](#assigning-middleware-to-routes)
  - [Controllers](#controllers)
    - [Basic Controller](#basic-controller)
    - [Params Controller](#params-controller)
  - [Requests](#requests)
    - [Retrieving An Input Value](#retrieving-an-input-value)
    - [Retrieving An Input File](#retrieving-an-input-file)
    - [Old Input](#old-input)
  - [Responses](#responses)
    - [Basic Response](#basic-response)
    - [View response](#view-response)
    - [Override nolla response](#override-nolla-response)
  - [Views](#views)
    - [Rendering Views](#rendering-views)
    - [Passing Data To Views](#passing-data-to-views)
  - [Validation](#validation)
    - [Writing The Validation Logic](#writing-the-validation-logic)
    - [Displaying The Validation Errors](#displaying-the-validation-errors)
    - [Available Validation Rules](#available-validation-rules)
      - [Required](#required)
      - [Email](#email)
      - [Minimum](#minimum)
      - [Maximum](#maximum)
      - [Confirmation](#confirmation)
      - [Mimes](#mimes)
      - [Custom](#custom)
      - [Optional](#optional)


# Installation

### Scaffold



To get started, you can scaffold the project with a clone of a starter project.


```
git clone https://github.com/kashi93/nolla.git project
cd project
cp .env.example .env
npm install
npm run serve / npm run start
```


Alternatively, to serve project without npm : 

**Production**

```
npm run build
node build/nolla serve
```

**Development**

```
ts-node lib/nolla serve
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

```
ts-node lib/nolla migrate
```



In default migrations, the database is users and migrations table.

# The Basics

## Routing



The routes directory contains all of the route definitions for your application. By default directory : 

```
lib/routes/web.ts
```

### Basic Route



```
import { default as Route } from "../vendor/route/route";

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
Route.get("/user/:id/edit", ["user.controller", "edit"])
```

**Controller**



```
class UserController extends Controller {
    async edit(id) {
        return `user id is ${id}`;
    }
}

export = UserController;
```

### Named Routes

Named routes allow the convenient generation of URLs or redirects for specific routes. You may specify a name for a route by chaining the name method onto the route definition:

```
Route.get("/", ["user.controller", "index"]).name("user.index");
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

```
lib/app/services/route.service.ts
```

## Middleware

### Defining Middleware

Default directory for middleware is lib/app/middlewares.For example we create  lib/app/middlewares/auth.middleware.ts

```
import { Request, Response, Next } from "../../";

export = (req: Request, res: Response, next: Next) => {
  if (auth.user() == null) {
    /*
     * redirect to router
     */
    return response.redirect(route("login"));

    /*
     * redirect using express response
     */
    // return res.status(403).json({
    //   status: "Error",
    //   message: "Unauthenticated",
    //   data: {},
    // });
  }
  next();
};
```

### Registering Middleware

To register middleware for the HTTP request to your application, list the middleware in lib/config/app.ts

```
{
    ...,
    routeMiddleware: {
        web: "app/middlewares/web.middleware",
        auth: "app/middlewares/auth.middleware",
    },
}
```

### Assigning Middleware To Routes

```
Route.middleware(middleware: string[] | string, routes: Function);
```

## Controllers

By default, controllers are stored in the lib/app/controllers/example.controller.ts directory.

### Basic Controller

```
import Controller from "./controller";

class UserController extends Controller {
  create() {
    return view("nolla/pages/user/user_create_form", {
      layout: "nolla/templates/app",
    });
  }
}

export = UserController;
```

Assigning controller To Routes

```
Route.get(url: string,argv: [controllerClassPath: string, method: string] |Function)
```

### Params Controller

```
import Controller from "./controller";

class UserController extends Controller {
 async edit(id: string) {
    const user = await userModel.where("id", "=", id).first();
    return view("nolla/pages/user/user_edit_form", {
      layout: "nolla/templates/app",
      user,
    });
  }
}

export = UserController;
```

By default routes return to controller.

```
() => arg...,req,res
```

Assigning controller To Routes

```
Route.get("/user/:id/edit", ["user.controller", "edit"])
```

## Requests

Nolla request is extended from the default express request.

### Retrieving An Input Value

```
req.body || req.query = input(field:string) => any
```

```
const name = request.input("name");
```

### Retrieving An Input File

```
File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  move: (publicPath?: string, name?: string) => Promise<string | null>;
}
```

```
if (request.$file("test") != null) {
    await request.$file("test").move("images");
}
```

### Old Input

By default we keep input from one request during the next request.

```
<input type="text" class="form-control" name="name" value="<%= old("name")  %>" />
```

## Responses

Nolla response is extended from the default express response.

### Basic Response

```
Route.get("/", function () {
  return "Welcome to nolla";
});
```

```
Route.get("/", function () {
  return [1,2,3];
});
```

```
Route.get("/", function () {
  return {
    name:"nolla",
    active:true
  };
});
```

### View response

```
Route.get("/", function () {
  return view("nolla/pages/user/user_create_form");
});
```

### Override nolla response

```
Route.get("/", function (req,res) {
    return res.status(200).json({
      user:{
        name:"nolla",
        active:true
      }
    });
});
```

## Views

Nolla views using the ejs package and is stored in the lib/resources/views directory. You can refer to https://ejs.co/

### Rendering Views

```
view: (path: string, data?: { [key: string]: any }) => void
```

```
import { Request } from "../../";
import { default as hash } from "../../vendor/rainbows/hash";
import { default as userModel } from "../models/user.model";
import Controller from "./controller";

class UserController extends Controller {
  create() {
    return view("nolla/pages/user/user_create_form");
  }
}
```

### Passing Data To Views

```
import { default as userModel } from "../models/user.model";
import Controller from "./controller";

class UserController extends Controller {
  async edit(id: string) {
    const user = await userModel.where("id", "=", id).first();
    return view("nolla/pages/user/user_edit_form", {
      user,
    });
  }
}
```

## Validation

Nolla validation is extended from express-validator package.

### Writing The Validation Logic

```
validate(req: Request,rule: {[field: string]: Rules[]},sentBack: boolean = true) => Promise<any[] | boolean>;
```

```
import { Request } from "../../";
import { default as userModel } from "../models/user.model";
import Controller from "./controller";

class UserController extends Controller {
   async store(req: Request) {
    const validate = await this.validate(req, {
      name: ["required"],
      email: [
        "required",
        "email",
        async function (attr: string, val: any, fail: Function) {
          if (
            (await userModel
              .where("email", "=", request.input("email"))
              .first()) != null
          ) {
            fail("The email has already been taken.");
          }
        },
      ],
      password: ["required", "min:5", "max:8"],
      password_confirmation: ["required", "confirmation:password"],
    });

    if (validate) {
      // The validation is valid...
    }
  }
}
```

### Displaying The Validation Errors

```
<div class="col-6">
  <div class="form-group">
    <label>Name</label>
    <input type="text" class="form-control" name="name" value="<%= old("name")  %>" />
    <% if (errorHas('name')) { %>
       <div class="text-danger m-1"><%=message%></div>
    <% } %>
  </div>
</div>
```

### Available Validation Rules

#### Required

```
name: ["required"]
```

#### Email

```
email: ["email"]
```

#### Minimum

```
field:`min:${number}`
```
```
password: ["min:5"]
```

#### Maximum

```
field:`max:${number}`
```
```
password: ["max:8"]
```

#### Confirmation

```
password: ["required", "min:5", "max:8"],
password_confirmation: ["required", "confirmation:password"]
```

#### Mimes

```
image: ["mimes:jpeg,svg"]
```

#### Custom

```
field:Function
```

```
email: [
  ...,
  async function (attr: string, val: any, fail: Function) {
    if ((await userModel.where("email", "=", request.input("email")).first()) != null) {
      fail("The email has already been taken.");
    }
  },
]
```

#### Optional

```
image: ["nullable", "mimes:jpeg", "min:528"]
```
