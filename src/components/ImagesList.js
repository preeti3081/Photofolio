// to display all the images inside of an album.It should
//retrieve all the images in the selected album from the database and save
//them inside of the state.Conditionally render it inside 
//of the AlbumList component if an album is selected.
import React from 'react'
import ImageForm from './ImageForm';
import { useState,useEffect } from "react";
import {db} from "../firebaseInit";
import { getDocs,collection,deleteDoc,doc } from 'firebase/firestore';

function ImagesList(props) {
  const [showForm,setShowForm] = useState(false);
  const [images,setImages] = useState([]);
  const {albumName,setPage} = props;

  function toggleImgForm(){
    setShowForm(!showForm);
  }
  console.log(props);
  
  
  //fetch img data
  useEffect(()=>{
    async function fetchData(){
      const snapShot = await getDocs(collection(db,"image"))
      const fetchImg = snapShot.docs.map((doc)=>{
        return{
          id:doc.id,
          ...doc.data()
        }
      })
      //setImages(fetchImg);
      // Filter images based on the albumName
      const filteredImages = fetchImg.filter((image) => image.albumName === albumName);
      setImages(filteredImages);
    }
    fetchData();
  },[albumName]);
  
  async function deleteImg(id){
    const docRef = doc(db,"image",id);
    await deleteDoc(docRef);
    setImages(images.filter((image) => image.id !== id));
  }
  return (
    <div>
        {showForm && (<ImageForm albumName={albumName} onCancel={toggleImgForm} />)}
        <img src="https://cdn-icons-png.flaticon.com/128/54/54476.png" height="40px" width="40px" alt="back" 
        onClick={()=>setPage("album")}/>
        <h1 className='heading'>Images from {props.albumName}</h1>
        <button className='add' onClick={toggleImgForm}>
          {showForm ? "Cancel":"Add Image"}
        </button><br /><br/>
        <div className="imglist">
          {images.map((image)=>(
            <div className="imgdiv">
              <img src={image.url} alt="images" height="80px" width="80px" />
              <span className= "delete" onClick={() => deleteImg(image.id)}>
            <img src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png" height="20px" width="20px" alt="Delete" />
            </span>
              <p>{image.title}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ImagesList;