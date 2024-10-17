import { CheckBox } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// The form data array
const UserForm = [
  {
    title: "User Name",
    name: "name",
    dataType: "text",
    value: {},
  },
  {
    title: "User Email",
    name: "email",
    dataType: "email",
  },
  {
    title: "User Password",
    name: "password",
    dataType: "password",
  },
  {
    title: "Confirm Password",
    name: "confirmPassword",
    dataType: "password",
  },
  {
    title: "Assign Role",
    name: "role",
    dataType: "select",
    options: ["User", "Admin", "Editor", "Viewer", "Moderator"], // You can add the options here for the dropdown
  },
];

const DynamicForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User", // Default role
  };
  // State to store form input values
  const [formData, setFormData] = useState(initState);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, Checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? Checked : value,
    });
  };
  console.log(formData);
  useEffect(() => {
    if (id) {
      const UserDataApi = async () => {
        try {
          await axios.get(`http://localhost:4000/users/${id}`).then((res) => {
            const UserData = res.data.data;
            // console.log(UserData);

            setFormData({
              name: UserData.name || "",
              email: UserData.email || "",
              password: UserData.password || "",
              confirmPassword: UserData.password || "",
              role: UserData.role || "User",
            });
          });
        } catch (error) {
          console.log(error);
        }
      };
      UserDataApi();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add custom validation (e.g., password matching)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (id) {
      axios
        .put(`http://localhost:4000/users/${id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            setFormData(initState);
            console.log(res.data.message);
          }
        })

        .catch((err) => {
          console.log(err);
        });
      navigate("/AllUsers");
      console.log("submit=>", formData); // Output the form data for now
    } else {
      axios
        .post("http://localhost:4000/users", formData)
        .then((res) => {
          if (res.status === 200) {
            setFormData(initState);
            console.log(res.data.message);
          }
        })

        .catch((err) => {
          console.log(err);
        });

      console.log("submit=>", formData); // Output the form data for now
    }

    // You can send the form data to a server or API here
  };

  return (
    <div style={styles.container}>
      <h1>{id ? "Edit User" : "Create Users"}</h1>
      <h2>Dynamic Signup Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Loop through UserForm array to generate form fields */}
        {UserForm.map((field, index) => (
          <div key={index} style={styles.formGroup}>
            <label>{field.title}:</label>
            {field.dataType === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                style={styles.input}
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.dataType || "text"} // Default to 'text' if no type is specified
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder={`Enter your ${field.title.toLowerCase()}`}
              />
            )}
          </div>
        ))}
        {/* {console.log(formData[field.name])} */}
        <button type="submit" style={styles.button}>
          {id ? "Update Users" : "Create Users"}
        </button>
      </form>
    </div>
  );
};

// Some basic inline styles for better visuals
const styles = {
  container: {
    width: "350px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DynamicForm;
