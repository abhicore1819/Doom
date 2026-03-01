import React from "react";
import { useState } from "react";
import Sidebarbtn from "./Sidebarbtn";
export default function Library() {
    const [showsidebar, setShowsidebar] = useState(false)   // toggles the side bar
    return (
        <div className="bg-gray-900" >
            <div className="p-5 bg-gray-900 " >
                <Sidebarbtn isShowbaractivate={showsidebar} />
            </div>
            <h1 className="text-center text-white" >Hey, i'm library !</h1>
        </div>
    )
}