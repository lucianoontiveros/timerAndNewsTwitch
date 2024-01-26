import { useEffect, useState } from 'react'
import React from 'react'
import totoro from './img/productivo.png'
import campana from './campana.mp3'

const Timer = ({ twitchClient }) => {
  var [timer, setTimer] = useState(10 * 60);
  var [pomodoroTotal, setPomodoroTotal] = useState(3);
  const [pomoCount, setPomoCount] = useState(0);
  const [etiquetas, setEtiquetas] = useState("💻Estamos por iniciar🍵");
  const [autoTimer, setAutoTimer] = useState(true);
 

  
  useEffect(() => {
    var iniciado = false
    let interval;
    let minutos;
    let segundos;
    var pomo = 0;
    var vueltas = 2
    function startTimer() {
      interval = setInterval(() => {
        minutos = parseInt(timer / 60, 10);
        segundos = parseInt(timer % 60, 10);
        const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
        const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;
        setTimer(`${minutosFormateados}:${segundosFormateados}`);

        if (--timer < 0) {
          let audio = new Audio(campana);
          if (vueltas % 2 == 0) {
            timer = 60 * 60; // Pomodoro de 10 minuto de descanso, ajustar según lo que crean necesario.
            twitchClient.say('cuartodechenz', 'Estamos en este momento estudiando / trabajando, puedes ocultar el chat para no distraerte. Si no sabes cómo se hace, avísanos y te explicamos.');
            setEtiquetas('PRODUCTIVO 📚📖')
            audio.play()
            vueltas++
            pomo++
          } else {
            vueltas++
            timer = 10 * 60; // Pomodoro de 10 minuto de descanso, ajustar según lo que crean necesario.
            twitchClient.say('cuartodechenz', 'Estamos en break, a estirar, a reponer y jugar. Que sea un buen descanso. ¿Cómo estuvo el pomo?. Si el streamer no se dio cuenta podes cambiar este mensaje por !lachancla');
            setEtiquetas('DESCANSO 🍙🥤')
            audio.play()
          }
          if (pomo === pomodoroTotal + 1) {
            clearInterval(interval);
            console.log(`Se completaron ${pomodoroTotal} pomodoros`);
            twitchClient.say('cuartodechenz', 'Es el final del break, a estirar, a reponer y jugar. Espero que fuera una buena jornada para ti');
            setEtiquetas('FINAL DE STREAM');
            twitchClient.say('cuartodechenz', 'Llegamos al final del stream');
            iniciado = false;
            audio.play()
            return
          }
          setPomoCount(pomo)
        }
      }, 1000);
    }

    /* Funciones */

    function minutosOn(num) {
        const newTimer = parseInt(num) * 60;
        const newMinutes = Math.floor(newTimer / 60);
        const newSeconds = newTimer % 60;
        timer = newTimer
      setTimer(
        `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`
      );
    }

    function stopTimer() {
      clearInterval(interval);
      iniciado = false;
    }

    function timerAuto() {
      setAutoTimer(!autoTimer);
    }

    function pomot(num) {
      pomodoroTotal = parseInt(num)
      setPomodoroTotal(num);
    }
  

    /* Handler de Twitch */
    if (twitchClient) {
      twitchClient.on("message", (channel, userstate, message, self) => {
        if (self) return;
        if (!message.startsWith('!')) return;
        const args = message.slice(1).split(' ');
        const command = args.shift().toLowerCase();
        const username = userstate.username;
        const mod = userstate?.mod;
        const num = parseInt(args);
        if (username === 'cuartodechenz' || mod) {
          switch (command) {
            case "start": 
              if (!iniciado) {
                iniciado = true
                startTimer()
              } else {
                return console.log('Ya hay un timer activo');
              }
              break;
            case "pause":
              stopTimer();
              break;
            case "auto":
              timerAuto();
              break;
            case "min":
              if (!isNaN(num)) {
                minutosOn(num);
              } else {
                console.log('El argumento no es un número válido');
              }
              break;
            case "pomot":
              if (!isNaN(num)) {
                pomot(num);
              } else {
                console.log('El argumento no es un número válido');
              }
              break;
            default:
              console.log('No es un comando válido');
          }
        }
      });
    }
  }, [twitchClient ]);

  return (
    <div className="contenedor  rounded-pill  flex flex-col w-full items-center  d-flex justify-content-center ext-gray-900 md:flex-row text-white bg-[#050708]" >
      <div className="contenedorTimer overflow-hidden self-center w-full" >
        <div id="timer" className="cardImg my-0 items-center text-purple-100 shadow md:flex-row">{timer}</div>
        <div id="timerNote" className="badge rounded-pill none m-0 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 mt-1 text-white">{etiquetas}</div>
      </div>
      <div>
        <div className="self-center mx-4 componentesTimer">
          <div className="badge w-full notas rounded-pill bg-gradient-to-br from-purple-600 to-blue-500 text-white">Pomo Actual {pomoCount}</div>
          <div className="badge w-full notas rounded-pill bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 mt-1">Pomo Totales {pomodoroTotal}</div>
        </div>
      </div>
      <div className='mr-6'>
        <img className="carimgH object-cover w-full  rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={totoro} alt="" width="40px" height="40" />
      </div>
    </div>
  )
}

export default Timer

