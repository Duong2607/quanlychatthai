import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { useMap } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import LeafletgeoSearch from './leaflet/leafletgeosearch';
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-geosearch/dist/geosearch.umd.js";
import "./Test.scss"
const provider = new OpenStreetMapProvider();

function Test() {
    // const map = useMap();
    const position = [21.0278, 105.8342]
    const mapRef = useRef();
    const [test, setTest] = useState();
    const callBack = () => {
        setTest(!test);
    }
    useEffect(() => {
        // console.log('re', results);
        // // }

        // const form = searchControl.searchElement.container.querySelector('form');
        const form = document.querySelector('form');
        if (form) {
            console.log(form);
            const testdoc = document.getElementById('test');
            testdoc.appendChild(form)
            // insertAdjacentHTML('beforeend', form)
            let getResult = async () => {
                const input = form.querySelector('input[type="text"]');
                console.log(input);

                input.addEventListener('change', async () => {
                    console.log(input.value);
                    const results = await provider.search({ query: input.value });
                    console.log('re', results);
                })

            }
            getResult()

        }

        // setTest(!test)
        //     const input = form.querySelector('input[type="text"]');
        //     console.log(input);

        //     input.addEventListener('change', () => {
        //         console.log(input.value);
        //     })
        //     // const results = provider.search({ query: "Hà Nội" });

        // }


        // searchControl.getProvider().on('results', function (data) {
        //   // Lấy dữ liệu từ kết quả tìm kiếm
        //   var result = data.results[0];
        //   console.log('Tên địa điểm:', result.text);
        //   console.log('Tọa độ:', result.x + ', ' + result.y);
        // });
        // searchControl.on('search', function (searchResult) {
        //   // Lấy dữ liệu tìm kiếm
        //   var query = searchResult.query;
        //   var results = searchResult.results;
        //   var options = searchResult.options;
        //   console.log('sss', query);

        //   // Xử lý dữ liệu tìm kiếm
        // });
        // })

        // creatSC();

        // if(i==bins.length+1) {
        //   return () => {
        //     for(let j = 0; j<bins.length++; j++) {
        //       map.removeControl(searchControl[j]);
        //     }
        //   }

        // }

        // }


    }, [test]);
    return (
        <>
            <div id='test'>
                <h1>Hello</h1>
            </div>
            <MapContainer center={position} zoom={12} scrollWheelZoom={false} style={{ display: 'none' }} ref={mapRef}>
                <LeafletgeoSearch callBack={callBack}></LeafletgeoSearch>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />



                {/* / {bins ? <CURDBinUi markericon2={markericon2} trahcanmarkericon={trahcanmarkericon} click={click} bins={bins} handleAddNewBin={handleAddNewBin} getBin={getBin} /> : ""} */}
            </MapContainer >

        </>
    )
}

export default Test;