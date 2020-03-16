// ==UserScript==
// @name         youtube播放视频倍速自定义，可记忆
// @namespace    EsfB3XVPmbThEv39bdxQR2hzid30iMF9
// @version      0.5
// @description  youtube播放视频倍速自定义，刷新浏览器也不会丢失之前设置的速度
// @author       tomoya
// @include      http*://*youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let videoSpeedElement;

  setInterval(function () {
    if (document.querySelector("#count") && document.getElementById("video_speed_div") === null) {
      addSpeedBtn();
    }
  }, 100);

  function addSpeedBtn() {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "#video_speed_div button { outline: 0; padding: 5px 7px; margin-left: 10px; background-color: #e2e0e0; border: 0; color: #222; cursor: pointer;} .video_speed_div-button-active { border: 0!important; background-color: #ff0000!important; color: #fff!important; }";
    document.getElementsByTagName('head').item(0).appendChild(style);

    videoSpeedElement = document.createElement("span");
    videoSpeedElement.setAttribute("id", "video_speed_div");

    let speedArr = [1, 1.5, 2, 2.5, 3];

    for (let i = 0; i < speedArr.length; i++) {
      let speed = speedArr[i];
      let btn = document.createElement("button");
      btn.innerHTML = "x" + speed;
      btn.style.width = "40px";
      btn.setAttribute("id", "third_video_plugin_btn_" + speed);
      btn.addEventListener("click", changeVideoSpeed);
      videoSpeedElement.appendChild(btn);
    }

    videoSpeedElement.style.width = "300%";
    videoSpeedElement.style.height = "30px";

    let targetElement = document.querySelectorAll("[id='count']");
    for (var i = 0; i < targetElement.length; i++) {
      if (targetElement[i].className.indexOf("ytd-video-primary-info-renderer") > -1) {
        targetElement[i].appendChild(videoSpeedElement);
      }
    }

    // 加载之间已经设置的速度
    let third_video_plugin_speed = localStorage.getItem("third_video_plugin_speed");
    if (!third_video_plugin_speed) third_video_plugin_speed = '1';

    for (let i = 0; i < videoSpeedElement.childNodes.length; i++) {
      let btn = videoSpeedElement.childNodes[i];
      if (btn.getAttribute("id") === "third_video_plugin_btn_" + third_video_plugin_speed) {
        btn.click();
      }
    }
    document.getElementById("third_video_plugin_btn_" + third_video_plugin_speed).click();
  }

  function changeVideoSpeed(e) {
    let speed = parseFloat(e.target.innerHTML.replace("x", ""));
    localStorage.setItem("third_video_plugin_speed", speed);
    document.querySelector(".html5-main-video").playbackRate = speed;
    for (let i = 0; i < videoSpeedElement.childNodes.length; i++) {
      let btn = videoSpeedElement.childNodes[i];
      btn.setAttribute("class", "");
    }
    e.target.setAttribute("class", "video_speed_div-button-active");
  }

})();
