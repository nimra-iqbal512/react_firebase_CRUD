import { useEffect, useState } from 'react'
import {database} from './config'
import { doc, addDoc, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { data } from 'react-router-dom'

const App = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')

  const [val, setVal] = useState([])

  // 'value' below contains the details of database
  const value = collection(database, 'FirebaseFirestoreReact')  //Provide name of database

  useEffect( ()=>{
    const getData = async()=>{
      const dbVal = await getDocs(value)
      // console.log(dbVal);
      
      setVal(dbVal.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }) ))
    }
    getData()
  })

  const handleCreate = async()=>{
    //Adding data to Firebase
    await addDoc(value, {fname: fname, lname: lname})
  }

  const handleDelete = async(id)=>{
    const deleteVal = doc(database, "FirebaseFirestoreReact", id);
    await deleteDoc(deleteVal)
  }
  
  return (
    <div className="container">
      <input
        type="text"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
      />
      <input
        type="text"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>

      {val.map((values) => (
        <div>
          <h1>{values.fname}</h1>
          <h1>{values.lname}</h1>
          <button onClick={()=>handleDelete(values.id)}>Delele</button>
        </div>
      ))}
    </div>
  );
}
export default App