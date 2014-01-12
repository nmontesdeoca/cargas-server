CarGas
======

Trata de ser una aplicacion orientada a moviles con el fin de permitirle a un usuario, registrar las recargas de combustible que le hace a su vehículo.

Qué ve un usuario cuando entra a CarGas ?

    Vé la página de login

Y si ya estaba logueado ?

    Vé el formulario para ingresar una nueva recarga

Qué campos tiene el formulario de ingreso de recarga

    kilometraje, tipo de combustible, costo o litros (solo uno de los dos es necesario, y el otro se calcula automaticamente con el precio del combustible).

Qué puede hacer un usuario ?

    * crearse una cuenta o entrar con una red social (facebook, twitter, google, etc.)
    * ver su perfil y rellenarlo
    * ver estadisticas sobre sus recargas
    * ver historial de recargas
    * ver los gastos realizados con sus recargas, por dia, por mes, por año
    * podria tener varios vehiculos


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
    cars            List (Car)
    created_at      Date
    updated_at      Date

    Car
    model       ObjectID
    year        Number
    fuel        ObjectID
    created_at  Date
    updated_at  Date

    Make
    name        String
    created_at  Date
    updated_at  Date

    Model
    name        String
    make        ObjectID
    created_at  Date
    updated_at  Date

    Fuel
    name    String
    cost    Number