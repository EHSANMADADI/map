import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

export default function Modal(props) {
     if (!props.Open) return null;

     const Handelclose = (e) => {
          if (e.target.id === 'wrapper') props.onClose();

     }
     var [index, setIndex] = useState(0);
     console.log(index);
     return (
          <div className='fixed inset-0 w-full flex justify-center items-center transition-colors bg-opacity-25 z-50   border-black' id='wrapper' onClick={Handelclose}>
               <div className='w-36 sm:w-[300px]  flex flex-col'>
                    <button className='text-black  place-self-end rounded p-2 mb-1' onClick={() => props.onClose()}><IoIosCloseCircle className='text-3xl bg-white' /></button>
                    <div className='bg-slate-200 rounded '>
                         <div className='w-full'>
                              <img className='w-full h-auto' src={props.imageData[index]} />
                              <div className='flex justify-center'>
                                   <span onClick={() => {
                                        if (index > 0) {
                                             setIndex(--index)
                                        }
                                        else{
                                             index = 0;
                                        }
                                   }} className='p-2 hover:bg-slate-400 duration-200 hover:text-white'><FaAngleDoubleLeft /></span>
                                   <span onClick={() => {
                                        if (index <= props.imageData.length) {
                                             setIndex(++index)
                                        }
                                        else{
                                             index=0;
                                        }
                                   }} className='p-2 hover:bg-slate-400 duration-200 hover:text-white'><FaAngleDoubleRight /></span>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}
