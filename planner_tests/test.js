
const turf = require("turf");
const fetch = require("node-fetch");
const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;


var attractions = [
    {
        "name": "Alexander Theatre",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Alexander_Theater.JPG/640px-Alexander_Theater.JPG",
        "address": "Bulevardi 23-27,  00180 Helsinki",
        "minDuration": 120,
        "price": 30,
        "description": "The Alexander Theatre is a beautiful building completed on the Bulevardi in 1879. Former Finnish National Opera. Visiting music and theatre performances."
    }
    ,
    {
        "name": "Amos Anderson Art Museum",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Yrjönkatu_27-29.jpg/640px-Yrjönkatu_27-29.jpg",
        "address": "Yrjönkatu 27,  00100 Helsinki",
        "minDuration": 60,
        "price": 10,
        "description": "Amos Anderson Art Museum is the biggest private art museum in Finland. Its collection comprises mainly contemporary Finnish art, art and furnishings from Amos Anderson's private collections and Finnish and foreign art from the collection of architect Sigurd Frosterus. The museum arranges 8-11 changing exhibitions every year."
    }
    ,
    {
        "name": "Arabia Factory and Factory Outlet",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Arabian_vanha_tehdasrakennus.jpg/640px-Arabian_vanha_tehdasrakennus.jpg",
        "address": "Hämeentie 135,  00561 Helsinki",
        "minDuration": 20,
        "price": 0,
        "description": "Stylish products for the home can be found at the Arabia Factory Outlet, the largest single sales centre for Arabia, Iittala and Hackman products. The store includes special discounts and mark-down prices. Taxfree and export service."
    }
    ,
    {
        "name": "Ateneum Art Museum",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Helsinki_July_2013-26a.jpg/640px-Helsinki_July_2013-26a.jpg",
        "address": "Kaivokatu 2,  00100 Helsinki",
        "minDuration": 60,
        "price": 12,
        "description": "Ateneum Art Museum houses the largest collections of art in Finland with more than 20,000 works of art from the 1750s to the 1950s. The changing exhibitions are on display on the ground floor and in the exhibition halls on the second floor."
    }
    ,
    {
        "name": "Cable Factory",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kaapelitehdas_inside_yard.jpg/640px-Kaapelitehdas_inside_yard.jpg",
        "address": "Tallberginkatu 1 C 15,  00180 Helsinki",
        "minDuration": 30,
        "price": 0,
        "description": "Kaapelitehdas (Finnish for 'the Cable Factory', also called simply Kaapeli, Swedish: Kabelfabriken) is a famous building in Ruoholahti, Helsinki, near the bridge to Lauttasaari."
    }
    ,
    {
        "name": "Church of the Good Shepherd",
        "thumbnailUrl": "http://www.helsinginkirkot.fi/fi/kirkot/hyvan-paimenen-kirkko/hyvan-paimenen-kirkko-hemm.jpg/@@images/f38ce5a3-02d3-4a11-a7b2-4d7595995757.jpeg",
        "address": "Palosuontie 1,  00660 Helsinki",
        "minDuration": 20,
        "price": 0,
        "description": "In Pakila, right on the corner of Kehätie and Tuusulanväylä, yet in its own peace, stands the Church of the Good Shepherd. A play of light and shadow filters into the church from the row of windows on the altar wall."
    }
    ,
    {
        "name": "Church of St. Lawrence (Pyhän Laurin kirkko)",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vantaa_church.jpg/485px-Vantaa_church.jpg",
        "address": "Kirkkotie 45,  01510 Vantaa",
        "minDuration": 20,
        "price": 0,
        "description": "The Church of St. Lawrence is a medieval stone church located in the parish of Helsinki (Vantaa), only 10 min from the Helsinki Airport. It was built in 1450's and it is the oldest building in the metropolitan area."
    }
    ,
    {
        "name": "Didrichsen Art Museum",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Didrichsenin_taidemuseo_2.jpg/640px-Didrichsenin_taidemuseo_2.jpg",
        "address": "Kuusilahdenkuja 1,  00340 Helsinki",
        "minDuration": 60,
        "price": 10,
        "description": "The Didrichsen Art Museum is a unique combination of art museum and private home on Kuusisaari island in Helsinki. Temporary exhibitions and permanent displays of ancient Chinese and pre-Columbian artefacts."
    }
    ,
    {
        "name": "Finnish National Opera",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Oopperatalo2008.jpg/640px-Oopperatalo2008.jpg",
        "address": "Helsinginkatu 58,  00250 Helsinki",
        "minDuration": 0,
        "price": 0,
        "description": "Surrounded by park, the Opera, built in the beginning of the 1990's, is in the inner city and easily accessible by public transport. View from the main foyer over the sea and city centre. Performances six days a week as a rule: opera, ballet, premieres, concerts and other events. Main auditorium, intimate Almi Hall and impressive foyers."
    }
];

var testHotels = [
    {
        "name": "Hotel 1",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Visit-suomi-2009-05-by-RalfR-224.jpg/640px-Visit-suomi-2009-05-by-RalfR-224.jpg",
        "address": "Sofiankatu 1, 00170 Helsinki",
        "minDuration": 20,
        "price": 100,
        "description": "AirBnB"
         },
    {
        "name": "AirBnB 1",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Uspenski_Cathedral_Helsinki_2012.jpg/659px-Uspenski_Cathedral_Helsinki_2012.jpg",
        "address": "Kanavakatu 1,  00160 Helsinki",
        "minDuration": 25,
        "price": 200,
        "description": "Completed in 1868 in the Katajanokka Hotel"
    }
];

// get addresses

var geocoding_api_endpoint = "http://api.digitransit.fi/geocoding/v1/search"

function addLatsAndLons(iterable) {
    return iterable.map(
        function (location) {
            var query = geocoding_api_endpoint + "?" + "text=" + location.address + "&size=1"
            return fetch(encodeURI(query))
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    var coordinates = json.features[0].geometry.coordinates;
                    return Object.assign({}, location, {lat: coordinates[1], lon: coordinates[0]});
                }).catch(function (reason) {
                    console.log(location);
                    console.log(reason);
                    return Object.assign({}, location)
                })
        }
    )
};


var attractionPromises = addLatsAndLons(attractions)
var hotelPromises = addLatsAndLons(testHotels)

Promise.all(hotelPromises).then(
    function () {
        console.log("hotelPromises")
        Promise.all(attractionPromises).then(
            function () {
                console.log("Both ready!")
            }
        )
    }
);




var hslGQLEndPoint = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";

const graphQLHSLClient = new Lokka({
    transport: new Transport(hslGQLEndPoint)
});

var query_base = `
{plan(
    from: {lat: 60.199196699999995, lon: 24.9397302},
    to: {lat: 60.168438, lon: 24.929283},
    date:"2016-05-28",
    time:"12:00:00",
    numItineraries: 3,
    modes: "WALK,RAIL,BUS,FERRY",
){
    itineraries {
        legs {
            startTime
            endTime
            mode
            duration
            realTime
            distance
            transitLeg
            legGeometry {
                points
            }
        }
        duration
    }
}}`
;

graphQLHSLClient.query(query_base)
    .then( function(res) {
        console.log(res.plan);
        plan = res.plan
        for (var el in plan) {
            console.log(plan[el])
        }
    })
    .catch(function (reason) {
        console.log(reason)
    })
;
