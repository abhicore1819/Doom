import React from "react";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
export default function Sidebarbtn(props) {
    const [showsidebar, setShowbar] = useState(props.isShowbaractivate)
    const Togglesidbar = () => {
        if (showsidebar === false) {
            setShowbar(true)
        }
        else {
            setShowbar(false)
        }

    }
    return (
        <div className=" p-2" >
            <button onClick={Togglesidbar} className={`z-20 left-5 fixed cursor-pointer ${showsidebar ? 'rotate-90 transition-all duration-400' : ' transition-all duration-400 rotate-0'} text-white `} ><Menu /></button>
            {showsidebar && <Sidebar/>}
        </div>
    )
}