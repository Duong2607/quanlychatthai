import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { memo } from 'react';
import { useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import { SearchControl, OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

function LeafletgeoSearchForAdmin({ callBack }) {
    const map = useMap();
    const provider = new OpenStreetMapProvider();




    useEffect(() => {
        if (!map) return;
        // let searchControl = []
        console.log(map)
        // for (let i = 0; i < bins.length; i++) {
        // let creatSC 
        let searchControl = new GeoSearchControl({
            notFoundMessage: "Sorry, that address could not be found.",
            provider,
            // marker: {
            //   icon: trahcanmarkericon,
            //   size: [10, 10]
            // },
            // showMarker: false,
            // onSubmit: (e) => {console.log('da');}
        });
        const form = searchControl.searchElement.container.querySelector('form');
        if (form) {


            const input = form.querySelector('input[type="text"]');
            console.log(input);

            input.addEventListener('change', () => {
                console.log(input.value);
            })
        }
        console.log(searchControl.autoSearch()
            .then((e) => {
                console.log(e);
            }));

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
        map.addControl(searchControl);
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
        callBack();

    }, []);

    // return (
    //   <>
    //     {/* {searchControl?<CURDBinUi searchControl={searchControl} />:''} */}
    //   </>
    // );
    return null
}

export default memo(LeafletgeoSearchForAdmin)
