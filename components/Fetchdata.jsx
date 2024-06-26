"use client"
import React, { useState, useEffect } from 'react'
import axios, * as others from 'axios';
import bgPhoto from "../public/images/bgPhoto.jpg"
import Image from 'next/image';
import Modal from './Modal';
import ModalPana from './ModalPana';
import dynamic from "next/dynamic";
import FerstShow from './FerstShow'
const ReactPhotoSphereViewer = dynamic(
    () =>
        import('react-photo-sphere-viewer').then(
            (mod) => mod.ReactPhotoSphereViewer
        ),
    {
        ssr: false,
    }
);

export default function Fetchdata() {
    const [seqid, setSeqid] = useState('');
    const [Id, setId] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [imageDataPana, setImageDataPana] = useState([]);
    const [open, setOpen] = useState(false);
    const [positions, setPositions] = useState(null);
    const Url = 'https://195.191.45.56:9997/Elastic';
    useEffect(() => {
        // let coordinates = localStorage.getItem('coordinates');
        window.addEventListener('storage', HandelStorageChange)
        return () => {
            window.removeEventListener('storage', HandelStorageChange);
            localStorage.removeItem('coordinates');
        }
    }, [])
    const HandelStorageChange = () => {
        let coo=localStorage.getItem('coordinates')
        console.log("hefjibwiubgfiuwguiwbvuoiw");
        if (coo) {
            console.log("coordinates===" + coo);
            const data = JSON.parse(coo)
            setPositions(data);
            console.log("positions" + data);
            axios.post(`${Url}/version`).then((res) => console.log(res)).catch((err) => alert("اتصال اینترنت خود را برسی نمایید"));
            axios.post(`${Url}/map`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                localStorage.removeItem('positions');
                if (res.data === '') { alert('در مختصات انتخاب شده شما داده ای وجود ندارد') }
                const seId = res.data
                setSeqid(seId)
                console.log("useEffect" + seId);
            }).catch((err) => console.log(err))
        }
    }

    const fetchdata = () => {
        let positions = localStorage.getItem('coordinates');
        if (positions) positions = JSON.parse(positions)
        console.log(positions)

        axios.post(`${Url}/version`).then((res) => console.log(res)).catch((err) => alert("اتصال اینترنت خود را برسی نمایید"));
        axios.post(`${Url}/map`, JSON.stringify(positions), {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            localStorage.removeItem('positions');
            if (res.data === '') { alert('در مختصات انتخاب شده شما داده ای وجود ندارد') }
            const seId = res.data
            setSeqid(seId)
            console.log(seId);
        }).catch((err) => console.log(err))
    }
    const ArrayId = seqid.split(',');

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
            <button className='bg-slate-200 p-5 rounded-md hover:bg-slate-300
             hover:text-white duration-200 m-2' onClick={fetchdata}>برای بازیابی داده کلیک کنید</button>

            <div className='flex flex-row flex-wrap'>
                {
                    (seqid === '') ? (<FerstShow />) : (
                        ArrayId.map((item,index) => {
                            return (
                                <div key={index} className='hover:scale-125 p-2 duration-200'>
                                    <div key={item} className='box w-40 h-auto cursor-pointer' onClick={() => handelSequence(item)} ><Image src={bgPhoto} alt='bg' width={500} height={500} /></div>
                                </div>

                            )

                        }))
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
