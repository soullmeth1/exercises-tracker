import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const initInput = {
  username: "",
  description: "",
  duration: 0,
  date: new Date(),
};

function EditExercise({ match }) {
  const [data, setData] = useState(initInput);
  const id = match.params.id;

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + id)
      .then((res) => {
        // console.log(res.data);
        const { _id, username, description, duration, date } = res.data;
        setData((prev) => {
          return {
            ...prev,
            _id,
            username,
            description,
            duration,
            date: Date.parse(date),
          };
        });
      })
      .catch((err) => console.log("kaga mendapat data", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    axios
      .put(`http://localhost:5000/exercises/${id}`, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username : </Form.Label>
          <Form.Control as="select">
            <option>{data.username}</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            required
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Duration (in minutes) :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Duration"
            required
            value={data.duration}
            onChange={(e) =>
              setData({ ...data, duration: Number(e.target.value) })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="d-block">Date : </Form.Label>
          <DatePicker
            className="form-control"
            selected={data.date}
            onChange={(e) => setData({ ...data, date: e })}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit">
            Edit Exercise Log
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditExercise;
