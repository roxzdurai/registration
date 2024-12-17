import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./AddEmployeeForm.css";


const AddEmployeeForm = () => {
    const [formData, setFormData] = useState({
        employee_id: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        date_of_joining: "",
        role: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://registration-form-kappa-one.vercel.app/", formData);
            toast.success(res.data, { position: "top-center" }); // Display success notification
            setFormData({
                employee_id: "",
                name: "",
                email: "",
                phone: "",
                department: "",
                date_of_joining: "",
                role: "",
            });
        } catch (err) {
            const errorMessage = err.response?.data || "An error occurred.";
            toast.error(errorMessage, { position: "top-center" }); // Display error notification
        }
    };

    return (
        <div>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="\d{10}"
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="HR">HR</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
                <div>
                    <label>Date of Joining:</label>
                    <input
                        type="date"
                        name="date_of_joining"
                        value={formData.date_of_joining}
                        onChange={handleChange}
                        max={new Date().toISOString().split("T")[0]}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <button type="reset" onClick={() => setFormData({
                    employee_id: "",
                    name: "",
                    email: "",
                    phone: "",
                    department: "",
                    date_of_joining: "",
                    role: "",
                })}>
                    Reset
                </button>
            </form>
            {/* Toast Container to display notifications */}
            <ToastContainer />
        </div>
    );
};

export default AddEmployeeForm;
