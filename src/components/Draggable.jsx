import { useRef, useState } from "react";
import styles from "./Draggable.module.css";

const Draggable = ({ children }) => {
  const dragBox = useRef(null);

  const [Click, setClick] = useState(false);
  const [OffSet, setOffSet] = useState({ x: 0, y: 0 });
  const [Create, SetCreate] = useState(false);

  const createHandler = () => {
    Create ? SetCreate(false) : SetCreate(true);
  };

  const clickHandler = (event) => {
    if (event.target.innerText === "box") {
      setClick(true);
    }
  };

  const unClickHandler = () => {
    setClick(false);
  };

  function moveHandler(event) {
    if (!Click) return;

    if (dragBox.current.offsetLeft < 0) {
      setClick(false);
      dragBox.current.style.left = "0px";
      return;
    } else if (
      dragBox.current.offsetLeft + dragBox.current.offsetWidth >
      event.view.innerWidth
    ) {
      setClick(false);
      dragBox.current.style.left = `${
        event.view.innerWidth - dragBox.current.offsetWidth
      }px`;
      return;
    }

    if (dragBox.current.offsetTop < 0) {
      setClick(false);
      dragBox.current.style.top = "0px";
      return;
    } else if (
      dragBox.current.offsetTop + dragBox.current.offsetHeight >
      event.view.innerHeight
    ) {
      setClick(false);
      dragBox.current.style.top = `${
        event.view.innerHeight - dragBox.current.offsetHeight
      }px`;
      return;
    }

    if (Click) {
      dragBox.current.style.top = `${event.nativeEvent.pageY - OffSet.y}px`;
      dragBox.current.style.left = `${event.nativeEvent.pageX - OffSet.x}px`;
    }
    event.preventDefault();
  }

  const clickBoxHandler = (event) => {
    setOffSet({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
  };

  return (
    <div
      className={styles.container}
      onMouseMove={moveHandler}
      onMouseUp={unClickHandler}
      onMouseDown={clickHandler}
    >
      <button className={styles.button} onClick={createHandler}>
        {Create ? "delete box" : "create box"}
      </button>

      {Create && (
        <div
          ref={dragBox}
          className={styles.dragBox}
          onMouseDown={clickBoxHandler}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Draggable;
