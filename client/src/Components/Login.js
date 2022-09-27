import { Container, Grid, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import { padding } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { color } from "@mui/system";
import { useNavigate } from "react-router-dom";
const properties = {
    firstName: "",
    secondName: "",
    countryName: "",
    phoneNumber: "",
    email: "",
    password: "",
    conpassword: "",
}

const Login = () => {
    const [data, setData] = useState(properties)
    const [success, setSuccess] = useState("")

    const navigate = useNavigate()

    function ValidateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    function ValidatephoneNumber(phoneno) {
        if ((/([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/g).test(phoneno)) {
            return true;
        } else {
            alert("Enter Valid Phone Number");
            return false;
        }
    }

    const checkStates = () => {
        if (data.firstName !== "" && data.secondName !== "" && data.countryName !== "" && data.phoneNumber !== "" && data.email !== "" && data.password !== "" && data.conpassword !== "") {
            ValidatephoneNumber(data.phoneNumber)
            ValidateEmail(data.email)
            checkPass()
            registerUser()
            navigate("/")
            setData({
                firstName: "",
                secondName: "",
                countryName: "",
                phoneNumber: "",
                email: "",
                password: "",
                conpassword: ""
            })
        } else {
            alert("Field Is Missing")
        }

    }

    const checkPass = () => {
        if (data.password === data.conpassword) {
            return;
        }
        else {
            alert("Your Password Doesn't Match")
        }
    }


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const registerUser = async () => {
        try {
            const response = await axios.post("http://localhost:5000/registerUser", {
                firstName: data.firstName,
                secondName: data.secondName,
                countryName: data.countryName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password,
                conPassword: data.conpassword
            })
            if (response.status === 200) {
                setSuccess("User has been registered successfully!")


            }

        } catch (error) {
            console.error(error);
        }

    }

    const allUsers = async () => {
        const { data } = await axios.get("http://localhost:5000/getUsers")


    }



    useEffect(() => {
        allUsers()
    }, [])
    return (
        <div style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80")`
            , backgroundPosition: "center",
            backgroundRepeat: "no repeat",
            objectFit: "cover",
            backgroundSize: "cover"
        }}>
            <Container maxWidth="sm"  >
                <Grid container spacing={5} direction='column' justifyContent='center'
                    style={{ minHeight: "100vh" }}   >
                    <h1 style={{ justifyContent: 'center', color: 'white' }}>Registration from</h1>
                    <Paper elelvation={2} sx={{ padding: 5 }} >
                        <Grid container direction="column" spacing={2}>

                            <Grid item>
                                <TextField type="text" fullWidth label="Enter your First-Name" placeholder="First Name" name="firstName" variant="outlined" value={data.firstName} onChange={handleChange}></TextField>
                            </Grid>
                            <Grid item>
                                <TextField type="text" fullWidth label="Enter your Last-name" placeholder="Last Name" variant="outlined" name="secondName" value={data.secondName} onChange={handleChange}></TextField>
                            </Grid>

                            <Grid item>
                                <TextField type="text" fullWidth label="Enter your Country-Name" placeholder="Country" variant="outlined" name="countryName" value={data.countryName} onChange={handleChange}></TextField>
                            </Grid>

                            <Grid item>
                                <TextField type="tel" fullWidth label="Enter your Phone-Number" placeholder="Phone Number" variant="outlined" name="phoneNumber" value={data.phoneNumber} onChange={handleChange}  ></TextField>
                            </Grid>
                            <Grid item>
                                <TextField type="email" fullWidth label="E-mail" placeholder="E-mail Address" variant="outlined" name="email" value={data.email} onChange={handleChange}  ></TextField>
                            </Grid>

                            <Grid item>
                                <TextField type="Password" fullWidth label="Password" placeholder="Enter Password" variant="outlined" name="password"
                                    value={data.password} onChange={handleChange} ></TextField>
                            </Grid>
                            <Grid item>
                                <TextField type="password" fullWidth label="Confirm password" placeholder="Confirm Password" variant="outlined" name="conpassword" value={data.conpassword} onChange={handleChange}></TextField>
                            </Grid>

                            <Grid item>
                                <button variant="contained" onClick={checkStates} style={{ backgroundColor: "black", color: "white", padding: '1rem 2rem', width: '100 %', borderRadius: '20px' }}>Register</button>
                            </Grid>

                            {success ? success : ""}

                        </Grid>
                    </Paper>
                </Grid>
            </Container >
        </div >

    );
};
export default Login;
