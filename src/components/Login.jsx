import React, { useEffect } from "react";
import { useState } from "react";
import Sidebarbtn from "./Sidebarbtn";
import { data, useNavigate } from "react-router-dom";
import { EvCharger, VenetianMask } from "lucide-react";
import Prefrences from "./Prefrences";
export default function Login() {
    const [login_message, setLoginmessage] = useState("")
    const [fielderr, setFielderr] = useState({
        nameFeild: "",
        passwordField: "",
        usernameField: "",
        studentIdFeild: ""
    })
    const navigate = useNavigate()
    const [renderpref, setRenderpref] = useState(false)
    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        studentid: ""
    })
    const [showsidebar, setShowsidebar] = useState(false)   // toggles the side bar

    const Handlechange = (event) => {   // updates the state on change
        const key_name = event.target.name
        const value = event.target.value
        setForm((prevData) => (
            { ...prevData, [key_name]: value }
        ))
    }

    const Handlesubmit = (event) => {   // logs submitted values
        event.preventDefault()
        if (form.name === "") {
            setFielderr({
                'usernameField': "name can not be empty!",
            })
        }
        if (form.username === "") {
            setFielderr({
                'usernameField': "username can not be empty!",
            })
        }

        if (form.password === "") {
            setFielderr({
                'passwordField': 'instagram password recquired for login'
            })
        }

        if (form.studentid === "") {
            setFielderr({
                'studentIdFeild': "student id must required for login",
            })
        }

        if (form.password !== "" && form.studentid !== "" && form.username !== "" && form.name) {
            const user_credentials = form
            console.log("user_credentials:-", user_credentials)
            const URL_ENDPOINT = `http://127.0.0.1:7000/user_auth/credentials/`
            console.log(URL_ENDPOINT)
            fetch(URL_ENDPOINT, {
                method: "POST",
                body: JSON.stringify(user_credentials),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then((data) => data.json())
                .then((res) => {
                    console.log(res)
                    if (res.status_code === 200) {
                        console.log("working")
                        const student_id = res.student_data[0]['student_ID']
                        localStorage.setItem("student_id", student_id)
                    }
                })
            setLoginmessage("Logged in !")
            setTimeout(() => {
                navigate('/prefrences')
            }, 1000);
        }




    }

    return (
        <div className="bg-gray-900 h-screen flex" >
            <div>
                <Sidebarbtn isShowbaractivate={showsidebar} />
            </div>

            <div className="p-2 justify-center flex flex-col w-full items-center" >
                <h1 className="text-green-500 p-5 text-2xl" >{login_message}</h1>
                <form onSubmit={Handlesubmit} className="space-y-2 p-2 sm:p-5 sm:w-1/2 lg:w-1/3 border border-gray-600 rounded-2xl flex flex-col gap-2 items-center w-full" action="">
                    <h1 className="text-white text-center text-2xl " >Log in with instagram</h1>

                    <h1 className="text-red-500 text-[18px]" >
                        {fielderr.nameFeild ? fielderr.nameFeild : ""}
                    </h1>
                    <input type="text" name="name" onChange={Handlechange} value={form.name} className="bg-gray-700 rounded-2xl outline-none w-full p-5 text-white" placeholder="Enter name" />

                    <h1 className="text-red-500 text-[18px]" >
                        {fielderr.usernameField ? fielderr.usernameField : ""}
                    </h1>
                    <input type="text" name="username" onChange={Handlechange} value={form.username} className="bg-gray-700 rounded-2xl outline-none w-full p-5 text-white" placeholder="Enter instagram username" />

                    <h1 className="text-red-500 text-[18px]" >
                        {fielderr.passwordField ? fielderr.passwordField : ""}
                    </h1>
                    <input type="password" name="password" onChange={Handlechange} value={form.password} className="bg-gray-700 rounded-2xl outline-none w-full p-5 text-white" placeholder="Enter instagram password" />

                    <h1 className="text-red-500 text-[18px]" >
                        {fielderr.studentIdFeild ? fielderr.studentIdFeild : ""}
                    </h1>
                    <input type="number" name="studentid" onChange={Handlechange} value={form.studentid} className="bg-gray-700 rounded-2xl outline-none w-full p-5 text-white" placeholder="Enter student id" />


                    <button name="btn" onClick={Handlesubmit} className="bg-linear-to-r from bg-blue-700 via-blue-800 to-blue-950 font-semibold w-full rounded-2xl text-white p-4 " >Log in</button>

                </form>
            </div>
        </div>
    )
}