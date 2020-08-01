import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { konteks } from "../Context";

const inputType = {
  username: "",
  description: "",
  duration: 0,
  date: new Date(),
};

function CreateExercise() {
  const [input, setInput] = useState(inputType);
  const { data, handleSubmit } = useContext(konteks);
  const { users, loading } = data;

  useEffect(() => {
    if (users.length) {
      setInput((prev) => {
        return { ...prev, username: users[0].username };
      });
    }
  }, [users]);

  const onsubmit = (e) => {
    e.preventDefault();
    handleSubmit(input, "exercises");

    setInput({
      ...inputType,
      username: users[0].username,
    });
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <Form onSubmit={onsubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username : </Form.Label>
          <Form.Control
            as="select"
            value={input.username}
            onChange={(object) =>
              setInput({ ...input, username: object.target.value })
            }
          >
            {users.map((data) => (
              <option key={data.id}>{data.username}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            required
            value={input.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Duration (in minutes) :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Duration"
            required
            value={input.duration}
            onChange={(e) => setInput({ ...input, duration: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="d-block">Date : </Form.Label>
          <DatePicker
            className="form-control"
            selected={input.date}
            onChange={(e) => setInput({ ...input, date: e })}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit">
            Create Exercise Log
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateExercise;
