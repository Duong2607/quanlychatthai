// import L, { icon, marker } from "leaflet";
// import { useMap } from 'react-leaflet';
// import "leaflet/dist/leaflet.css"
// import { OpenStreetMapProvider } from "leaflet-geosearch";
// import { useEffect, useState, useLayoutEffect, useRef } from "react";
// import { getAllBin, addNewBin, updateBin, deleteBin } from '../../services/binService';
// import {  GeoSearchControl } from "leaflet-geosearch";
// import io from "socket.io-client";
// import markericon1 from '../../assets/th.png'
// import markericon2 from "../../assets/th2.png"
// import markericon3 from "../../assets/trashcanicon.png"
// const socket = io.connect("http://localhost:8080");
// let searchControl 



// export default  function CURDBinUi(props) {
//     const [bins, setBins] = useState();

//     let getBin = async () => {
//         let binss =  await getAllBin();
//        setBins(binss.bins);
    
//      }
//      const map = useMap();
//      var layerGroup = L.layerGroup().addTo(map);


//      useEffect( () => {


//         const forms = document.querySelectorAll('form');

//         console.log(forms)
//         props.bins.map(async (item, index) => {
            


//         })
//      getBin();

     
//   }, [])
//     const provider = new OpenStreetMapProvider();
    
//     let newLL = useRef();
//     useEffect( () => {
//         socket.on('updatebin', () => {
//                 console.log('222222')
//                 map.removeLayer(layerGroup)
//                 const forms =  document.querySelectorAll('form');
//                 if(props.bins) {
//                     props.bins.map(async (item, index) => {
//                         console.log(index)
//                         if(forms[index]&&forms[index].childNodes[3]) {
//                             await forms[index].childNodes[3].remove();
            
//                         }
                        
                        
//                     })
//                 }
//                 props.getBin();
//         })
//     },[])



    


//        useEffect(  () => {
      
//        const forms =  document.querySelectorAll('form');

        
//        if(props.bins) {

        
//             props.bins.map(async (item, index) => {

//             const html =
//             `<div><p style='margin-top: 0; margin-bottom: 10px;'>
//             IP:</p> <input type="text" id="ipv4fix" 
//             pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" 
//             value = "${item.ip}"
//             title="IPv4"></input> 
//             <span id = 'ipv4notfix' style = 'margin: 0; margin-top: 16px; display: none; color: red;'>
//             Vui lòng nhập đúng định dạng ip</span>
//             <br/> 
//             <div style ='display: flex;'>
//             <button
//             style = ' margin-top: 10px; background-color: red'; 
//             id = 'buttondeletebin${index}'
//             >DeleteBin</button>
//             <button style = 'margin-left: 40px; margin-top: 10px; background-color: #ccc;';  
//             id ='buttonfixbin${index}'; type="submit">Update</button>
//             </div>
//             <button style = 'margin-left: 130px; margin-top: 10px; background-color: #ccc';  
//             id ='buttoncancelfixbin${index}'; type="submit">Cancel</button></div>
            
//             `
//             if(forms[index]) {
//                 console.log(forms[index])
//            forms[index].insertAdjacentHTML('beforeend', html)
//             }            
            
//         const trahcanmarkericon = new L.Icon({
//             iconUrl:  item.status?markericon2:markericon1,
//             iconSize: [35, 45],
//             iconAnchor: [17, 46], 
//         popupAnchor: [0, -46],
      
//       })

//             // create markers
//             var markers = L.marker([item.lat, item.lng], {icon: trahcanmarkericon } );
//             await markers.addTo(layerGroup).bindPopup(forms[index]);

//             if(markers) { // neu markers tạo mới tồn tại thực hiện cập nhật vị trí markers khi user nhập địa chỉ
               
//                     map.on('popupopen', async function(e) {
                       
                        
//                         var marker = e.popup._source;   
//                         let lastLat =   marker._latlng.lat;
//                         let lastLng =   marker._latlng.lng;
                        
//                         if(marker==markers) {
//                             document.getElementById(`buttonfixbin${index}`).addEventListener('click', async ()=> {
//                         if(marker==markers) {

