// to display a list of albums.It should retrieve all the
//albums from the database on the mount and save them inside of the state
import React, { useEffect,useState } from 'react';
import {db} from "../firebaseInit";
import AlbumForm from "./AlbumForm";
import { getDocs,collection } from 'firebase/firestore';
import ImagesList from './ImagesList';

function Albumlist({setPage,albumName,setAlbumName}) {
  const [albums, setAlbums] = useState([]);
  const [showImagesList, setShowImagesList] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  

  function toggleAlbumForm() {
    setShowAlbumForm(!showAlbumForm); // Toggle the showAlbumForm state
  }

  // fetch album from firebase
  useEffect(()=>{
    async function fetchData(){
      const snapShot = await getDocs(collection(db,"album"))
      const fetchAlbums = snapShot.docs.map((doc)=>{
        return{
          id:doc.id,
          ...doc.data()
        }
      })
      setAlbums(fetchAlbums);
    }
    fetchData();
  },[]);
  
  // for opening imageList
  function handleImgClick(albumName) {
    setAlbumName(albumName);
    setShowImagesList(true);
    setSelectedAlbum(albumName);
    setPage("image");
  }

  return (
    <div>
      {/* Render the list of albums */}
      {showAlbumForm && (
        <AlbumForm onCancel={toggleAlbumForm} />
      )}
      
      <h1 className="heading">Your albums</h1>
      <button className="add" onClick={toggleAlbumForm}>
        {showAlbumForm ? "Cancel" : "Add Album"}
      </button><br/><br />
      <div id="albumdiv">
      {albums.map((album) => (
        <button onClick={()=>handleImgClick(album.albumName)} key={album.id}><p>
        <img src="https://cdn-icons-png.flaticon.com/128/10293/10293886.png" height="60px" alt="album icon" /><br/>
        {album.albumName}</p></button>
      ))}
      </div> 
      {/* Conditional rendering of ImagesList */}
      {showImagesList && <ImagesList albumName={selectedAlbum} />}
    </div>
  )
}

export default Albumlist;