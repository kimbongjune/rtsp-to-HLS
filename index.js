const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const { Worker } = require('worker_threads');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');

// ffmpeg.setFfmpegPath('D:\\devtools\\ffmpeg\\ffmpeg-2023-07-16-git-c541ecf0dc-full_build\\bin\\ffmpeg.exe');

// const getStreamUrl = (id) => `rtsp://210.99.70.120:1935/live/${id}.stream`;

let activeFfmpegCommands = {};

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:path', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'video.html'));
});

// const videoUrls = [
//   {
//     streamName: "cctv001", 
//     streamUrl: "rtsp://210.99.70.120:1935/live/cctv001.stream"
//   },
//   {
//     streamName: "cctv002",
//     streamUrl: "rtsp://210.99.70.120:1935/live/cctv002.stream"
//   },
// ];

const videoUrls = []
for (let i = 1; i <= 10; i++) {
  const streamName = `cctv${String(i).padStart(3, '0')}`; // '001', '002', ..., '050'
  const streamUrl = `rtsp://210.99.70.120:1935/live/${streamName}.stream`;
  console.log(streamUrl)
  videoUrls.push({
    streamName: streamName,
    streamUrl: streamUrl
  });
}

// function startStreamConversion(path, url) {
//   fs.ensureDirSync(`public/${path}`);

//   activeFfmpegCommands[path] = ffmpeg(url)
//     .inputOptions([
//       '-rtsp_transport tcp'
//     ])
//     .outputOptions([
//       '-c:v libx264',
//       '-f hls',
//       '-crf 23',
//       '-r 15',
//       '-preset ultrafast',
//       '-hls_time 2',
//       '-hls_list_size 6',
//       '-hls_flags delete_segments',
//       '-start_number 1'
//     ])
//     // .outputOptions([
//     //   '-c:v libx265',
//     //   '-f hls',
//     //   '-crf 30',  // 더 높은 crf 값으로 설정
//     //   '-r 10',  // 더 낮은 프레임레이트로 설정
//     //   '-preset ultrafast',
//     //   '-hls_time 2',
//     //   '-hls_list_size 6',
//     //   '-hls_flags delete_segments',
//     //   '-start_number 1'
//     // ])
//     .output(`public/${path}/stream.m3u8`)
//     .on('end', () => {
//       console.log(`Stream conversion for ${path} ended.`);
//     })
//     .on('error', (err) => {
//       console.error(`An error occurred: ${err.message}`);
//       fs.removeSync(`public/${path}`);
//     })
//     .run();
// }

// function stopStreamConversion(path) {
//   if (activeFfmpegCommands[path]) {
//     activeFfmpegCommands[path].kill();
//     console.log(`Stream conversion for ${path} stopped.`);
//   } else {
//     console.log(`No active stream conversion found for ${path}`);
//   }
// }

app.get('/stream/:path', (req, res) => {
  const path = req.params.path;
  if (fs.existsSync(`public/${path}/stream.m3u8`)) {
    // 만약 파일이 존재한다면, 클라이언트에 파일의 위치를 전송
    res.json({ status: 'streaming', url: `http://localhost:3000/${path}/stream.m3u8` });
  } else {
    // 파일이 존재하지 않는다면, 클라이언트에 에러 메시지 전송
    //startStreamConversion(path, getStreamUrl(path))
    res.json({ status: 'not_ready', message: 'The stream is not ready yet.' });
  }
});

app.listen(port, () => {
  videoUrls.forEach(video => {
    const worker = new Worker('./worker.js', { workerData: { path: video.streamName, url: video.streamUrl } });
  });
  //videoUrls.forEach(video => startStreamConversion(video.streamName, video.streamUrl));
  console.log(`Server is running at http://localhost:${port}`);
});