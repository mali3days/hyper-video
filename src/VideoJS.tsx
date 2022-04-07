import * as React from 'react';
import videojs from 'video.js';

// Styles
import 'video.js/dist/video-js.css';

interface VideoPlayerPropsInferface {
  videoJsOptions: videojs.PlayerOptions;
}

export default class VideoPlayer extends React.Component {
  private player?: videojs.Player;
  private videoNode?: HTMLVideoElement;

  constructor(props: VideoPlayerPropsInferface) {
    super(props);
    this.player = undefined;
    this.videoNode = undefined;
  }

  componentDidMount() {
    // instantiate video.js
    this.player = videojs(
      this.videoNode as Element,
      this.props as unknown as any
    ).ready(function () {
      // console.log('onPlayerReady', this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div className="c-player">
        <div className="c-player__screen" data-vjs-player="true">
          <video
            id="my-video"
            className="video-js vjs-default-skin"
            width="600"
            height="300"
            ref={(node: HTMLVideoElement) => (this.videoNode = node)}
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
  }
}
