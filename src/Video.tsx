import VideoPlayer from './VideoJS'; // point to where the functional component is stored

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: 'demo/demo.m3u8',
      type: 'application/x-mpegURL',
    },
  ],
};

export const Video = () => {
  return (
    <VideoPlayer {...videoJsOptions} />
    // <VideoPlayer
    //   id="vid1"
    //   width="600"
    //   height="300"   
    //   class="vjs-default-skin"
    //   controls
    // />
  );
};

//  <source
//         id="my-video"
//         className="video-js"

//         preload="auto"
//         width="640"
//         height="264"
//         poster="MY_VIDEO_POSTER.jpg"
//         data-setup="{}"
//         src="demo/demo.m3u8"
//         type="application/x-mpegURL"
//       />
//       <track
//         id="trackk"
//         kind="captions"
//         src="The Lord of the Rings - The Fellowship of the Ring - Extended.vtt"
//         srcLang="en"
//         label="English"
//         default
//       />
//     </VideoJS>
