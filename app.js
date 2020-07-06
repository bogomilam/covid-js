import 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js'


const DATA_POINT = "https://covid19-data.p.rapidapi.com/all"

mapboxgl.accessToken = 'pk.eyJ1IjoiYm9nb21pbGFtIiwiYSI6ImNrOTNheWZsMjAwYmszbHFueWFjeGZxdTcifQ.Nyv9yzzO8m0b5sYBViW8_g'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/bogomilam/cka3k5ygh0hn61iss6j2muykh',
    center: [40.243, 42.204894],
    minZoom: 2
    });

    map.on('load', function() {
        map.addLayer({
          'id': 'countries',
          'source': {
            'type': 'vector',
            'url': 'mapbox://bogomilam.1ax59hha'
          },
          'source-layer': 'ne_10m_admin_0_countries_4-citjsm',
          'type': 'fill',
          'paint': {
            'fill-color': '#52489C',
            'fill-outline-color': '#00FFFF'
          }
        });
      });

      map.on('click', 'countries', function (mapEl) {
          const country = mapEl.features[0].properties.ADMIN
          // console.log(mapEl.features)
         fetch(DATA_POINT, {  
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
                const selected = reports.filter(c => c.country.includes(country))
                // console.log(selected)

                const html = `
                <h3>${selected[0].country}</h3>
                <ul>
                    <li class='confirmed'>
                    Cases: ${nFormatter(selected[0].confirmed)}
                    </li>
                    <li class='confirmed'>
                    Deaths: ${nFormatter(selected[0].deaths)}
                    </li>
                    <li class='confirmed'>
                    Recovered: ${nFormatter(selected[0].recovered)}
                    </li>
                    <li class='confirmed'>
                    Active: ${nFormatter(selected[0].active)}
                    </li>    
                </ul>
                <h3>
                Death Rate: ${Math.round(selected[0].deaths / selected[0].confirmed * 100)} %
                </h3>
                `
                

                new mapboxgl.Popup({className: 'popup'})
                .setLngLat(mapEl.lngLat)
                .setHTML(html)
                .addTo(map)
          })
      })


      
       map.on('load', function() {
           fetchAPI()
       })

// const kFormatter = num => {
//   return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
// }

const nFormatter =(num)  => {
  if (num >= 1000000) {
     return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
     return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

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