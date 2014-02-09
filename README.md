CarGas Server
======

Es una API del tipo REST para crear aplicaciones con el fin de administrar las recargas de combustibles de tus vehiculos.

Idea de modelos

    User
    first_name      String
    last_name       String
    provider        String
    hashed_password String
    salt            String
    authToken       String
    facebook        Object
    twitter         Object
    google          Object
    created_at      Date
    updated_at      Date

    Fuel
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cost: { type: Number },
    name: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }

    Refuel
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    fuel: { type: mongoose.Schema.Types.ObjectId, ref: 'Fuel'},
    cost: { type: Number },
    capacity: { type: Number },
    average: { type: Number },
    kilometers: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: Date


### REST API

GET '/fuel'
POST '/fuel'
GET '/fuel/:id'
DELETE '/fuel/:id'

GET '/refuel'
POST '/refuel'
GET '/refuel/:id'
POST '/refuel/:id'
DELETE '/refuel/:id'

POST '/login'
POST '/user'
GET '/user'
POST '/user/:id'

### Contribuidores

* [Nicolas Montesdeoca](https://github.com/nmontesdeoca) - [@_nmontesdeoca](https://twitter.com/_nmontesdeoca)
* [Gustavo Cañete](https://github.com/neggro) - [@neggro](https://twitter.com/neggrouy)