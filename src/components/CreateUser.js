import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { konteks } from "../Context";

function CreateUser() {
  const [username, setUsername] = useState("");
  const { handleSubmit } = useContext(konteks);

  const onsubmit = (e) => {
    e.preventDefault();

    handleSubmit({ username }, "users");

    setUsername("");
  };
  return (
    <div>
      <h3>Create New User</h3>
      <Form onSubmit={onsubmit}>
        <Form.Group>
          <Form.Label>Username : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit">
            Create User
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateUser;
