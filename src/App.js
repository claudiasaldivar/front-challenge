import {useState } from "react";
import Component from "./components/Component";
import {fetchPhotos} from './services/getPhotos'
import './styles/global.css';

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState([]);
  const [previousURL, setPreviousURL] = useState(null);
  const [contador, setContador] = useState(-1)

  const getPhotos = async () => {
    try {
      const data = await fetchPhotos();
      const result = Math.floor(Math.random() * data.length);
      const newURL = data[result].url;
      if (newURL !== previousURL) {
        setPreviousURL(newURL);
        setImage(prev => [
          ...prev,
          newURL
        ]);
        setContador(prevContador => prevContador + 1)
      } else {
        // Generar una nueva URL hasta que sea diferente a la anterior
        getPhotos();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addMoveable = async () => {
    // Crear un nuevo componente Moveable y añadirlo al array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];
    await getPhotos()
    if (image) {
      setMoveableComponents(prevComponents => [
        ...prevComponents,
        {
          id: Math.floor(Math.random() * Date.now()),
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          updateEnd: true,
          image: image
        },
      ]);
    }
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };

  const handleDeleteComponent = (id) => {
    const updatedComponents = moveableComponents.filter((item) => item.id !== id);
    setMoveableComponents(updatedComponents);
  };

  return (
    <main>
      <button onClick={addMoveable}>Add Moveable1</button>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
          overflow: "hidden",
        }}
      >
        {moveableComponents.map((item, index) => (
          <Component
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
            onDelete={handleDeleteComponent}
            image={image}
            contador={contador}
          />
        ))}
      </div>
    </main>
  );
};



export default App;
