import { useState } from "react";

import { audios } from "./assets/audioData";
import Player from "./components/Player/";

function App() {
  return (
    <div className="App">
      <div className="ColA">
        <Player audios={audios} model={"Vertical"} />
      </div>
      <div className="ColB">
        <div className="RowA">
          <Player audios={audios} model={"Horizontal"} />
        </div>
        <div className="RowB">
          <Player audios={audios} model={"Horizontal"} />
        </div>
      </div>
    </div>
  );
}

export default App;
