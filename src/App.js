import Albumlist from "./components/Albumlist";
import Navbar from "./components/Navbar";
import ImageList from "./components/ImagesList";
import "./App.css";
import { useState } from "react";

function App() {
  const [page,setPage] = useState("album");
  const [albumName, setAlbumName] = useState(null);

  return (
    <div className="App">
      <Navbar /> 
      {page==="album" && <Albumlist setPage={setPage} setAlbumName={setAlbumName} albumName={albumName}/> }
      {page==="image" && <ImageList setPage={setPage} albumName={albumName} /> }
      
    </div>
  );
  
}

export default App;
