import React from 'react'
import code from '../img/forest.gif'

const Code = (props) => {

  return (
    <div href="#" className="cardImg rounded-pill flex flex-col items-center rounded-lg shadow bg-gray-900 md:flex-row border-green-300 border-dotted">
      <img className="carimgH rounded-pill object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={code} alt="" />
      <div id="cuerpoAlerta" className="flex flex-col justify-between p-4 leading-normal">
        <h3 className="mb-2 font-bold text-4xl text-center tracking-tight text-green-400 dark:text-white">🍃CODIGO FOREST 🍃</h3>
        <h4 className="mb-3 text-center text-8xl text-green-200 dark:text-green-400"> {props.codigoSala}</h4 >
      </div >
    </div >
  )
}

export default Code