//                                 let ipv4 = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
                          
//                                 //check nguoi dung co nhap dung dinh dang ip khong
//                                 if(!ipv4.test(document.getElementById('ipv4fix').value)) {
//                                     // hien loi nhap sai dinh dang ip
//                                     document.getElementById('ipv4notfix').style.display = 'block';
                                   
//                                 } else {
//                                     // an loi di ghi da nhap dung
//                                     document.getElementById('ipv4notfix').style.display = 'none';
//                                     let ip = document.getElementById('ipv4fix').value;
//                                     console.log(ip);
//                                     let data = {
//                                         idBin: item._id,
//                                         lat: markers._latlng.lat,
//                                         lng: markers._latlng.lng,
//                                         ip: ip
//                                     }
//                                     let res = await updateBin(data);
//                                     if(res.errCode) {
        
//                                         alert(`${res.errMessage}`);
//                                     } else {
//                                         alert(`${res.errMessage}`);
//                                         markers.closePopup();
//                                     }
                                    
//                                 }
                                
//                             }
//                             })

//                             document.getElementById(`buttoncancelfixbin${index}`).addEventListener('click', () => {
//                             if(marker==markers) {
//                                             let lat = item.lat;
//                                             let lng = item.lng;
//                                             let lastLL = new L.latLng(lat, lng)
                                            
//                                 // ham change cap nhat vi tri tam thoi cho marker ma nguoi dung muon update vi tri
//                                 function change() {
//                                     // kiem tra marker nao la marker dang duoc open popup thi update vi tri
//                                     if(marker==markers) {
                                    
//                                         console.log('chan')
//                                         markers.setLatLng(lastLL) 
//                                         // cap nhat lai popup
//                                         markers.closePopup();
//                                         markers.openPopup();
//                                         markers.addTo(map);
//                                         markers.addTo(layerGroup)
//                                         marker = null;
//                                         // console.log(forms[index]);
//                                         forms[index].querySelector('input[type="text"]').value = '';
//                                     }
                
//                             }
                            
//                                 change();
                        
//                             }
//                             })



//                             document.getElementById(`buttondeletebin${index}`).addEventListener('click', async () =>{
//                                 if(marker==markers) {

//                                     console.log('1');
//                                     let data = {
//                                         id: item._id
//                                     }
//                                     let res = await deleteBin(item._id)
//                                     if(res.errCode) {
//                                         alert(res.errMessage)
    
//                                     } else {
//                                         alert(res.errMessage)
//                                         map.removeLayer(layerGroup)
                                        
//                                         await props.getBin();
//                                     }
//                                 }
//                             })

//                         }
//                 //bat su kien nguoi dung chon dia chi
//                 forms[index].querySelector('div').addEventListener('click',() => {
//                         // lay du lieu ve dia chi ma nguoi dung vua nhap
//                         map.on('geosearch/showlocation', async function (e) {
//                             console.log(marker)
//                             console.log(e);
//                             let lat = e.location.y;
//                             let lng = e.location.x;
//                             newLL = new L.latLng(lat, lng)
               
//                 // ham change cap nhat vi tri tam thoi cho marker ma nguoi dung muon update vi tri
//                 function change() {
//                     // kiem tra marker nao la marker dang duoc open popup thi update vi tri
//                     if(marker==markers) {
                      
//                         console.log('chan')
//                         markers.setLatLng(newLL) 
//                         // cap nhat lai popup
//                         markers.closePopup();
//                         markers.openPopup();
//                         markers.addTo(map);
//                         markers.addTo(layerGroup)
//                         marker = null;
//                     }
   
//             }
            
//                  change();
//                  await markers.addTo(layerGroup)
        
//         })
//                     })
//                 })




       
//             }

//            })


//        }
//        return () => {
//         const forms =  document.querySelectorAll('form');
//         if(props.bins) {
//             props.bins.map(async (item, index) => {
//                 console.log(index)
//                 if(forms[index]&&forms[index].childNodes[3]) {
//                     await forms[index].childNodes[3].remove();
    
//                 }
                
                
//             })
//         }
       
//         console.log('hhhh')

