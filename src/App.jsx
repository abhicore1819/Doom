import React, { useEffect, useState, useRef } from "react";
import { Outlet, useFetcher } from "react-router-dom";
// import {} from "lucide-react";
import laapata from "../src/assets/laapata.jpg";
import Sidebar from "./components/Sidebar";
import Playerdiv from "./components/Playerdiv";
import Sidebarbtn from "./components/Sidebarbtn";
export default function App() {
  // global student id variable
  const student_id = localStorage.getItem("student_id");
  // -----states-----
  const [hasshowusercount, setHasShowUsercount] = useState(false);
  const [usercount, setUserCount] = useState(0);
  const [usergreet, Setusergreet] = useState("");
  const [central_songdata, setSongdata] = useState({
    song_name: "",
    artist: "",
    poster: "",
    src: "",
  });
  const [isauthenticated, setAuth] = useState(false); // stores the authentication state
  const [showsidebar, setShowsidebar] = useState(false); // toggles the side bar
  const [suggested_songs, setSuggestedsong] = useState([]); // handles the personlaized song's state
  const [popular_songs, setPopularsongs] = useState([]); // handles the popular song's state
  // -----states-----

  // ----- userefs -----
  // ----- userefs -----

  useEffect(() => {
    // show the user count
    const URL = `http://localhost:7000/user_auth/users/${student_id}`;
    fetch(URL)
      .then((raw_data) => raw_data.json())
      .then((data) => {
        const FetchedUserCount = data.UserData.UserCount
        setUserCount(FetchedUserCount);
        setHasShowUsercount(true);

        setTimeout(() => {
          setHasShowUsercount(false);
        }, [2000]);
      });
  }, []); // show the user count

  // handles the personalised songs
  useEffect(() => {
    if (localStorage.getItem("student_id")) {
      setAuth(true);
      const student_id = localStorage.getItem("student_id");
      const ENDPOINT = `http://127.0.0.1:7000/suggested_songs/${student_id}/`;
      fetch(ENDPOINT)
        .then((raw_data) => raw_data.json())
        .then((response) => {
          const refined_res = response.song_data;
          setSuggestedsong(refined_res);
        });
    }
  }, []);
  // handles the personalised songs

  // handles the the popular songs !
  useEffect(() => {
    try {
      const ENDPOINT = `http://127.0.0.1:7000/shuffled_songs/`;
      fetch(ENDPOINT)
        .then((raw_data) => raw_data.json())
        .then((res) => {
          const refined_response = res["song_data"];
          setPopularsongs(refined_response);
        });
    } catch (error) {
      console.log("Something went wrong !", error);
    }
  }, []);
  // handles the the popular songs !

  // handles the personalized user greetings
  useEffect(() => {
    if (localStorage.getItem("name")) {
      const name = localStorage.getItem("name");
      Setusergreet(name);
    }
  });
  // handles the personalized user greetings

  return (
    <div className="h-screen md:h-280 ">
      {/* {showsidebar && <Sidebar />} */}
      {/* greetings section */}
      <div
        className={`bg-[#131313] space-y-8 p-5 ${showsidebar ? "w-full" : "w-screen"}`}
      >
        <Outlet />
        <Sidebarbtn isShowbaractivate={showsidebar} />
        {/* user greetings */}
        <h1 className="text-white py-5 text-2xl capitalize ">
          {`${usergreet ? "welcome, " + usergreet : "welcome user"}`}
        </h1>
        <h1 className="text-center font-semibold text-white">{`${hasshowusercount ? " You are the " + usercount + "th" + " user of doom 🎉!" : ""}`}</h1>
        {/* ----- suggestions sections ------ */}
        <h1 className="text-[18px] text-white">Suggested for you</h1>

        {/* ----- suggested album's div -----*/}
        <div className="  grid md:flex grid-cols-3 gap-y-2 gap-x-2">
          {isauthenticated ? (
            suggested_songs.map((element, index) => (
              <div  // suggested album cards 
                onClick={() =>
                  setSongdata({
                    song_name: element["song_name"],
                    artist: element["artist"],
                    poster: element["poster"],
                    src: element["song_path"],
                  })
                }
                key={index}
                className="bg-[#212121] rounded-lg p-2 w-full flex items-center flex-col "
              >
                {" "}
                {/* img and song info div */}
                <div className="" >
                  {" "}
                  {/* img div*/}
                  <img
                    className=" rounded-lg h-20 w-25 md:h-45 md:w-55"
                    src={`http://127.0.0.1:7000/${element["poster"]}`}
                  />
                </div>
                <div className="text-center  space-y-2  ">
                  {" "}
                  {/** song info div */}
                  <h1 className={`text-[10px] font-semibold sm:text-2xl text-white capitalize p-2`}>
                    {element["song_name"]}
                  </h1>
                  <h1 className={`text-[8px] sm:text-[16px] capitalize text-gray-400`}>
                    {element["artist"]}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-white">
              Log in first, to see suggested songs
            </h1>
          )}
        </div>
        {/* ----- sugueested album's div -----*/}
        {/* ----- suggestions sections ------ */}

        {/* ----- popular album section ----- */}
        <h1 className="text-[18px] text-white">Popular albums</h1>
        <div className=" grid grid-cols-3 md:flex gap-y-2 p-2 gap-x-2">
          {popular_songs.map((element, index) => (
            <div
              onClick={() =>
                setSongdata({
                  song_name: element["song_name"],
                  artist: element["artist"],
                  poster: element["poster"],
                  src: element["song_path"],
                })
              }
              key={index}
              className="bg-[#212121] rounded-lg p-2 flex flex-col items-center w-full"
            >
              {" "}
              {/* img and song info div */}
              <div>
                {" "}
                {/* img div*/}
                <img
                  className=" rounded-lg h-20 w-25 md:h-45 md:w-55 "
                  src={`http://127.0.0.1:7000/${element["poster"]}`}
                />
              </div>
              <div className="text-center  text-white">
                {" "}
                {/** song info div */}
                <h1 className={`text-[10px] font-semibold sm:text-2xl p-2 capitalize text-white`}>
                  {element["song_name"]}
                </h1>
                <h1 className={`text-[8px] sm:text-[16px] capitalize text-gray-400`}>
                  {element["artist"]}
                </h1>
              </div>
            </div>
          ))}
        </div>
        {/* ----- popular album section ----- */}
      </div>
      <Playerdiv popular_songs={suggested_songs} song_data={central_songdata} />
    </div>
  );
}
