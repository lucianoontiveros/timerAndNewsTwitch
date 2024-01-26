import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import createTwitchClient from './createTwitchClient';
import Notificaciones from './Notificaciones';
import Estados from './Components/Estados';
const App = () => {
  const [twitchClient, setTwitchClient] = useState(null);

  useEffect(() => {
    const client = createTwitchClient();
    setTwitchClient(client);
  }, []);

  return(
    <div >
      <Timer twitchClient={twitchClient} />
      <Notificaciones twitchClient={twitchClient} />
      <Estados twitchClient={twitchClient} />
    </div>
  ); 
};

export default App;