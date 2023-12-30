// to add a new album to the database.It should have a form heading,an
//input feild for the album name,and a clear and submit button.
//Add it at the top of the AlbumList component.
import React, { useState } from 'react'
import {db} from "../firebaseInit";
import { addDoc, collection } from 'firebase/firestore';

function AlbumForm({onAddAlbum}) {
  const [albumName,setAlbumName]=useState("");
  //const [album,setAlbum] = useState([]);

  async function handleCreate() {
    if (albumName.trim() !== '') {
      const docRef = await addAlbumToDatabase(albumName);
      const newAlbum = { id: docRef.id, albumName }; // Creating album object with ID
      setAlbumName(''); // Clear input field after adding the album
      onAddAlbum(newAlbum); // Notify parent component about the new album
    }
  }
  async function addAlbumToDatabase(albumName){
    const docRef = await addDoc(collection(db,"album"),{
      albumName: albumName
    });
    return docRef;
  }
  function handleClear(){
    setAlbumName("");
  }

  return (
    <div className="form">
      <form>
        <h2>Create an album</h2>
        <input className="round" placeholder="Album Name" value={albumName} onChange={((e)=>setAlbumName(e.target.value))}></input>&nbsp;<br/><br/>
        <button className='red' onClick={handleClear}>Clear</button>&nbsp;
        <button className='blue' onClick={handleCreate}>Create</button>
      </form>
    </div>
  )
}

export default AlbumForm;