import React, { useState } from "react";
import { Container, Grid, Paper, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { fontWeight } from "@mui/system";
const loginData = {
    email: "",
    password: "",
}

const Loginform = () => {
    const [data, setData] = useState(loginData)
    const [success, setSuccess] = useState("")

    const navigate = useNavigate()

    const { email, password } = data

    const checkStates = async () => {
        if (data.email !== "" && data.password !== "") {
            const response = await axios.post("http://localhost:5000/loginUserData", {
                email, password
            })
            console.log(response);
            userchecking(response);
        }
        else {
            alert("Field Is Missing")
        }

    }

    const userchecking = (response) => {
        if (response.data === "User not Found") {
            alert("User not found");
        } else if (response.data === "User password Incorrect") {
            alert("Incorret User Name or Password")
        } else {
            navigate("/dashboard")
        }
    }




    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function InvalidEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true);
        }
        alert("You have entered an invalid email address!")
        return (false)
    }


    return (
        <div
            style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80")`
                , backgroundPosition: "center",
                backgroundRepeat: "no repeat",
                objectFit: "cover",
                backgroundSize: "cover"
            }}>
            <Container maxWidth="sm">
                <Grid container spacing={5} direction='column' justifyContent='center'
                    style={{ minHeight: "100vh" }}>
                    <h1 style={{ justifyContent: 'center', color: 'white' }}>Login Form</h1>
                    <Paper elelvation={2} sx={{ padding: 5 }}>
                        <Grid container direction="column" spacing={2}>

                            <Grid item>
                                <TextField type="email" fullWidth label="E-mail" placeholder="E-mail Address" variant="outlined" name="email" value={data.email} onChange={handleChange}  ></TextField>
                            </Grid>
                            <Grid item>
                                <TextField type="Password" fullWidth label="Password" placeholder="Enter Password" variant="outlined" name="password"
                                    value={data.password} onChange={handleChange} ></TextField>
                            </Grid>
                            <Grid item>
                                <button variant="contained" onClick={checkStates} style={{ backgroundColor: "black", color: "white", padding: '1rem 2rem', width: '100 %', borderRadius: '20px', }
                                }>Submit</button>
                            </Grid>
                            <div >
                                <p>
                                    <a style={{ color: "blue", fontsize: "30px", fontWeight: "400", paddingLeft: "20px" }} href='' > Forgot Password</a> Or <Link to="/signUp"><p style={{ color: "blue", display: "inline" }} > Sign Up</p></Link>
                                </p>
                            </div>
                            {success ? success : ""}
                        </Grid>
                    </Paper>
                </Grid>
            </Container >
        </div>
    )
}
export default Loginform;