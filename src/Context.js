import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const konteks = createContext();

function Context({ children }) {
  const [data, setData] = useState({
    users: [],
    exercises: [],
    loading: false,
  });

  useEffect(() => {
    setData((prev) => {
      return { ...prev, loading: true };
    });

    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        let hsl = res.data.map((data) => {
          return { id: data._id, username: data.username };
        });
        setData((prevData) => {
          return { ...prevData, users: hsl };
        });
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:5000/exercises")
      .then((res) => {
        setData((prevData) => {
          return { ...prevData, exercises: res.data };
        });
      })
      .then(() => {
        setData((prev) => {
          return { ...prev, loading: false };
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setData((prevData) => {
      return {
        ...prevData,
        exercises: [
          ...prevData.exercises.filter((exercise) => exercise._id !== id),
        ],
      };
    });
  };

  const handleSubmit = (value, type) => {
    axios
      .post(`http://localhost:5000/${type}`, value)
      .then((res) => {
        setData((prevData) => {
          return {
            ...prevData,
            [type]: [
              ...prevData[type],
              value.date
                ? { ...value, ["date"]: value.date.toISOString() }
                : value,
            ],
          };
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <konteks.Provider value={{ data, handleDelete, handleSubmit }}>
      {children}
    </konteks.Provider>
  );
}

export default Context;
