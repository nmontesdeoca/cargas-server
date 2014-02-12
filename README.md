CarGas Server
======

Es una API del tipo REST para crear aplicaciones con el fin de administrar las recargas de combustibles de tus vehiculos.

Idea de modelos

    User
    firstName: { type: String, validate: [ validation.empty, 'first name cannot be blank' ] },
    lastName: { type: String, validate: [ validation.empty, 'last name cannot be blank' ] },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: [
            { validator: validation.empty, msg: 'email cannot be blank' },
            { validator: validation.email, msg: 'email already exists' }
        ]
    },
    hashedPassword: { type: String, validate: [ validation.empty, 'password name cannot be blank' ] },
    salt: String,
    provider: String,
    facebook: {},
    twitter: {},
    google: {},
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date

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