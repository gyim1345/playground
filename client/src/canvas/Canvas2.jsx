import React from 'react'

import useCanvas from './useCanvas';

const Canvas2 = () => {

  const width = 480;
  const height = 320;
  function initialize() {
    let ballRadius = 10;
    let x = width / 2;
    let y = height - 30;
    let dx = 2;
    let dy = -2;
    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let brickRowCount = 5;
    let brickColumnCount = 3;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let score = 0;
    let lives = 3;

    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function removeHandler() {
      document.removeEventListener("keydown", keyDownHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
      document.removeEventListener("mousemove", mouseMoveHandler, false);
    }
    return { ballRadius, x, y, dx, dy, paddleHeight, paddleWidth, paddleX, rightPressed, leftPressed, brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft, score, lives, bricks, removeHandler };
  }

  function addEvents(state, canvas) {
    document.addEventListener("keydown", (e) => keyDownHandler(e, state), false);
    document.addEventListener("keyup", (e) => keyUpHandler(e, state), false);
    document.addEventListener("mousemove", (e) => mouseMoveHandler(e, state, canvas), false);
  }

  function removeEvents() {
    document.removeEventListener("keydown", keyDownHandler, false);
    document.removeEventListener("keyup", keyUpHandler, false);
    document.removeEventListener("mousemove", mouseMoveHandler, false);
  }

  function keyDownHandler(e, state) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      state.rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      state.leftPressed = true;
    }
  }

  function keyUpHandler(e, state) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      state.rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      state.leftPressed = false;
    }
  }

  function mouseMoveHandler(e, state, canvas) {
    let relativeX = e.clientX - canvas?.offsetLeft;
    if (relativeX > 0 && relativeX < width) {
      state.paddleX = relativeX - state.paddleWidth / 2;
    }
  }

  function collisionDetection(state) {
    for (let c = 0; c < state.brickColumnCount; c++) {
      for (let r = 0; r < state.brickRowCount; r++) {
        let b = state.bricks[c][r];
        if (b.status == 1) {
          if (state.x > b.x && state.x < b.x + state.brickWidth && state.y > b.y && state.y < b.y + state.brickHeight) {
            state.dy = -state.dy;
            b.status = 0;
            state.score++;
            if (state.score == state.brickRowCount * state.brickColumnCount) {
              alert("YOU WIN, CONGRATS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function drawBall(ctx, x, y, ballRadius) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle(ctx, paddleX, height, paddleHeight, paddleWidth) {
    ctx.beginPath();
    ctx.rect(paddleX, height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks(ctx, brickColumnCount, brickRowCount, bricks, brickWidth, brickPadding, brickHeight, brickOffsetLeft, brickOffsetTop) {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
          let brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function drawScore(ctx, score) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
  }

  function drawLives(ctx, lives, width) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, width - 65, 20);
  }

  function draw(ctx, frameCount, state) {
    ctx.clearRect(0, 0, width, height);

    let { ballRadius, x, y, dx, dy, paddleHeight, paddleWidth, paddleX, rightPressed, leftPressed, brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft, score, lives, bricks } = state;

    drawBricks(ctx, brickColumnCount, brickRowCount, bricks, brickWidth, brickPadding, brickHeight, brickOffsetLeft, brickOffsetTop);

    drawBall(ctx, x, y, ballRadius, frameCount);

    drawPaddle(ctx, paddleX, height, paddleHeight, paddleWidth);
    drawScore(ctx, score);
    drawLives(ctx, lives, width);
    collisionDetection(state);

    if (x + dx > width - ballRadius || x + dx < ballRadius) {
      state.dx = -dx;
    }
    if (y + dy < ballRadius) {
      state.dy = -dy;
    } else if (y + dy > height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        state.dy = -dy;
        const diff = Math.abs((paddleX + paddleWidth / 2) - x) / (paddleWidth / 2);
        state.dx = Math.sign(dx) * 2 * (1 + diff)
      } else {
        state.lives--;
        if (!state.lives) {
          alert("GAME OVER");
          document.location.reload();
        } else {
          state.x = width / 2;
          state.y = height - 30;
          state.dx = 3;
          state.dy = -3;
          state.paddleX = (width - paddleWidth) / 2;
        }
      }
    }

    if (rightPressed && paddleX < width - paddleWidth) {

      state.paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      state.paddleX -= 7;
    }

    state.x += dx;
    state.y += dy;
    // requestAnimationFrame(draw);
  }

  const canvasRef = useCanvas(draw, initialize, addEvents, removeEvents)
  return <canvas ref={canvasRef} width="480" height="320"/>
}

export default Canvas2;