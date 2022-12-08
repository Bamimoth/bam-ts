import { Util } from "./engine/util/util";

export class App {


  constructor(private canvas: HTMLCanvasElement) {

  }

  async start() {
    
    // simulate loading behaviour
    await Util.sleep(1000);
    const loadingScreen = document.getElementById("loading-screen") as HTMLDivElement;
    loadingScreen.classList.add("hidden");
  }

  update() {

  }

  draw() {
    
  }
}