import React from 'react'
import banner from '../img/1.png'


const Banner = (props) => {
  return (

    <div className="cardImg  rounded-pill flex flex-col items-center bg-purple-900 rounded-lg shadow md:flex-row ">
      <img className="carimgH object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={banner} alt="" width="40px" height="40" />
      <div id="cuerpoAlerta" className="flex flex-col justify-between p-4 leading-normal">
        <h3 className="mb-2 font-bold text-6xl text-blue-500 text-center tracking-tight  dark:text-white">CUARTO DE CHENZ</h3>
        <h5 className="mb-3 text-center  text-blue-300 text-3xl" > {props.aviso}</h5 >
      </div >
    </div >

  )
}

export default Banner
