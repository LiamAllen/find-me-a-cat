import { useState } from 'react'
import './App.css'
import catImages from './catImages.json' // Import the JSON file containing cat image paths
import defaultCatImage from './Cat-Images-Dataset/cat images/Image_1.jpg' // Import a default cat image
const dir = '/Cat-Images-Dataset'; // Define the image directory path

function App() {

  const [catImageSrc, setCatImageSrc] = useState(defaultCatImage); // Initialize state with a default cat image

  const findACat = () => {
    // Get a random index from the catImages object
    const randomIndex = Math.floor(Math.random() * Object.keys(catImages).length);
    // Get the corresponding cat image path
    const catImagePath = "." + catImages[randomIndex];

    console.log('Selected Cat Image Path:', catImagePath);

    // Grab the cat image using dynamic import and set it to state
    // This allows for dynamic loading of the image
    // and ensures that the image is available in the build
    // Note: The import path is relative to the public directory
    // Make sure to make the vite interpreter aware of the dynamic import
    //to reduce unwanted error messages.
    import(/* @vite-ignore */`./${dir}/${catImagePath}`)
      .then(module => {
          setCatImageSrc(module.default);
          console.log('Cat image loaded successfully:', module.default);
      }).catch(err => {console.error('Error loading cat image:', err); return null;});
    
    console.log('catImageSrc:', catImageSrc);
  }

  return (
    <>
      <div id="main-container">
        <button onClick={findACat} className="button"> 
          <h1 id="button-text">Find Me A Cat!</h1>
        </button>
        <br/>
        <img id="cat-image" width="500px" height="500px" src={catImageSrc} alt="A random cat" style={{ display: 'block' }} />
      </div>    
    </>
  )
}

export default App