import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'

import { useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./leafletgeosearch.scss"
import { SearchControl, OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

export default function LeafletgeoSearch({trahcanmarkericon, click, bins}) {
  const map = useMap();
  console.log(trahcanmarkericon);
  const provider = new OpenStreetMapProvider();
  



  useEffect(() => {
    if (!map) return;
   let searchControl = []

    for(let i = 0; i<bins.length; i++ ) {
       searchControl[i] = new GeoSearchControl({
        notFoundMessage: "Sorry, that address could not be found.",
        provider,
        marker: {
          icon: trahcanmarkericon,
          
        },
        showMarker: false,
        
        // onchange: (e) => {console.log(e)}
    //     moveToLocation: function (latlng) {
    //   map.setView(latlng, 12);
    // }
      });
      map.addControl(searchControl[i]);

      // if(i==bins.length+1) {
      //   return () => {
      //     for(let j = 0; j<bins.length++; j++) {
      //       map.removeControl(searchControl[j]);
      //     }
      //   }

      // }

    }
    
    
  }, [bins]);

  // return (
  //   <>
  //     {/* {searchControl?<CURDBinUi searchControl={searchControl} />:''} */}
  //   </>
  // );
  return null
}
  
