import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, useMap,  } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import "./homepage.scss" 
import "leaflet/dist/leaflet.css"
import markericon1 from "../../assets/th.png"
import markericon2 from "../../assets/th2.png"
import markericon3 from "../../assets/trashcanicon.png"
import logoweb from "../../assets/logoweb.png"
import LeafletgeoSearch from './leaflet/leafletgeosearch';
import LeafletRoutingMachine from './leaflet/leafletroutingmachine';
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-geosearch/dist/geosearch.umd.js";
import { getAllBin, addNewBin } from '../../services/binService';
import { SearchControl, OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import CURDBinUi from '../binManage/curdBinUi';
const provider = new OpenStreetMapProvider();

  function HomePage () {

    const [color, setColor] = useState('empty');
    const [markericon, setMarkericon] = useState(markericon1);
    const [bins, setBins] = useState();
    const [addBin, setAddBin] = useState(true);
   const [click, setClick] = useState(false);
   const [clickSEM, setClickSEM] = useState(false);
   const [clickRoute, setClickRoute] = useState(false);

   
  

    let form = document.querySelector('form')
    
    console.log(form)
        let getBin = async () => {
          let binss =  await getAllBin();
         setBins(binss.bins);
       }

       useEffect( () => {

       getBin();
       
    }, [])
    
        const position = [21.0278, 105.8342]
        const mapRef = useRef();
        const myRef = useRef();
        const trahcanmarkericon = new L.Icon({
            iconUrl:  color=="red"?markericon2:color=="green"?markericon1:markericon3,
            iconSize: [35, 45],
            iconAnchor: [17, 46], 
        popupAnchor: [0, -46],
      
      })


      

      async function  handleAddBin() {
        if(click == true) {
          await setClick(false);
          // xóa marker thêm mới
          let markerAdd =document.getElementsByClassName('leaflet-interactive');
          markerAdd[markerAdd.length-1].remove();

          // xóa popup của marker thêm mới
          let popup= document.getElementsByClassName('leaflet-popup leaflet-zoom-animated');
          popup[0].remove();

        } else setClick(true);
        
      }
    let handleAddNewBin = async (data) => {

       let res = await addNewBin(data);
      if(res.errCode) {
        alert(`${res.errMessage}`)
        return 1
      } else {
        console.log('1');

        alert(`${res.errMessage}`)
        await handleAddBin()
       
        getBin();
        return 0
      }
  

    }

    // let handleDeleteBin = async () => {
    //   getBin();

    // }

    let startEndMarker = () => {
      if(clickSEM) {
        setClickSEM(false);
      } else setClickSEM(true);
    }

    let setRouter = async () => {
      if(clickRoute) {
        setClickRoute(false);
      } else { 
        await getBin();

        setClickRoute(true); 
      }
    }
    
    return (
        <>
            <div className='background'>
            
              <div className='sidebar'>
              
                <img src='src/assets/logoweb.png'></img>
                <hr />
                <h2 className='home'>Home</h2>
                <h2 >
                  Setting
                </h2>
              </div>
              <div className='header'>

              </div>
              <div className='content' >
                <div className="overview">
                  <h2>Overview</h2>
                  <hr />
                  <p>Trash total:</p>
                  <p>Trash lose connection:</p>
                  <p>Trash total:</p>

                </div>
                <div className="dashboard">
                  <h2>Dashboard</h2>
                  <hr />
                  <div className='faMap' onClick={startEndMarker} style={{color:clickSEM?'green':''}}>
                    <FontAwesomeIcon icon={faMapLocationDot} className='faicon'/>  
                    <p>Start-End</p>
                  </div>
                  <div className='faRoute' onClick={setRouter} style={{color:clickRoute?'green':''}}>
                    <FontAwesomeIcon icon={faRoute} className='faicon'/>
                    <p>Router</p>
                  </div>
                </div>
              </div>
            </div>
            

            
            <MapContainer center={position} zoom={12} scrollWheelZoom={false} ref={mapRef}>
            {addBin&&bins?
            <div className='addBinContainer'>
                {bins?<LeafletgeoSearch trahcanmarkericon={trahcanmarkericon} click={click} bins={bins}></LeafletgeoSearch>:""}
              <div className='buttonaddbin'  onClick={ handleAddBin}>
                <FontAwesomeIcon icon={faTrashCan} className='faicon'/>
              </div>
            </div>
            :''}
            <LeafletRoutingMachine clickSEM={clickSEM} clickRoute = {clickRoute} bins={bins}/>

                  <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

            

           {bins?<CURDBinUi markericon2={markericon2} trahcanmarkericon={trahcanmarkericon} click={click} bins={bins} handleAddNewBin = {handleAddNewBin} getBin = {getBin}/>:""} 
            </MapContainer>
            
        
        </>
    )
  }
  
  export default HomePage;