import React, { useEffect, useState } from 'react'
import axios from 'axios';
import bgPhoto from "../public/images/bgPhoto.jpg";
import Image from 'next/image';
import Modal from './Modal';
export default function FerstShow() {
     let coordinates = {
          MinLatitude: 20,
          MinLongitude: 20,
          MaxLatitude: 40,
          MaxLongitude: 40,
     };
     const [box, setBox] = useState('');
     const [Id, setId] = useState([]);
     const [imageData, setImageData] = useState([]);
     const [imageDataPana, setImageDataPana] = useState([]);
     const [open, setOpen] = useState(false);
     const Url = 'https://195.191.45.56:9997/Elastic';
     useEffect(() => {
          axios.post(`${Url}/map`, JSON.stringify(coordinates), {
               headers: {
                    'Content-Type': 'application/json',
               }
          }).then((response) => {
               const seId = response.data
               setBox(seId);
          }).catch((err) => alert("Eroor is:" + err));
     }, [])
     const ArrayId = box.split(',');

     const handelSequence = (id) => {
          setImageData([]);
          setImageDataPana([]);
          console.log(JSON.stringify(id));
          axios.post(`${Url}/sequence`, JSON.stringify(id), {
               headers: {
                    'Content-Type': 'application/json',
               }
          }).then((res) => {
               setId(res.data);
          })
          console.log(Id);
          if (Id.length === 0) {
               console.log("zerooooo");
          }

          else {
               Id.sort((a, b) => a.capturedAt - b.capturedAt);/////////////sort capturedAt
               console.log(Id);
               Id.map((item) => {
                    if (item.isPano) {
                         axios.post(`${Url}/image`, JSON.stringify(item.id), {
                              headers: {
                                   'Content-Type': 'application/json',
                              },
                              responseType: "blob"
                         }).then((response) => {
                              const reader = new window.FileReader();
                              reader.readAsDataURL(response.data);
                              reader.onload = function () {
                                   var imageDataUrl = reader.result;
                                   setImageDataPana((prev) => {
                                        const p = [...prev];
                                        p.push(imageDataUrl);
                                        return p;
                                   })
                              }
                         })
                         setOpen(true);
                    }
                    else {
                         axios.post(`${Url}/image`, JSON.stringify(item.id), {
                              headers: {
                                   'Content-Type': 'application/json',
                              },
                              responseType: "blob"
                         }).then((response) => {
                              const reader = new window.FileReader();
                              reader.readAsDataURL(response.data);
                              reader.onload = function () {
                                   var imageDataUrl = reader.result;
                                   setImageData((prev) => {
                                        const p = [...prev];
                                        p.push(imageDataUrl);
                                        return p;
                                   })
                              }
                         })
                         setOpen(true);
                    }
               });
          }
     }
     return (
          <div className='w-full'>
               <div className='flex flex-row flex-wrap'>
                    {
                         ArrayId.map((item,index) => {
                              return (
                                   <div key={index} className='hover:scale-125 p-2 duration-200'>
                                        <div key={item} className='box w-40 h-auto cursor-pointer' onClick={() => handelSequence(item)} ><Image src={bgPhoto} alt='bg' width={500} height={500} /></div>
                                   </div>

                              )

                         })
                    }
               </div>
               <div className='w-full'>
                    {

                         (imageData.length != 0 && <Modal Open={open} onClose={() => setOpen(false)} imageData={imageData} />)
                    }
                    {

                         (imageDataPana.length != 0 && <ModalPana Open={open} onClose={() => setOpen(false)} imageData={imageDataPana} />)
                    }
               </div>

          </div>
     )
}
