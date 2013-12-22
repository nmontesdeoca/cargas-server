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


user
    name        String
    lastname    String
    email       String
    password    String
    salt        String
    created     Date
    updated     Date

car
    model       Number
    year        Number
    created     Date
    updated     Date

make
    name        String
    created     Date
    updated     Date

model
    name        String
    make        Number
    created     Date
    updated     Date

// Only to create or set the fuel prices
app.get('/fuels', function (request, response) {
    var Fuel = mongoose.model('Fuel'),
        premium = new Fuel(),
        gasoil = new Fuel(),
        super95 = new Fuel();

    premium.set({
        name: 'Premium 97 SP',
        cost: 42.10
    });
    premium.save();

    gasoil.set({
        name: 'Gasoil',
        cost: 38.70
    });
    gasoil.save();

    super95.set({
        name: 'Super 95 SP',
        cost: 40.60
    });
    super95.save();

    response.send('Combustibles actualizados');
});