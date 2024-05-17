import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
export default function ModalPana(props) {
    const [activeImg, setActiveImg] = useState()
    var [counter, setCounter] = useState(0)
    const [showVideo, setShowVideo] = useState()



    const [play, setPlay] = useState(false)

    useEffect(() => {
        if (props.imageData) {
            setActiveImg(props.imageData[counter])
        }
    }, [props.imageData, counter, play])

    if (!props.Open) return null;

    const playpana = () => {
        let newPlay = !play;
        console.log(play);
        if (newPlay) {
             let interval = setInterval(() => {
                if (newPlay) {
                    setCounter(++counter)
                    console.log(counter);
                }
                else{
                    return 0
                }
                
            }, 800)
            setShowVideo(interval);
        }
        else {
            clearInterval(showVideo);
            console.log("clear Intevall");
        }
        setPlay(newPlay)
    }

    const Handelclose = (e) => {
        if (e.target.id === 'wrapper') props.onClose();
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center transition-colors bg-opacity-25 z-50  border-black' id='wrapper' onClick={Handelclose}>
            <div className='w-[900px] flex flex-col'>
                <button className='text-black  place-self-end rounded p-2 mb-1' onClick={() => props.onClose()}><IoIosCloseCircle className='text-3xl bg-white' /></button>
                <div className='bg-slate-200 rounded '>
                    <div className='w-full'>
                        <ReactPhotoSphereViewer key={activeImg} src={activeImg} height={'85vh'} width={"100%"}></ReactPhotoSphereViewer>
                        <div className='flex justify-between items-center'>
                            <span onClick={() => {
                                setPlay(false);
                                if (counter > 0) {
                                    setCounter(--counter);
                                }
                                else {
                                    counter = 0;
                                }
                            }} className='p-2 hover:bg-slate-400 duration-200 hover:text-white'><FaAngleDoubleLeft /></span>

                            <span className='hover:text-blue-500 hover:scale-110 duration-150' onClick={playpana}>
                                {(play) ? (<FaStop />) : (<FaPlay/>)}
                            </span>
                            <span onClick={() => {
                                setPlay(false);
                                if (counter <= props.imageData.length - 1) {
                                    setCounter(++counter);
                                }
                                else {
                                    counter = 0;
                                }
                            }} className='p-2 hover:bg-slate-400 duration-200 hover:text-white'><FaAngleDoubleRight /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}