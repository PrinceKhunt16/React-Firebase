import { ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../config/firebase';

const Storage = () => {
    const [fileUpload, setFileUpload] = useState(null);

    const uploadFile = async () => {
        if(!fileUpload){
            return
        }

        const fileFolderRef = ref(storage, `ProjectFiles/${`${fileUpload.name}-${Date.now()}-${Math.round(Math.random() * 1e9)}`}`)

        try {
            uploadBytes(fileFolderRef, fileUpload)
            setFileUpload(null)
        } catch (err) {
            console.log(err)  
        }
    }

    return (
        <div>
            <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
            <button onClick={uploadFile}> Upload File </button>
        </div>
    )
}

export default Storage