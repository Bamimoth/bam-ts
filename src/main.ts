import { App } from "./app";

async function main() {
	  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    
	  const app = new App(canvas);
    app.start();

    // expose to window for debugging
    
    //@ts-ignore
    window.app = app;    
    //@ts-ignore
    window.window = window;

    function loop() {
      app.update();
      app.draw();
      requestAnimationFrame(loop)
    }

    loop()
}

window.addEventListener("load", main, false);
