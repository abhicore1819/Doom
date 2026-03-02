import React, { useId } from "react";
import { useState } from "react";
import Sidebarbtn from "./Sidebarbtn";
import { useNavigate } from "react-router-dom";
export default function Prefrences() {
    const redirect = useNavigate()  // navigates 
    const [submission_message, set_Message] = useState("")
    const [prefr_form, setPrefr_form] = useState({  // handles the input values
        pref_category: "",
        pref_genre: "",
        from_usercoming: "",
        user_id: ""
    })

    // ----- states -----
    const [fielderr, setFielderr] = useState({  //----- handles the submission err
        category_err: "",
        genre_err: "",
        usercoming_err: "",
    })

    const [showsidebar, setShowsidebar] = useState(false)   // toggles the side bar
    // ----- states -----

    // updates the input values
    const Handlechange = (e) => {
        const name = e.target.name  // gets the filed name
        const value = e.target.value     // gets the filed value
        setPrefr_form((prevData) => (   // sets the input value
            { ...prevData, [name]: value }
        ))
        setPrefr_form((prev) => {   // fetching and adding the userid from the local storage
            const student_id = localStorage.getItem("student_id")
            return { ...prev, 'user_id': student_id }
        })
    }
    const Handlesubmit = (e) => {   // handles the form submission
        e.preventDefault()

        // checks whether the category feild is empty
        if (prefr_form.pref_category === "") {
            setFielderr({
                'category_err': "please fill the category field"
            })
        }

        // checks whether the genre feild is empty
        if (prefr_form.pref_genre === "") {
            setFielderr({
                'genre_err': "please fill the genre field"
            })
        }

        // checks whether all fields are filled
        if (prefr_form.pref_category !== "" && prefr_form.pref_genre !== "") {
            const ENDPOINT = `http://127.0.0.1:7000/user_auth/preference/`
            fetch(ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(prefr_form)
            })
                .then((data) => (data.json()))
                .then((res) => {
                    console.log(res)
                })
            set_Message("Thanks for sharing details this will help us a lot to personalize your experience ")
            setTimeout(() => {
                redirect('/')
            }, [2000])

        }

    }
    return (
        <div className="bg-[#131313] h-screen flex" >
            <div>
                <Sidebarbtn isShowbaractivate={showsidebar} />
            </div>

            <div className="p-2 justify-center flex flex-col w-full items-center" >
                <form className=" space-y-2 p-2 md:w-1/2 lg:w-1/3 border border-gray-600 rounded-2xl flex flex-col gap-2 items-center w-full" action="">
                    <h1 className="text-white text-center  sm:text-[18px] " >Please tell us about your prefrences this will help us to personalize your experience</h1>

                    <h1 className="text-red-500" >{fielderr.category_err}</h1>  {/*category err */}

                    {/* category feild */}
                    <input value={prefr_form.pref_category} name='pref_category' onChange={Handlechange} type="text" className="bg-[#212121] rounded-2xl outline-none w-full p-5 text-white" placeholder="Fav category e.g.(Bollywood or something else)" />

                    {/* genre feild */}
                    <input value={prefr_form.pref_genre} name="pref_genre" onChange={Handlechange} type="text" className="bg-[#212121] rounded-2xl outline-none w-full p-5 text-white" placeholder="Fav genre e.g.(Romantice or something else)" />

                    <h1 className="text-red-500" >{fielderr.genre_err}</h1> {/* genre err */}

                    {/* from where user coming feild */}
                    <input value={prefr_form.from_usercoming} name="from_usercoming" onChange={Handlechange} type="text" className="bg-[#212121] rounded-2xl outline-none w-full p-5 text-white" placeholder="From where you heared about us" />

                    {/* submit btn */}
                    <button onClick={Handlesubmit} className="bg-white font-semibold w-full rounded-2xl cursor-pointer text-black p-4 " >Submit</button>
                    <h1 className="text-green-500 " >{submission_message}</h1>
                </form>
            </div>
        </div>
    )
}