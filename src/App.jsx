import React, { useEffect, useState, useRef } from "react";
import { Outlet, useFetcher } from "react-router-dom";
import { AppWindow, ChartNoAxesColumnDecreasing, ChevronsLeftRightEllipsis, ColumnsSettings, LocateIcon, LucideMagnet, LucideRollerCoaster, Menu, SigmaSquare } from "lucide-react";
import laapata from '../src/assets/laapata.jpg'
import Sidebar from "./components/Sidebar";
import Playerdiv from "./components/Playerdiv";
import Sidebarbtn from "./components/Sidebarbtn";
export default function App() {
  // -----states-----
  const [central_songdata, setSongdata] = useState({
    song_name: "",
    artist: "",
    poster: "",
    src: ""
  })
  const [isauthenticated, setAuth] = useState(false)  // stores the authentication state
  const [showsidebar, setShowsidebar] = useState(false)   // toggles the side bar
  const [suggested_songs, setSuggestedsong] = useState([])  // handles the personlaized song's state
  const [popular_songs, setPopularsongs] = useState([]) // handles the popular song's state
  // -----states-----

  // ----- userefs -----
  // ----- userefs -----

  useEffect(() => { // handles the personalised songs 
    if (localStorage.getItem("student_id")) {
      setAuth(true)
      const student_id = localStorage.getItem("student_id")
      const ENDPOINT = `http://127.0.0.1:7000/suggested_songs/${student_id}/`
      fetch(ENDPOINT)
        .then((raw_data) => raw_data.json())
        .then((response) => {
          const refined_res = response['song_data']
          setSuggestedsong(refined_res)
        })
    }
  }, [])

  useEffect(() => { // handles the the popular songs !
    try {
      const ENDPOINT = `http://127.0.0.1:7000/shuffled_songs/`
      fetch(ENDPOINT)
        .then((raw_data) => raw_data.json())
        .then((res) => {
          const refined_response = res['song_data']
          setPopularsongs(refined_response)
        })
    } catch (error) {
      console.log("Something went wrong !", error)
    }
  }, [])
  return (
    <div className="flex h-200 md:h-270 sm:h-280 " >
      {/* {showsidebar && <Sidebar />} */}
      {/* greetings section */}
      <div className={`bg-gray-900 space-y-8 p-5 ${showsidebar ? 'w-full' : 'w-screen'}`} >
        <Outlet />
        <Sidebarbtn isShowbaractivate={showsidebar} />
        {/* user greetings */}
        <h1 className="text-white py-5 text-2xl capitalize " >welcome, abhinav </h1>
        {/* ----- suggestions sections ------ */}
        <h1 className="text-[18px] text-white" >Suggested for you</h1>

        {/* ----- suggested album's div -----*/}
        <div className=" flex gap-2 md:gap-5 md:overflow-hidden overflow-x-scroll" >
          {isauthenticated ? suggested_songs.map((element, index) => (
            <div onClick={(() => setSongdata({ song_name: element['song_name'], artist: element['artist'], poster: element['poster'], src: element['song_path'] }))} key={index} className="bg-linear-to-r from bg-gray-700 via-gray-600 to-gray-800 px-2 py-5 rounded-2xl flex flex-col items-center gap-2 min-w-35 md:w-1/6" >   {/* img and song info div */}
              <div > {/* img div*/}
                <img className=" h-20 w-25 md:h-35 md:w-45 rounded-2xl" src={`http://127.0.0.1:7000/${element['poster']}`} />
              </div>
              <div className="text-center text-white" > {/** song info div */}
                <h1 className={`text-[16px] md:text-2xl capitalize`} >{element['song_name']}</h1>
                <h1 className={` text-[12px] md:text-[18px] capitalize`} >{element['artist']}</h1>
              </div>
            </div>
          )) : <h1 className="text-center  text-white" >Log in first, to see suggested songs</h1>}
        </div>
        {/* ----- sugueested album's div -----*/}
        {/* ----- suggestions sections ------ */}

        {/* ----- popular album section ----- */}
        <h1 className="text-[18px] text-white" >Popular albums</h1>
        <div className=" flex gap-2 md:gap-5 md:overflow-hidden overflow-x-scroll " >
          {popular_songs.map((element, index) => (
            <div onClick={(() => setSongdata({ 'song_name': element['song_name'], 'artist': element['artist'], 'poster': element['poster'], 'src': element['song_path'] }))} key={index} className="bg-linear-to-r from bg-gray-700 via-gray-600 to-gray-800 px-2 py-5 rounded-2xl flex flex-col items-center gap-2 min-w-35 md:w-1/6" >   {/* img and song info div */}
              <div> {/* img div*/}
                <img className=" h-20 w-25 md:h-35 md:w-45 rounded-2xl" src={`http://127.0.0.1:7000/${element['poster']}`} />
              </div>
              <div className="text-center text-white" > {/** song info div */}
                <h1 className={`text-[16px] md:text-2xl capitalize`} >{element['song_name']}</h1>
                <h1 className={` text-[12px] md:text-[18px] capitalize`} >{element['artist']}</h1>
              </div>
            </div>
          ))}
        </div>
        {/* ----- popular album section ----- */}
      </div>
      <Playerdiv popular_songs={suggested_songs} song_data={central_songdata} />
    </div>
  )
}