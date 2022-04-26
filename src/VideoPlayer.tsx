import * as React from 'react';
import * as videojs from './VideoLibrary';
import io from 'socket.io-client';
import { createPopper } from '@popperjs/core';


// Styles
import 'video.js/dist/video-js.css';
console.log('videojs: ', videojs);

export const VideoPlayer = (props) => {
  let player: videojs.Player;
  let socket: any;
  const videoNode = React.useRef(undefined);

  function setupSocketConnection() {
    socket = io('http://192.168.0.104:3000');

    socket.on('connect', function () {
      console.log('Connected');
    });
    socket.on('events', function (data) {
      console.log('event', data);
    });
    socket.on('play', (data) => {
      console.log('play: ', data);

      if (data && player) {
        player.play();
      } else if (player) {
        player.pause();
      }
    });
    socket.on('exception', function (data) {
      console.log('event', data);
    });
    socket.on('disconnect', function () {
      console.log('Disconnected');
    });

    socket.on('volumechange', (data) => {
      console.log('socket volumechange', data);
      player.volume(data);
    });

    socket.on('currentTime', (data) => {
      console.log('socket currentTime', data);
      player.currentTime(data);
    });
  }

  function setupTrack() {
    const subss = document.querySelector('.vjs-text-track-display');
    let popoverElement = document.getElementById('popover');

    subss.addEventListener('click', async (e) => {
      const element = e.target as HTMLElement;

      if (element.classList.contains('word')) {
        const id = element.id;

        console.log('word:', element.innerText);

        player.pause();

        const translateApi = `http://192.168.0.132:5000/translate?text=${element.innerText}`;
        const options = {
          method: 'GET',
          // mode: 'cors',
        };

        const response = await fetch(translateApi, options).then((res) =>
          res.json()
        );

        const wordElement = document.getElementById(id);
        const wordElementFontSize = getComputedStyle(wordElement).fontSize;

        popoverElement.style.fontSize = wordElementFontSize;
        popoverElement.innerText = response.translated;

        const popperInstance = createPopper(wordElement, popoverElement, {
          placement: 'top',
        });

        player.el().appendChild(popoverElement);
      }
    });

    setTimeout(() => {
      var tracks = player.textTracks()[0];

      if (tracks) {
        tracks.addEventListener('cuechange', (e) => {
          const playerElement = player.el();

          if (playerElement.contains(popoverElement)) {
            playerElement.removeChild(popoverElement);
          }

          const activeCue = player.textTracks()[0].activeCues[0];

          if (activeCue) {
            socket.emit('activeCue', activeCue.text, (response) =>
              console.log('activeCueWasSend:', response)
            );
          } else {
            console.log('no cue text');
            socket.emit('activeCue', '', (response) =>
              console.log('empty CueWasSend:', response)
            );
          }
        });
      }
    }, 1000);
  }

  React.useEffect(() => {
    videojs(
      videoNode?.current as Element,
      props as unknown as any
    ).ready(function () {
      player = this;
      console.log('onPlayerReady', this);
      this.on('timeupdate', (data) => {
        console.log(data);
  
        const currentTime = this.currentTime();
        const duration = this.duration();
  
        socket.emit('time', { duration, currentTime }, (response) => {
          console.log('time was send:', response);
        });
      });
    });

    setupSocketConnection();
    setupTrack();

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856

  return (
    <div className="c-player">
      <div className="c-player__screen" data-vjs-player="true">
        <video
          id="my-video"
          className="video-js vjs-default-skin"
          width="600"
          height="300"
          ref={videoNode}
        >
          <track
            id="trackk"
            kind="captions"
            src="http://192.168.0.104:5000/The Lord of the Rings - The Fellowship of the Ring - Extended.vtt"
            srcLang="en"
            label="English"
            default
          />
        </video>
      </div>
      <div className="c-player__controls">
        <button>Play</button>
        <button>Pause</button>
      </div>
    </div>
  );
};
