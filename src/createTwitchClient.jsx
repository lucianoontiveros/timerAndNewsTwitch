import tmi from 'tmi.js';

const createTwitchClient = () => {
  const client = new tmi.Client({
    options: { debug: false },
    connection: {
      secure: true,
      reconnect: true,
    },
    identity: {
      username: import.meta.env.VITE_APP_USERNAME,
      password: import.meta.env.VITE_APP_PASSWORD,
    },
    channels: [import.meta.env.VITE_APP_CHANNELS],
  });

  client.connect();

  return client;
};

export default createTwitchClient;