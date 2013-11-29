CarGas

Un usuario puede
    crearse una cuenta
    agregar sus autos
    por cada auto puede
        cuando hecha combustible (ideal)
            ingresar kilometraje
            ingresar litros cargados
        revisar los datos
            cargas que ha hecho


users
    name        String
    lastname    String
    email       String
    password    String
    salt        String
    created     Date
    updated     Date

cars
    model       Number
    year        Number
    created     Date
    updated     Date

makes
    name        String
    created     Date
    updated     Date

models
    name        String
    make        Number
    created     Date
    updated     Date




