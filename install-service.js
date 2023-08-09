var Service = require('node-windows').Service;

// 서비스 설정
var svc = new Service({
  name: 'video_transcode',
  description: 'rtsp to HLS video transcoding Module Strat service',
  script: 'D:\\vsCodeFile\\rtsp_test\\index.js',
  env: {
    name: "NODE_ENV",
    value: "production"
  }
});

// 서비스를 시작할 때 발생하는 이벤트
svc.on('install', function() {
  svc.start();
});

svc.install();