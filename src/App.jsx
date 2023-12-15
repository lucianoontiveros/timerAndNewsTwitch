import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import createTwitchClient from './createTwitchClient';
import Notificaciones from './Notificaciones';
const App = () => {
  const [twitchClient, setTwitchClient] = useState(null);

  useEffect(() => {
    const client = createTwitchClient();
    setTwitchClient(client);
  }, []);

  return(
    <div>
      <Notificaciones twitchClient={twitchClient} />
      <Timer twitchClient={twitchClient} />
    </div>
  ); 
};

export default App;