import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
export default function ModalPana(props) {
    const [activeImg, setActiveImg] = useState('')
    const [counter, setConter] = useState(0)

    useEffect(()=>{
        if(props.imageData){
            setActiveImg(props.imageData[counter])
        }
    }, [props.imageData, counter])

    if (!props.Open) return null;
    const playpana = () => {
        setInterval(()=>{
            setConter(counter + 1)
        }, 800)
    }

    const Handelclose = (e) => {
        if (e.target.id === 'wrapper') props.onClose();

    }
    var [index, setIndex] = useState(0);
    const [play, setPlay] = useState(false)
    console.log(props.imageData);
    const handelPlay = () => {
        console.log("handelplay..................");
        // setPlay(!play)
    }

    // defewdf
    return (
        <div className='fixed inset-0 flex justify-center items-center transition-colors bg-opacity-25 z-50  border-black' id='wrapper' onClick={Handelclose}>
            <div className='w-[900px] flex flex-col'>
                <button className='text-black  place-self-end rounded p-2 mb-1' onClick={() => props.onClose()}><IoIosCloseCircle className='text-3xl bg-white' /></button>
                <div className='bg-slate-200 rounded '>
                    <div className='w-full'>
                        {
                            (!play) ? (<><ReactPhotoSphereViewer key={props.imageData[index]} src={activeImg} height={'85vh'} width={"100%"}></ReactPhotoSphereViewer>
                                <div className='flex justify-between items-center'>
                                    <span onClick={() => {
                                        if (index > 0) {
                                            setIndex(--index);
                                        }
                                        else {
                                            index = 0;
                                        }
                                    }} className='p-2 hover:bg-slate-400 duration-200 hover:text-white'><FaAngleDoubleLeft /></span>

                                    <span className='hover:text-blue-500 hover:scale-110 duration-150' onClick={handelPlay}>
                                        {(play) ? (<FaStop />) : (<FaPlay />)}

                                    </span>
                                    <span onClick={() => {
                                        if (index <= props.imageData.length - 1) {
                                            setIndex(++index);
                                        }
                                        else {
                                            index = 0;
                                        }
                                    }} className='p-2 hover:bg-slate-400 duration-200 hover:text-white'><FaAngleDoubleRight /></span>
                                </div></>) :
                                (playpana())

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
