import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { konteks } from "../Context";

function ExercisesList() {
  const { data, handleDelete } = useContext(konteks);
  const { exercises, loading } = data;
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Time</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((data, i) => {
            return (
              <tr key={data._id}>
                <td>{i + 1}</td>
                <td>{data.username}</td>
                <td>{data.description}</td>
                <td>{data.duration}</td>
                <td>{data.date.substring(0, 10)}</td>
                <td>
                  <Link to={`/edit/${data._id}`}>Edit</Link> |{" "}
                  <Link to="" onClick={() => handleDelete(data._id)}>
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ExercisesList;