//     }
      
       
//     },[props.bins])

//     useEffect(()=> {
//         console.log(props.click)
//         let curd = async() => {
//             if(props.click) {
//                 console.log('vcl1')
//                      searchControl = new GeoSearchControl({
//                     notFoundMessage: "Sorry, that address could not be found.",
//                     provider,
//                     // marker: {
//                     //   icon: props.trahcanmarkericon,
                      
//                     // },
//                     showMarker: false,
                    
//                     // onchange: (e) => {console.log(e)}
//                 //     moveToLocation: function (latlng) {
//                 //   map.setView(latlng, 12);
//                 // }
                    
//                   });
//                   map.addControl(searchControl);
//                   console.log(searchControl)
        
//                 const form = searchControl.searchElement.container.querySelector('form')
                  
//                 if(form) {
                    
                    
//                     const input = form.querySelector('input[type="text"]');
//                     if(form&&input) {
//                     console.log(form,input)
                    
//                 const html =
//                  `<div><p style='margin-top: 0; margin-bottom: 10px;'>
//                  Enter IP:</p> <input type="text" id="ipv4" 
//                  pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" 
//                  title="IPv4"></input> 
//                  <span id = 'ipv4not' style = 'margin: 0; margin-top: 16px; display: none; color: red;'>
//                  Vui lòng nhập đúng định dạng ip</span>
//                  <br/> 
//                  <button style = 'margin-left: 120px; margin-top: 10px; background-color: #ccc';  
//                  id ='buttonaddbin1'; type="submit">Add Bin</button></div>`
//                 form.insertAdjacentHTML('beforeend', html)
//                 console.log(form.querySelector('input'))
//                 document.getElementById('buttonaddbin1').addEventListener("click", async ()=> {
                       
//                         let lat = markers._latlng.lat;
//                         let lng = markers._latlng.lng;
                        
//                         let ipv4 = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
//                         console.log(ipv4.test(document.getElementById('ipv4').value))
                        
//                         if(!ipv4.test(document.getElementById('ipv4').value)) {
//                             // hien loi nhap sai dinh dang ip
//                             document.getElementById('ipv4not').style.display = 'block';
//                         } else {
//                             // an loi di ghi da nhap dung
//                             document.getElementById('ipv4not').style.display = 'none';
//                             let ip = document.getElementById('ipv4').value;
//                             let data = {
//                                 lat,
//                                 lng,
//                                 ip
//                             }
//                            let a = await props.handleAddNewBin(data);
//                            if(!a) {
//                             map.removeLayer(layerGroup)
//                             map.removeControl(searchControl);
//                            }
                            
//                         }
                        
//                     })


//                     input.addEventListener('change', () => {
//                         console.log(input.value);
//                     })
//                     var layerGroup1 = L.layerGroup().addTo(map);
    
//     // create markers
//                     var markers = L.marker([21.0278, 105.8342], {icon: props.trahcanmarkericon} );
//                     console.log(markers);
    
//                     markers.addTo(layerGroup1).bindPopup(form).openPopup();
//                     console.log(markers.getPopup())   

//                     if(markers) { // neu markers tạo mới tồn tại thực hiện cập nhật vị trí markers khi user nhập địa chỉ
//                             form.addEventListener('click',async () => {
                            
                                
//                                 map.on('geosearch/showlocation', async function (e) {
//                                 function change() {
//                                     console.log(e);
//                                     let lat = e.location.y;
//                                     let lng = e.location.x;
//                                     let newLL = new L.latLng(lat, lng)
//                                     markers.setLatLng(newLL)
//                                     markers.openPopup();
//                                     markers.addTo(map);
//                                 }
//                                 await change();
//                             });
                            
                            
                            
//                     })
//                     }
//             }
//             } 
    
//                 }
//                                 if(!props.click) {
//                                     if(searchControl) {
                                        
//                                         console.log('////')
//                                         map.removeControl(searchControl);
//                                         if(layerGroup1) {
//                                          map.removeLayer(layerGroup1);

//                                         }
//                                     }

       
//                     } 
//         }
//         curd();
//     },[props.click])




//   return null;
// }
  
