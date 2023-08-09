var Service = require('node-windows').Service;

// 서비스의 이름과 설명, 그리고 스크립트의 경로를 지정합니다.
var svc = new Service({
  name: 'video_transcode',
  description: 'rtsp to HLS video transcoding Module stop service',
  script: 'D:\\vsCodeFile\\rtsp_test\\index.js',
});

// 서비스가 해제될 때의 이벤트를 핸들링합니다.
svc.on('uninstall', function() {
  console.log('Uninstall complete.');
  console.log('The service exists:', svc.exists);
  process.exit();
});

// 서비스를 해제합니다.
svc.uninstall();
