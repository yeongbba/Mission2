import Draggable from "./components/Draggable";
import Box from "./components/Box";

const App = () => {
  return (
    <div>
      <Draggable>
        <Box />
      </Draggable>
    </div>
  );
}

export default App;
