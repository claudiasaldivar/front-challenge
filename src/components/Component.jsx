import React, { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";

const Component = ({
    updateMoveable,
    top,
    left,
    width,
    height,
    color,
    id,
    setSelected,
    isSelected = false,
    onDelete,
    image
  }) => {
    const [contador, setContador] = useState(0)
    const ref = useRef();
  
    const handleDelete = () => {
      onDelete(id);
    };
  
    const onDrag = (e) => {
      const parent = document.getElementById("parent");
      const parentBounds = parent.getBoundingClientRect();
  
      const newTop = Math.max(0, Math.min(e.top, parentBounds.height - height));
      const newLeft = Math.max(0, Math.min(e.left, parentBounds.width - width));
  
      updateMoveable(id, {
        top: newTop,
        left: newLeft,
        width,
        height,
        color,
      });
    };
  
    const onResize = (e) => {
      const parent = document.getElementById("parent");
      const parentBounds = parent.getBoundingClientRect();
  
      const newWidth = Math.min(e.width, parentBounds.width - left);
      const newHeight = Math.min(e.height, parentBounds.height - top);
  
      updateMoveable(id, {
        top,
        left,
        width: newWidth,
        height: newHeight,
        color,
      });
    };
  
    const onResizeEnd = (e) => {
      const parent = document.getElementById("parent");
      const parentBounds = parent.getBoundingClientRect();
  
      if (e && e.lastEvent) {
        const newWidth = Math.min(e.lastEvent.width, parentBounds.width - left);
       const newHeight = Math.min(e.lastEvent.height, parentBounds.height - top);
  
      updateMoveable(id, {
        top,
        left,
        width: newWidth,
        height: newHeight,
        color,
      }, true);
      }
      
    };

    useEffect(() => {
        setContador(contador+1)
    }, [image])
  console.log(image, 'llll')
    return (
      <div
        ref={ref}
        className="draggable"
        style={{
          position: "absolute",
          top,
          left,
          width,
          height,
          background: color,
          overflow: "hidden" // Limita el contenido dentro del div
        }}
        onClick={() => setSelected(id)}
      >
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            style={{
              backgroundColor: color,
              color: "white",
              border: "none",
            }}
            onClick={handleDelete}
          >
            x
          </button>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {image[contador] && (
            <img src={image[contador]} alt="Descripción de la imagen"  style={{
              maxWidth: "80%",
              maxHeight: "80%",
            }}/>
        )}

        </div>
        <Moveable
          target={isSelected ? ref.current : null}
          resizable
          draggable
          onDrag={onDrag}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
          keepRatio={false}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          edge={false}
          zoom={1}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        />
      </div>
    );
  };

  export default Component