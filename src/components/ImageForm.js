// add or update images in the database.It should have a form heading
//an input field for the image title and image URL, and a clear submit button 
//Add it at the top of the ImageList component.

import React, { useState } from 'react';
import {db} from "../firebaseInit";
import { addDoc, collection } from 'firebase/firestore';

function ImageForm(props,{onAddImg}) { 
  const [title,setTitle] = useState("");
  const [url,setUrl] = useState("");
  const {albumName} = props;
  
  async function handleAdd(){
    if (title.trim()!==""){
      const imgRef = await addImgTodb(albumName,title,url);
      const newImg = {id:imgRef.id,albumName,title,url};
      onAddImg(newImg);
    }
  }
  async function addImgTodb(albumName,title,url){
    const imgRef = await addDoc(collection(db,"image"),{
      albumName: albumName,
      title : title,
      url : url
    });
    return imgRef;
  }

  function handleClear(){
    setTitle('');
    setUrl('');
  }
  console.log("image",props);
  return (
    <div className='form'>
        <form>
            <h1>Add image to </h1>
            <input className="round" placeholder="Title" value={title} onChange={((e)=>setTitle(e.target.value))} /><br /><br/>
            <input className="round" placeholder="Image URL" value={url} onChange={((e)=>setUrl(e.target.value))}/><br /><br/>
            <button className='red' onClick={handleClear}>Clear</button> &nbsp;
            <button className='blue' onClick={handleAdd}>Add</button>
        </form>
    </div>
  )
}

export default ImageForm