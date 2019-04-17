// // 此处代码是用于 图标自适应
// var docEl = document.documentElement;
// var fontEl = document.createElement('style');
// var win = window;
// var dpr = win.devicePixelRatio || 1;

// // 类似小米2 webView webkit版本是534及以下，避免闪屏
// var matches = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/?(\d{3})/i);
// if (matches && matches[1] <= 534) {
//     dpr = 1;
// }

// win.dpr = dpr;
// docEl.setAttribute('data-dpr', dpr);
// docEl.firstElementChild.appendChild(fontEl);

// var setRem = function setRem() {
//     var docWidth = docEl.clientWidth;
//     win.rem = docWidth / 10;

//     // ZTE 中兴 ZTE U930_TD/1.0 Linux/2.6.39/Android/4.0Release/3.5.2012 Browser/AppleWebkit534.30
//     // 老机器bug rem计算不是标准=html fontsize
//     if (/ZTE U930_TD/.test(navigator.userAgent)) {
//         win.rem = win.rem * 1.13;
//     }

//     fontEl.innerHTML = 'html{font-size:' + win.rem + 'px!important}';
// };

// win.addEventListener('resize', function () {
//     // resize时立刻change,pad上刷屏明显
//     setRem();
// }, false);
// win.addEventListener('pageshow', function (e) {
//     if (e.persisted) {
//         setRem();
//     }
// }, false);

// setRem();
document.addEventListener("resize",setRem);
document.addEventListener("orientationchange",setRem);//横竖屏切换
setRem();
function setRem(){
	var oHtml = document.querySelector("html");
	var oWidth = oHtml.getBoundingClientRect().width;
	oHtml.style.fontSize = oWidth/16+"px"
}
