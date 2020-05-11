import 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js'

let name = "bogo"
const age = 25

console.log(name, age)

const DATA_POINT = "https://covid19-data.p.rapidapi.com/all"

mapboxgl.accessToken = 'pk.eyJ1IjoiYm9nb21pbGFtIiwiYSI6ImNrOTNheWZsMjAwYmszbHFueWFjeGZxdTcifQ.Nyv9yzzO8m0b5sYBViW8_g'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10'
    });

    map.on('load', function() { //On map load, we want to do some stuff
        map.addLayer({ //here we are adding a layer containing the tileset we just uploaded
          'id': 'countries',
          'source': {
            'type': 'vector',
            'url': 'mapbox://bogomilam.1ax59hha'
          },
          'source-layer': 'ne_10m_admin_0_countries_4-citjsm',
          'type': 'fill',
          'paint': {
            'fill-color': '#52489C', //this is the color you want your tileset to have (I used a nice purple color)
            'fill-outline-color': '#F2F2F2' //this helps us distinguish individual countries a bit better by giving them an outline
          }
        });
      });

      map.on('click', 'countries', function (mapEl) {
          const country = mapEl.features[0].properties.ADMIN
        //   console.log(country)
          const countries = fetchAPI()
          
        //   const selected = countries.filter(c => {
        //       c.country.include(country)
        //   })

        //   console.log(countries)

      })


      
       map.on('load', function() {
           fetchAPI()
       })

const fetchAPI = ()  => {
    return fetch(DATA_POINT, {  
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid19-data.p.rapidapi.com",
          "x-rapidapi-key": "7b4a939c2amsh6771ab45c110f92p15524ajsn651844dca99f"
        }
      })
      .then(res => res.json())
      .then(data => {
         const reports = data
            reports
      })
  }