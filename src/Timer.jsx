import { useEffect, useState } from 'react'
import React from 'react'
import totoro from './img/productivo.png'


const Timer = ({ twitchClient }) => {
  var [timer, setTimer] = useState(1 * 60);
  var [pomodoroTotal, setPomodoroTotal] = useState(3);
  const [pomoCount, setPomoCount] = useState(0);
  const [etiquetas, setEtiquetas] = useState("💻Estamos por iniciar🍵");
  const [autoTimer, setAutoTimer] = useState(true);
  var [iniciado, setIniciado] = useState(false);

  
  useEffect(() => {
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
          let audio = new Audio('campana.mp3');
          if (vueltas % 2 == 0) {
            timer = 3 * 60; // Pomodoro de 10 minuto de descanso, ajustar según lo que crean necesario.
            twitchClient.say('brunispet', '!silencio Estamos en este momento estudiando / trabajando, puedes ocultar el chat para no distraerte. Si no sabes cómo se hace, avísanos y te explicamos.');
            setEtiquetas('PRODUCTIVO 📚📖')
            audio.play()
            vueltas++
            pomo++
          } else {
            vueltas++
            timer = 3 * 60; // Pomodoro de 10 minuto de descanso, ajustar según lo que crean necesario.
            twitchClient.say('brunispet', '!atr Estamos en break, a estirar, a reponer y jugar. Que sea un buen descanso. ¿Cómo estuvo el pomo?');
            setEtiquetas('DESCANSO 🍙🥤')
            audio.play()
          }
          if (pomo === pomodoroTotal + 1) {
            clearInterval(interval);
            console.log(`Se completaron ${pomodoroTotal} pomodoros`);
            twitchClient.say('brunispet', '!atr Es el final del break, a estirar, a reponer y jugar. Espero que fuera una buena jornada para ti');
            setEtiquetas('FINAL DE STREAM');
            twitchClient.say('brunispet', 'Llegamos al final del stream');
            iniciado = false;
            audio.play()
            return
          }
          setPomoCount(pomo)
        }
      }, 100);
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
      setIniciado(false);
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
        if (username === 'brunispet' || mod) {
          switch (command) {
            case "start": 
              if (!iniciado) {
                setIniciado(true);
                startTimer();
              } else {
                console.log('Ya hay un timer activo');
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
    <div className="cardImg my-2 flex flex-col w-full items-center  d-flex justify-content-center bg-black rounded-lg shadow md:flex-row" >
        <img className="carimgH object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={totoro} alt="" width="40px" height="40" />
        <div className="self-center w-full justify-content-center" >
          <div id="timer" className="cardImg my-0 items-center text-blue-400  bg-black rounded-lg shadow md:flex-row hover:bg-green-500 dark:border-green-700 dark:bg-green-800 dark:hover:bg-green-700">{timer}</div>
          <div id="timerNote" className="badge none m-0 bg-blue-900 text-blue-300">{etiquetas}</div>
        </div>
      <div>
        <div className="self-center mx-4 componentesTimer">
          <div className="badge w-full notas rounded-pill bg-indigo-200 text-gray-900">Pomo Actual {pomoCount}</div>
          <div className="badge w-full notas rounded-pill bg-indigo-900 mt-1">Pomo Totales {pomodoroTotal}</div>
        </div>
      </div>
    </div>
  )
}

export default Timer

/* 
<div className="btn btn-primary position-relative">
      <div>{timer}</div>
      <div>{etiquetas}</div>
      <div>Pomo Actual {pomoCount}</div>
      <div>Pomo Totales {pomodoroTotal}</div>
    </div>
*/