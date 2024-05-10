"use client"
import React, { useState } from 'react'
import axios from 'axios'
import bgPhoto from "../public/images/bgPhoto.jpg"
import Image from 'next/image';
import Modal from './Modal';

// import { Panorama } from 'panolens';
export default function Fetchdata() {
    const [seqid, setSeqid] = useState('');
    const [Id, setId] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [open, setOpen] = useState(false);

    const Url = 'https://195.191.45.56:9997/Elastic'
    let coordinates = {
        minLatitude: 20,
        minLongitude: 20,
        maxLatitude: 40,
        maxLongitude: 40,
    };
    const fetchdata = () => {
        console.log(coordinates);
        axios.post(`${Url}/version`).then((res) => console.log(res)).catch((err) => alert("اتصال اینترنت خود را برسی نمایید"))
        axios.post(`${Url}/map`, JSON.stringify(coordinates), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                const seId = res.data
                setSeqid(seId)
                console.log(seId);
            }).catch((err) => console.log(err))
    }
    const ArrayId = seqid.split(',');

    const handelSequence = (id) => {
        setImageData([]);
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
            Id.sort((a,b)=>a.capturedAt-b.capturedAt);/////////////sort capturedAt
            console.log(Id);
            Id.map((item) => {
                if (item.isPano) {
                    console.log('panoo');
                    // <Panorama id={item.id}/>
                }
                else {
                    axios.post('https://195.191.45.56:9997/Elastic/image', JSON.stringify(item.id), {
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
        <>
            <button className='bg-purple-600 p-5 rounded-full' onClick={fetchdata}>click</button>
            <div className='flex flex-row flex-wrap'>
                {
                    ArrayId.map((item) => {
                        return <div key={item} className='box w-40 h-auto cursor-pointer' onClick={() => handelSequence(item)} ><Image src={bgPhoto} alt='bg' width={500} height={500} /></div>
                    })
                }
            </div>
            <Modal Open={open} onClose={() => setOpen(false)} imageData={imageData} />


        </>
    )
}
