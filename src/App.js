import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const { password } = person.login;
    const {
      name: { first, last },
    } = person;
    const { age } = person.dob;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };
  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      console.log(newValue);
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="block bcg-black">
        <div className="block"></div>
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="Random USer"
            className="user-img"
          />
          <p className="user-title"> My {title} is </p>
          <p className="user-value"> {value} </p>

          <div className="values-list">
            <button className="icon" data-label="name" onClick={handleValue}>
              {" "}
              <FaUser className="single-icon" />
            </button>
            <button className="icon" data-label="email" onClick={handleValue}>
              {" "}
              <FaEnvelopeOpen className="single-icon" />
            </button>
            <button className="icon" data-label="age" onClick={handleValue}>
              {" "}
              <FaCalendarTimes className="single-icon" />
            </button>
            <button className="icon" data-label="street" onClick={handleValue}>
              {" "}
              <FaMap className="single-icon" />
            </button>
            <button className="icon" data-label="phone" onClick={handleValue}>
              {" "}
              <FaPhone className="single-icon" />
            </button>

            <button
              className="icon"
              data-label="password"
              onClick={handleValue}
            >
              {" "}
              <FaLock />
            </button>
          </div>
          <button type="button" className="btn" onClick={getPerson}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
