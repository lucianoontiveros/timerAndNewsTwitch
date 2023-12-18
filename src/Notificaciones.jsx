import { useEffect, useState } from 'react'
import Code from './Components/Code.jsx';
import Banner from './Components/Banner.jsx';
import { configDotenv } from 'dotenv';


const Notificaciones = ({ twitchClient }) => {
    const [codigoSala, setCodigoSala] = useState('');
    const [showCode, setShowCode] = useState(false);
    const [aviso, setAviso] = useState("Un canal de estudio y trabajo  #tercermundista");
  
    useEffect(() => {
      if (twitchClient) {
        var timerId;
        var codigoActual = '';
  
        twitchClient.on("message", (channel, userstate, message, self) => {
          if (self) return;
          const username = userstate.username;
          const isMod = userstate.badges?.moderator;
          const mod = userstate?.mod;
          if (self || !message.startsWith('!')) return;
  
          var args = message.slice(1).split(' ');
          const command = args.shift().toLowerCase();
  
          if (command === "codigo") {
            if (username === 'cuartodechenz' || mod) {
              console.log(args);
              setCodigoSala(args);
              codigoActual = args;
              setShowCode(true);
              clearTimeout(timerId);
              timerId = setTimeout(() => {
                setShowCode(false);
                timerId = null;
              }, 480000);
            }
          }
  
          switch (command) {
            case 'aviso':
              if (username === 'cuartodechenz' || mod) {
                setAviso(message.replace('!aviso ', ''));
              }
              break;
            case 'code':
                args = '';
                const code = `Este es el codigo de la salita https://www.forestapp.cc/join-room?token=${codigoActual}`;
                twitchClient.say('cuartodechenz', code);
                // Aquí debes enviar una respuesta al chat de Twitch con el código.
                // Por ejemplo: twitchClient.say(channel, `Este es el código de la sala: ${code}`);
              break;
            default:
              console.log('La petición no puede realizarse');
          }
        });
      }
  
      return () => {
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    }, [twitchClient]);

  return (
    <div>
      {showCode ? <Code codigoSala={codigoSala} /> : <Banner aviso={aviso} />}
    </div>
  );
}

export default Notificaciones;
