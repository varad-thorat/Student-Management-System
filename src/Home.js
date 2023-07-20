import { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Home({ handleLogout }) {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    let urladd = "http://localhost:9999/read";
    axios.get(urladd)
      .then(res => {
        setInfo(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const deleteStudent = (rno) => {
    let urladd = "http://localhost:9999/remove";
    axios.delete(urladd, { data: { rno } })
      .then(res => {
        alert("record deleted");
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign out successful
        // handleLogout(); 
        navigate('/'); // Redirect to login page after sign out
      })
      .catch((error) => {
        console.log('Error signing out:', error);
      });
  };

  const handleUpdate = (rno) => {
    navigate(`/update/${rno}`); // Redirect to update page with rno as a parameter
  };

  return (
    <>
      <center>
        <h1>Home Page</h1>
        <table border="4" style={{ "width": "70%" }}>
          <tr>
            <th>Rno</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Update</th> {/* Add a new column for the Update button */}
            <th>Delete</th>
          </tr>
          {info.map((e) => (
            <tr style={{ "textAlign": "center" }} key={e._id}>
              <td>{e._id}</td>
              <td>{e.name}</td>
              <td>{e.marks}</td>
              <td>
                <button onClick={() => handleUpdate(e._id)}>Update</button>
              </td>
              <td>
                <button onClick={() => { if (window.confirm('Are you sure?')) deleteStudent(e._id) }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        <button type='button' onClick={handleSignOut}>
          Sign out
        </button>
      </center>
    </>
  );
}
