const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs-extra');
const { workerData } = require('worker_threads');

ffmpeg.setFfmpegPath('D:\\devtools\\ffmpeg\\ffmpeg-2023-07-16-git-c541ecf0dc-full_build\\bin\\ffmpeg.exe');

fs.ensureDirSync(`public/${workerData.path}`);

ffmpeg(workerData.url)
  .inputOptions(['-rtsp_transport tcp'])
  .outputOptions([
    //'-c:v libx264',       //기본 인코딩 옵션
    //'-c:v h264_nvenc'     //엔비디아 GPU 가속
    '-c:v h264_qsv',        //인텔 GPU 가속
    '-vf scale=640:480',    //해상도 조절
    '-f hls',               //변환 포맷, HLS
    '-crf 23',              //가변 비트레이트 화질 우선 인코딩, 높을수록 손실률이 높으며 변환 속도가 빠름
    //'-crf 27',
    '-r 15',                //프레임 레이트 조절, 낮을수록 프레임이 낮아지며 변환 속도가 빠름
    //'-r 10',
    //'-preset ultrafast',  //기본 프리셋, 뒤의 ultrafast는 하나의 프레임에 사용할 CPU 자원, 느릴수록 더 나은 품질
    //'-preset fast',       //엔비디아 프리셋
    '-preset veryfast',     //인텔 프리셋
    '-hls_time 2',          //세그먼트길이(초)
    '-hls_list_size 6',     //최대 재생목록 항목 수(개)
    '-hls_flags delete_segments', //최대 재생목록 항목 수에 따른 개수만 하드디스크에 유지하고 나머지는 삭제
    '-start_number 1'       //세그먼트의 시작 넘버링
  ])
  .output(`public/${workerData.path}/stream.m3u8`)
  .on('end', () => console.log(`Stream conversion for ${workerData.path} ended.`))
  .on('error', (err) => {
    console.error(`An error occurred: ${err.message}`);
    fs.removeSync(`public/${workerData.path}`);
  })
  .on('stderr', function(stderrLine) {
    //console.log('Stderr output: ' + stderrLine);
  })
  .run();