import { useState } from 'react'
import {database} from './config'
import { addDoc, collection } from 'firebase/firestore'

const App = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const value = collection(database, 'FirebaseFirestoreReact')  //Provide name of database

  const handleCreate = async()=>{
    //Adding data to Firebase
    await addDoc(value, {fname: fname, lname: lname})
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
    </div>
  );
}
export default App