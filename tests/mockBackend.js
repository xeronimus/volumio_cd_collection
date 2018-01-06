const http = require('http');
const socket = require('socket.io');
const mockQueue = require('./mockQueue.json');

const RESPONSE_DELAY_MS = 0;

const app = http.createServer((req, res) => {
});

const io = socket(app);
app.listen(9999);


io.on('connection', (socket) => {
  const state = {
    status: 'play',
    title: 'Some Song',
    artist: 'Super Band',
    album: 'Best Album',
    albumart: '/albumart?cacheid=412',
    uri: 'music-library/NAS/Musix@xylo/Pop/Eros Ramazzotti/Ali E Radici/Eros Ramazzotti - Appunti E Note.mp3',
    seek: 4234,
    duration: 219,
    volume: 80,
    mute: false,
    position: 0,
    random: false,
    repeat: false
  };


  console.log('cd_collection UI connected');
  socket.on('disconnect', () => console.log('cd_collection UI disconnected'));

  socket.on('getState', () => pushState());
  socket.on('getQueue', () => doEmit('pushQueue', mockQueue));
  socket.on('volume', (param) => {
    if (param === '+') {
      state.volume = state.volume + 10;
    }
    if (param === '-') {
      state.volume = state.volume - 10;
    }

    if (state.volume < 0) {
      state.volume = 0;
    }

    if (state.volume > 100) {
      state.volume = 100;
    }

    pushState();
  });
  socket.on('setRandom', ({value}) => {
    state.random = value;
    pushState();
  });
  socket.on('setRepeat', ({value}) => {
    state.repeat = value;
    pushState();
  });
  socket.on('pause', () => {
    state.status = 'pause';
    pushState();
  });
  socket.on('play', () => {
    state.status = 'play';
    pushState();
  });

  function pushState() {
    doEmit('pushState', state);
  }

  function doEmit(event, payload) {
    setTimeout(() => socket.emit(event, payload), RESPONSE_DELAY_MS);
  }


});


