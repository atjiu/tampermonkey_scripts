// ==UserScript==
// @name         bilibili超链接不新开标签页直接在当前页面打开
// @namespace    EtfB2XVPmbThEv39bdxQR2hzid30iMF9
// @version      0.3
// @description  bilibili超链接不新开标签页直接在当前页面打开，外加移除下载app的广告条
// @author       tomoya
// @include      https://*.bilibili.com*
// @exclude     https://t.bilibili.com*
// @exclude     https://message.bilibili.com*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

    setInterval(function() {
        let aEles = document.getElementsByTagName("a");
        removeTarget(aEles);

        let appDownloadDiv = document.getElementById("fixed_app_download");
        if (appDownloadDiv) {
            appDownloadDiv.parentNode.removeChild(appDownloadDiv);
        }

    }, 200);

    function removeTarget(aEles) {
        for(let i = 0; i < aEles.length; i++) {
             aEles[i].removeAttribute("target");
        }
    }
})();
