# rtsp-to-HLS

Nodejs에서 ffmpeg를 이용하여 rtsp 프로토콜의 영상을 HLS로 변환하는 서버
<br><br>

## 📎 목차
  - [프로젝트 개요](#-프로젝트-개요)
  - [프로세스](#-프로세스)
  - [사용 기술](#-사용-기술)
  - [개발환경](#-개발환경)
  - [설치 및 실행 가이드 문서](#️-설치-및-실행-가이드-문서)
<br><br>

## 📜 프로젝트 개요
- html5 표준을 따르고 있는 브라우저에서는 rtsp프로토콜으로 구성되어있는 실시간 스트리밍 영상을 재생할 수 없어 개발하였다.<br><br>
- 이에 rtsp프로토콜의 스트리밍 영상을 외부 라이브러리를 이용해 브라우저에서 볼 수 있는 형태(HSL)로 변환하고, 브라우저에서 스트리밍이 가능한 서버를 nodejs로 구성하였다.
<br><br>

## 🔃 프로세스
- nodejs 서버가 기동될 때 소스코드 내에 설정한 rtsp 프로토콜의 영상(배열)을 순회하며 ffmpeg 프로그램에 hls로 변환을 요청한다.
- 변환된 영상은 *.m3u8 확장자로 디스크에 물리적으로 저장된다.
- ffmpeg에서 주기적으로 갱신하며 *.ts 확장자의 영상 세그먼트를 생성한다.
- 변환된 영상은 html페이지에서 video.js 라이브러리로 재생한다.
- html 페이지에서는 영상 별로 url을 구분하여 한번에 하나만의 영상을 볼 수 있다.
<br><br>


## 🛠 사용 기술
- nodejs 14.14
- ffmpeg 5.1.2
- axios 1.4.0
- express 4.18.2
- fluent-ffmpeg 2.1.2
- fs-extra 11.1.1
- node-windows 1.0.0-beta.8
- video.js 7.11.4
<br><br>

## 💻 개발환경
- CPU : i7-11700
- RAM : 64GB
- OS : Windows 10 Pro
- GPU : Intel(R) UHD Graphics 750(인텔 내장 GPU)
<br><br>

## 📝 설치 및 실행 가이드 문서
- [20230809_RTSP to HLS 서버 설치 가이드문서.pdf](https://github.com/kimbongjune/rtsp-to-HLS/files/12327313/20230809_RTSP.to.HLS.pdf)

