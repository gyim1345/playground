# Canvas 
- Cannot read property getContext of null... canvas가 dom에 mount 되기전에 발생되는 에러...
https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258


## requestAnimationFrame()
- The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.

### return value
- A long integer value, the request id, that uniquely identifies the entry in the callback list. This is a non-zero value, but you may not make any other assumptions about its value. You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.

https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

## Window.devicePixelRatio
- The devicePixelRatio of Window interface returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device. This value could also be interpreted as the ratio of pixel sizes: the size of one CSS pixel to the size of one physical pixel. In simpler terms, this tells the browser how many of the screen's actual pixels should be used to draw a single CSS pixel.

- This is useful when dealing with the difference between rendering on a standard display versus a HiDPI or Retina display, which use more screen pixels to draw the same objects, resulting in a sharper image.

- You can use window.matchMedia() to check if the value of devicePixelRatio changes

https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio


## predraw post draw

- In the draw function, there is some procedures that we might want execute for every animation, like clear the canvas or increment the frame counter. We could abstract this procedures to special functions that will be executed before and after the draw: the predraw and postdraw functions. This way we can write less code every time we want to create a different animation. These functions must be called (obviously) inside of the render function, before and after the draw function.


## canvas undefined (eventhandler)
- mouse event에 canvas를 보내줬는데도 canvas가 undefined => defined => undefined 가 뜬다...... 왜 그런지는 모르겠네....
- addevent를 두번 했다. 리팩토링 할때 initialize안에 있던것을 따로 함수로 만들었는데 함수로 만든걸 쓰면서 initialize 안에 있던걸 안지웠엇네...

## Canvas2

https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript



## todo

- 화면 크기에 따라 canvas 크기 변경 및 안에 있는 물건들 변경
- paddle 과 ball 충돌시에 튕기는 위치 및 속도 수정?? 
- 공과 패들 충돌 위치 수정
- 일시정지...
  - 일단 esc 누르면 alert으로 대쳐 ㅋㅋㅋㅋㅋㅋㅋ
- brick 갯수 랜덤화 및 위치 랜덤화 혹은 유저 선택 입력 가능하도록 변경
- 리팩토링
  - 할건 많은데 어디서 부터 손을 대야할지 ㄷㄷ;