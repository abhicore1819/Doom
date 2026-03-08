import React from "react";
import { useState } from "react";
import Sidebarbtn from "./Sidebarbtn";
export default function Library() {
    const [showsidebar, setShowsidebar] = useState(false)   // toggles the side bar
    return (
        <div className="bg-black" >     {/* contians everything */}
            <div className="p-5 " >
                <Sidebarbtn isShowbaractivate={showsidebar} />
            </div>
            <h1 className="text-center text-white" >Hey, i'm library !</h1>
            <h1 className="text-white text-center" >Make you own personal playlist</h1>
        </div> 
    )
}