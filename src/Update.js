import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdatePage() {
  const navigate = useNavigate();
  const { rno } = useParams();
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/read/${rno}`);
        const { name, marks } = response.data;
        setName(name);
        setMarks(marks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [rno]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:9999/update`, {
        rno,
        name,
        marks,
      });
      console.log(response.data);
      alert("Record updated successfully");
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <>
      <h1>Update Page</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Marks:</label>
          <input
            type="text"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
