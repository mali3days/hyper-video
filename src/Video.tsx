import VideoPlayer from './VideoJS'; // point to where the functional component is stored

const videoJsOptions = {
  autoplay: false,
  controls: true,
  sources: [
    {
      src: 'http://192.168.0.104:5000/demo.m3u8',
      type: 'application/x-mpegURL',
    },
    // {
    //   src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
    //   type: 'video/mp4'
    // }
  ],
};

export const Video = () => {
  return (
    <VideoPlayer {...videoJsOptions} />
  );
};