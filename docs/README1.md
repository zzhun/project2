# 渲染帧率 fps

## 什么是帧率

- 帧：指显示器显示的每一张画面

fps 全称为 Frames Per Second，即 每一秒的帧数。我们在显示器上看到的各种各样的动画效果，都是由一帧一帧组成的。可以将 fps 理解为动画播放的速度。fps 越大，动画越流畅。

一般浏览器的 fps 为 60。当然，如果你的显示器的刷新率能够达到 144 hz 的话，浏览器的 fps 可以达到 144 fps

那什么是刷新率呢？屏幕的刷新率 是指 屏幕每秒能够显示图像的次数，单位为 hz（赫兹）。

fps 的值受限于屏幕的刷新率，即 fps 的值小于等于屏幕刷新率的值。

总结：浏览器的 fps 指浏览器每一秒的帧数。fps 越大，每秒的画面就越多，浏览器的显示就越流畅。浏览器的 fps 一般等于屏幕的刷新率，不会超过屏幕的刷新率。

## 怎么计算帧率

要计算帧率之前，首先我们要先了解 window 对象上一个函数：

- requestAnimationFrame

> window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行 当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)。回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配

- 计算方法

  根据浏览器的的渲染频率绘制页面，减少不必要的计算和动画绘制过程，requestAnimationFrame（）方法的调用频率就是我们需要的 fps,
  如果记录固定时间内的帧数，就可以计算出同步率，fps 的计算公式：fps = frameNum / elapsedTime;

```javascript
var frame = 0;
var lastTime = Date.now();

var loop = function () {
  var now = Date.now();
  var fps = 0;

  frame++;

  if (now > 1000 + lastTime) {
    const elapsedTime = now - lastTime;
    var fps = Math.round((frame * 1000) / elapsedTime);
    console.log(`1S内 FPS：${fps};一帧所需要的时间为${elapsedTime}`);
    frame = 0;
    lastTime = now;
  }

  requestAnimationFrame(loop);
};

loop();
```
