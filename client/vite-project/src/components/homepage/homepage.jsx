import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faRoute } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer } from 'react-leaflet';
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
import { Link, useNavigate } from "react-router-dom";
import CURDBinUi from '../binManage/curdBinUi';
import io, { connect } from "socket.io-client";
const provider = new OpenStreetMapProvider();
const socket = io.connect("http://localhost:8080");
import axios from 'axios';
function HomePage() {
  const navigate = useNavigate();
  const [color, setColor] = useState('empty');
  const [addTrash, setAddTrash] = useState(false);
  const [markericon, setMarkericon] = useState(markericon1);
  const [bins, setBins] = useState();
  const [binLoCo, setBinLoCo] = useState(0);
  const [addBin, setAddBin] = useState(true);
  const [click, setClick] = useState(false);
  const [clickSEM, setClickSEM] = useState(false);
  const [clickRoute, setClickRoute] = useState(false);
  const [input, setInput] = useState('');
  const [form, setForm] = useState('');
  const [address, setAddress] = useState('');


  //  const [form, setForm] = useState([]);
  let searchControl = new GeoSearchControl({
    notFoundMessage: "Sorry, that address could not be found.",
    provider,
    // marker: {
    //   icon: props.trahcanmarkericon,

    // },
    showMarker: false,

    // onchange: (e) => {console.log(e)}
    //     moveToLocation: function (latlng) {
    //   map.setView(latlng, 12);
    // }

  });


  let vaInput = searchControl.searchElement.container.querySelector('form').querySelector('input[type="text"]').value
  if (vaInput) {
    console.log('form', vaInput);

  }

  const goToTest = () => {
    // console.log(form);
    navigate("/test");
  }

  useEffect(() => {

    // form.push(searchControl.searchElement.container.querySelector('form'))
    // console.log('...');
    let lform = searchControl.searchElement.container.querySelector('form')
    if (lform) {
      console.log(lform);
      setForm(lform);
    }

    // if (vaInput) {
    //   console.log('form', vaInput);

    // }


    // // const input = form.querySelector('input[type="text"]')
    // // if (vaInput) {
    // //   setInput(vaInput)

    // const results = await provider.search({ query: "Hà Nội" });
    // console.log('re', results);
    // // }



  }, [])


  // map.addControl(searchControl);
  // useEffect(() => {
  //   let getSearch = async () => {
  //     if (input) {
  //       const results = await provider.search({ query: input });
  //       console.log('re', results);
  //     }

  //   }
  //   getSearch();


  // }, [input])
  // console.log(typeof (form[0]))
  let getBin = async () => {
    let binss = await getAllBin();
    await setBins(binss.bins);
  }

  useEffect(() => {

    getBin()


  }, [])
  useEffect(() => {
    console.log(bins);
    if (bins != undefined) {
      let j = 1;
      for (let i = 0; i < bins.length; i++) {
        console.log(bins);
        if (!bins[i].connect) {
          console.log('1');
          setBinLoCo(j);
          j++;
        }
      }

    }

  }, [bins])

  useEffect(() => {
    socket.on('updatebin', () => {
      console.log('222222')

      getBin();
    })
  }, [])

  const position = [21.0278, 105.8342]
  const mapRef = useRef();
  const myRef = useRef();
  const trahcanmarkericon = new L.Icon({
    iconUrl: color == "red" ? markericon2 : color == "green" ? markericon1 : markericon3,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],

  })

  // useEffect(() => {
  //   // const map = useMap();
  //   let searchControl = new GeoSearchControl({
  //     notFoundMessage: "Sorry, that address could not be found.",
  //     provider,

  //     showMarker: false,

  //   });
  //   // map.addControl(searchControl);
  // }, [])



  async function handleAddBin() {
    // if (click == true) {
    //   await setClick(false);
    //   // xóa marker thêm mới
    //   let markerAdd = document.getElementsByClassName('leaflet-interactive');
    //   markerAdd[markerAdd.length - 1].remove();

    //   // xóa popup của marker thêm mới
    //   let popup = document.getElementsByClassName('leaflet-popup leaflet-zoom-animated');
    //   popup[0].remove();

    // } else setClick(true);
    setAddTrash(!addTrash);

  }
  let handleAddNewBin = async (data) => {

    let res = await addNewBin(data);
    if (res.errCode) {
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
    setClickSEM(!clickSEM)
  }

  let setRouter = async () => {
    if (clickRoute) {
      setClickRoute(false);
    } else {
      await getBin();

      setClickRoute(true);
    }
  }

  function createIcon(url) {
    return new L.Icon({
      iconUrl: url,
      iconSize: [25, 25]
    });
  }

  function getMarkerIcon(index) {
    if (index == 'selectedIndex') {
      return createIcon(markericon1);

    }
    return createIcon(markericon2);
  }

  const handleOnChangeText = (value) => {
    setInput(value);
  }
  return (
    <>
      <div className='background'>

        <div className='sidebar'>

          <img src='src/assets/logoweb.png'></img>
          <hr />
          <h2 className='home' onClick={goToTest}>Home</h2>
          {/* <h2 >
                  Setting
                
                </h2> */}
        </div>
        <div className='header'>

        </div>
        <div className='content' >
          <div className="overview">
            <h2>Overview</h2>
            <hr />
            <p>Trash total: {bins && bins.length}</p>
            <p>Trash lose connection: {binLoCo}</p>
            {/* <p>Trash total:</p> */}

          </div>
          <div className="dashboard">
            <h2>Dashboard</h2>
            <hr />
            <div className='faMap' onClick={startEndMarker} style={{ color: clickSEM ? 'green' : '' }}>
              <FontAwesomeIcon icon={faMapLocationDot} className='faicon' />
              <p>Start-End</p>
            </div>
            <div className='faRoute' onClick={setRouter} style={{ color: clickRoute ? 'green' : '' }}>
              <FontAwesomeIcon icon={faRoute} className='faicon' />
              <p>Router</p>
            </div>
          </div>
        </div>
      </div>

      <MapContainer center={position} zoom={12} scrollWheelZoom={false} ref={mapRef} >
        <LeafletgeoSearch style={{ marginTop: '100px' }} trahcanmarkericon={trahcanmarkericon} click={click} bins={bins}></LeafletgeoSearch>
        {addBin && bins ?
          <div className='addBinContainer'>
            <div className='buttonaddbin' onClick={handleAddBin}>
              <FontAwesomeIcon icon={faTrashCan} className='faicon' />
            </div>
          </div>
          : ''}
        <LeafletRoutingMachine clickSEM={clickSEM} clickRoute={clickRoute} bins={bins} />
        {/* <LeafletgeoSearch></LeafletgeoSearch> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {addTrash && <Marker position={[21.02, 105.8]} icon={createIcon(markericon3)}>
          <Popup>
            {/* <input type="text" id="fname" name="fname" onClick={setInput}></input> */}
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>}
        {bins && bins.map((item) => {
          return <Marker position={[item.lat, item.lng]} icon={item.status ? getMarkerIcon('') : getMarkerIcon('selectedIndex')} key={item._id}>
            <Popup>
              {/* A pretty CSS3 popup. <br /> Easily customizable. */}
              {/* <p>{getReverseGeocodingData(item.lat, item.lng)}</p> */}
              <p>Địa chỉ: </p>
              {item.connect ? <p style={{ color: 'green' }}>Connecting</p> : <p style={{ color: 'red' }}>Lose connect</p>}
            </Popup>
          </Marker>
        })}

        {/* / {bins ? <CURDBinUi markericon2={markericon2} trahcanmarkericon={trahcanmarkericon} click={click} bins={bins} handleAddNewBin={handleAddNewBin} getBin={getBin} /> : ""} */}
      </MapContainer >


    </>
  )
}

export default HomePage;