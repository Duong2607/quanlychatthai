import React, { useState, useEffect, useRef } from 'react'
import L, { marker } from "leaflet";
import { getAllBin } from '../../../services/binService';
import { useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import LeafletgeoSearch from './leafletgeosearch';
import { SearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default function LeafletRoutingMachine(props) {
  const map = useMap();
  const provider = new OpenStreetMapProvider();
  var theMarker =  useRef([]);
  let i = useRef(0);
  var routingControl =  useRef(null);
  var theListBins =  useRef([]);
  let count = useRef(0);


  const [bins, setBins] = useState();


  useEffect( () => {
    if(props.clickRoute) {
 
      if(theMarker.current[1]) {

       console.log(props.bins.length);
       theListBins.current[0] = L.latLng(theMarker.current[0]._latlng.lat, theMarker.current[0]._latlng.lng)

       props.bins.map((item, index) => {

          if(index == props.bins.length -1 ) {
            theListBins.current[index+1] = L.latLng(item.lat, item.lng);
          theListBins.current[index+2] = L.latLng(theMarker.current[1]._latlng.lat, theMarker.current[1]._latlng.lng)

          } else  theListBins.current[index+1] = L.latLng(item.lat, item.lng);
        
       
       })
       console.log(theListBins.current)
       routingControl.current =  L.Routing.control({
          waypoints: theListBins.current,
          createMarker: function() { return null; }
            
        }).addTo(map);
    }
    }
    else {
      if(routingControl.current) {
         map.removeControl(routingControl.current);
      }
    }
      
  },[props.clickRoute])
  useEffect(() => {

    console.log(props.clickSEM)
   
    if(props.clickSEM) {
          map.on('click',function(e){
          
          let lat = e.latlng.lat;
          let lon = e.latlng.lng;

          console.log("You clicked the map at LAT: "+ lat+" and LONG: "+lon );
              //Clear existing marker, 

              if (theMarker != undefined) {
                    map.removeLayer(theMarker);
              };

          //Add a marker to show where you clicked.
          if(i.current<2) {
            theMarker.current[i.current] = L.marker([lat,lon]).addTo(map);  

          }
          i.current++
      });
    }
    if(!props.clickSEM){
      console.log(theMarker.current)
      console.log(i.current)
      for(let j=0; j < i.current; j++) {
        
        if(theMarker.current[j]) {
          map.removeLayer(theMarker.current[j]);
          theMarker.current[j] = null;
        }
      }
      i.current = 0;

      map.off('click');

    }
 //   else {
    
      
      //   if (map.hasLayer(marker)) {
      //     // map.removeLayer(marker);
      // }
      
   // }

//   map.on('click',function(e){
//     let lat = e.latlng.lat;
//     let lon = e.latlng.lng;

//     console.log("You clicked the map at LAT: "+ lat+" and LONG: "+lon );
//         //Clear existing marker, 

//         if (theMarker != undefined) {
//               map.removeLayer(theMarker);
//         };

//     //Add a marker to show where you clicked.
//      theMarker = L.marker([lat,lon]).addTo(map);  
// });
      console.log('1');
      
  },[props.clickSEM]);
  // const form = document.querySelector('form');

  // if(form) {
  //   const input = form.querySelector('input[type="text"]');
  //   if(form&&input) {
  //     console.log(form,input)
  //     input.addEventListener('change', () => {
  //       console.log(input.value);
  //     })
     
  //     var marker = L.marker([21.0278, 105.9] ).addTo(map).bindPopup(form).openPopup();
  //     var marker1 = L.marker([21.0278, 105.11] ).addTo(map).bindPopup(form).openPopup();
      
      // form.addEventListener('submit', (event) => {
      //       event.preventDefault();
          
  //           const results =  provider.search({ query: input.value });
  //           console.log('....',results); // » [{}, {}, {}, ...]
  //         // });
  //   }
  // }

  return null;
}
  
