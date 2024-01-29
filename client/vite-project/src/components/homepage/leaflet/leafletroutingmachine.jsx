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
  var theMarker = useRef([]);
  let i = useRef(0);
  var routingControl = useRef(null);
  var theListBins = useRef([]);
  var markers = useRef([]);

  let count = useRef(0);


  const [bins, setBins] = useState();


  useEffect(() => {
    if (props.clickRoute) {

      if (theMarker.current[1]) {

        console.log(props.bins.length);
        theListBins.current[0] = L.latLng(theMarker.current[0]._latlng.lat, theMarker.current[0]._latlng.lng)
        markers.current[0] = { latlng: [theMarker.current[0]._latlng.lat, theMarker.current[0]._latlng.lng] }
        var i = 1;
        //  props.bins.map((item, index) => {
        //   console.log(index)
        //     if(index == props.bins.length -1 ) {
        //       theListBins.current[index+1] = L.latLng(item.lat, item.lng);
        //       markers.current[index+1] = {latlng: [item.lat, item.lng]};

        //     theListBins.current[index+2] = L.latLng(theMarker.current[1]._latlng.lat, theMarker.current[1]._latlng.lng)
        //     markers.current[index+2] = {latlng: [theMarker.current[1]._latlng.lat, theMarker.current[1]._latlng.lng]}


        //     } else {  theListBins.current[index+1] = L.latLng(item.lat, item.lng); markers.current[index+1] = {latlng: [item.lat, item.lng]}; }


        //  })

        props.bins.map((item, index) => {
          console.log(index)
          if (item.status == true) {
            // theListBins.current[i] = L.latLng(item.lat, item.lng);
            markers.current[i] = { latlng: [item.lat, item.lng] };

            // theListBins.current[i+1] = L.latLng(theMarker.current[1]._latlng.lat, theMarker.current[1]._latlng.lng)
            // markers.current[i+1] = {latlng: [theMarker.current[1]._latlng.lat, theMarker.current[1]._latlng.lng]}

            i++;
          }
          //  else {  theListBins.current[index+1] = L.latLng(item.lat, item.lng); markers.current[index+1] = {latlng: [item.lat, item.lng]}; }


        })
        markers.current[i] = { latlng: [theMarker.current[1]._latlng.lat, theMarker.current[1]._latlng.lng] };
        console.log(markers.current)



        // Tính khoảng cách giữa hai marker
        function getDistance(latlng1, latlng2) {
          const lat1 = latlng1[0];
          const lon1 = latlng1[1];
          const lat2 = latlng2[0];
          const lon2 = latlng2[1];
          const R = 6371; // Bán kính Trái Đất (đơn vị: km)
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return distance;
        }
        // Tìm đường đi ngắn nhất bằng thuật toán tham lam
        function dijkstra(startIndex) {
          const n = markers.current.length - 1;
          console.log(n);

          const visited = new Array(n).fill(false);
          let distances = new Array(n).fill(Number.MAX_SAFE_INTEGER);
          const parent = new Array(n).fill(null);

          distances[startIndex] = 0;



          for (let i = 0; i < n; i++) {
            let minDistance = Number.MAX_SAFE_INTEGER;
            let minIndex = -1;

            // Tìm marker chưa được thăm có khoảng cách nhỏ nhất từ điểm xuất phát

            for (let j = 0; j < n; j++) {
              if (!visited[j] && distances[j] < minDistance) {
                minDistance = distances[j];
                minIndex = j;
                console.log(minIndex);
                parent[i] = minIndex;

              }
            }

            if (minIndex === -1) {
              break;
            }

            // Cập nhật khoảng cách từ điểm xuất phát đến các marker kề với marker hiện tại

            distances = new Array(n).fill(Number.MAX_SAFE_INTEGER);

            for (let j = 0; j < n; j++) {

              const distance = getDistance(markers.current[minIndex].latlng, markers.current[j].latlng);

              if (!visited[j] && distance < distances[j]) {
                distances[j] = distance;

              }

            }
            visited[minIndex] = true;

          }
          parent[n] = n;
          return { distances, parent };
        }

        const startIndex = 0; // Chỉ mục của điểm xuất phát trong danh sách marker
        if (markers.current) {
          let { distances, parent } = dijkstra(startIndex);
          console.log(parent);
          markers.current.sort((a, b) => {
            const indexA = parent.indexOf(markers.current.indexOf(a));
            const indexB = parent.indexOf(markers.current.indexOf(b));
            return indexA - indexB;
          });
          routingControl.current = L.Routing.control({
            waypoints: markers.current.map((marker) => L.latLng(marker.latlng)),
            createMarker: function () { return null; }

          }).addTo(map);
        }

      }

    } else {
      if (routingControl.current) {
        map.removeControl(routingControl.current);
      }
    }
  }, [props.clickRoute])
  useEffect(() => {

    console.log(props.clickSEM)

    if (props.clickSEM) {
      map.on('click', function (e) {

        let lat = e.latlng.lat;
        let lon = e.latlng.lng;

        console.log("You clicked the map at LAT: " + lat + " and LONG: " + lon);
        //Clear existing marker, 

        if (theMarker != undefined) {
          map.removeLayer(theMarker);
        };

        //Add a marker to show where you clicked.
        if (i.current < 2) {
          theMarker.current[i.current] = L.marker([lat, lon]).addTo(map);

        }
        i.current++
      });
    }
    if (!props.clickSEM) {
      console.log(theMarker.current)
      console.log(i.current)
      for (let j = 0; j < i.current; j++) {

        if (theMarker.current[j]) {
          map.removeLayer(theMarker.current[j]);
          theMarker.current[j] = null;
        }
      }
      i.current = 0;

      map.off('click');

    }

    console.log('1');

  }, [props.clickSEM]);



  return null;
}

