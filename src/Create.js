import {useState, useRef} from "react";
import axios from "axios";
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Create(){
    const rName = useRef();
    const[rno,setRno] = useState("");
    const[name,setName] = useState("");
    const[marks, setMarks] = useState("");
    const navigate = useNavigate();

    const hRno = (event) => {setRno(event.target.value);}
    const hName = (event) => {setName(event.target.value);}
    const hMarks = (event) => {setMarks(event.target.value);}

    const save = (event) => {
        event.preventDefault();
        let urladd = "http://localhost:9999/create";
        let data = {rno,name,marks};
        axios.post(urladd,data)
        .then(res=>{
            if(res.data.insertedId){
                alert("record created");
                setRno("");
                setName("");
                setMarks("");
                rName.current.focus();
            }
            else{
                alert("record already exists");
                setRno("");
                setName("");
                setMarks("");
                rName.current.focus();
            }
        })
        .catch(err=>{
            if(err.code=="ERR_NETWORK"){
                alert("pls try after sometime");
                setRno("");
                setName("");
                setMarks("");
                rName.current.focus();
            }
        })
    }
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            // Sign out successful
            navigate('/'); // Redirect to login page after sign out
          })
          .catch((error) => {
            console.log('Error signing out:', error);
          });
    };
    return(
        <>
        <center>
            <h1>Create Page</h1>
            <form onSubmit={save}>
                <input type= "number" placeholder="enter rno" onChange={hRno} value={rno} ref={rName}/>
                <br></br>
                
                <input type= "text" placeholder="enter name" onChange={hName} value={name}/>
                <br></br>

                <input type= "number" placeholder="enter marks" onChange={hMarks} value={marks}/>
                <br></br>
                <input type="submit"/>
                <button type='button' onClick={handleSignOut}>
                    Sign out
                </button>
            </form>
        </center>
        </>
    );
    
}