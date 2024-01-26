import React from 'react'

export const usuariosActividades = []

class Actividad {
    constructor(username, estado) {
        this.username = username;
        this.estado = estado;
    }
}
const Estados = ({ twitchClient }) => {

    if (twitchClient) {
        twitchClient.on("message", (channel, userstate, message, self) => {
            if (self) return;
            const args = message.slice(1).split(' ');
            const command = args.shift().toLowerCase();
            const username = userstate.username;
            const isSub = userstate.badges?.subscriber
            const isPrime = userstate.badges?.premium
            const isVip = userstate.badges?.vip
            const isMod = userstate.badges?.moderator
          
            const mensajeGeneral = `Que gusto verte por aquí ${username}. `
            const mensajeSubs = isSub ? ` 👑 Muchas gracias por apoyar este canal. Ya tenemos croquetas aseguradas para mi y los michis` : 'Espero que tengas una buena jornada de estudio'
            const mensajeMod = isMod ? 'La comunidad está encantada por darle una mano a Chenz ⚔️ en tu rol de mod' : '.'
            const mensajeVid = isVip ? ' Nos hace feliz contar con tu participación en estos dias 💎.' : ''; 
        
            const buscandoActividad = () => usuariosActividades.find((items) => items.username === username)
            if (!buscandoActividad()) {
                let estado = 'Acaba de ingresar al chat 📱';
                let actividad = new Actividad(username, estado)
                usuariosActividades.push(actividad)
                
                if (username != 'streamlabs' && username != 'botomizador' && username != 'streamelements' && username != 'nightbot' && username != 'mohcitrus') {
                    twitchClient.say(channel, mensajeGeneral + mensajeSubs + mensajeMod + mensajeVid)
                }
            } 

            if (!message.startsWith('!')) return;
        })
    }

}

export default Estados