import { useEffect, useState } from "react";
import { database } from "./config";
import {
  doc,
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { data } from "react-router-dom";

const App = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setId] = useState("");

  const [show, setShow] = useState(false);

  const [val, setVal] = useState([]);

  // 'value' below contains the details of database
  const value = collection(database, "FirebaseFirestoreReact"); //Provide name of database

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      // console.log(dbVal);

      setVal(
        dbVal.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getData();
  });

  const handleCreate = async () => {
    //Adding data to Firebase
    await addDoc(value, { fname: fname, lname: lname });
  };

  const handleDelete = async (id) => {
    const deleteVal = doc(database, "FirebaseFirestoreReact", id);
    await deleteDoc(deleteVal);
  };

  const handleEdit = async (id, fname, lname) => {
    setFname(fname);
    setLname(lname);
    setId(id);
    setShow(true);
  };

  const handleUpdate = async () => {
    const updateData = doc(database, "FirebaseFirestoreReact", id);
    await updateDoc(updateData, {
      fname: fname,
      lname: lname,
    })
    setShow(false)
    setFname("")
    setLname("")
  };

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
      {!show ? (
        <button onClick={handleCreate}>Create</button>
      ) : (
        <button onClick={handleUpdate}>Update</button>
      )}

      {val.map((values) => (
        <div>
          <h1>{values.fname}</h1>
          <h1>{values.lname}</h1>
          <button onClick={() => handleDelete(values.id)}>Delele</button>
          <button
            onClick={() => handleEdit(values.id, values.fname, values.lname)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};
export default App;
