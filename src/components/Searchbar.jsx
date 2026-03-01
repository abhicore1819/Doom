import React from "react";
import Sidebarbtn from "./Sidebarbtn";
import Playerdiv from "./Playerdiv";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
export default function Searchbar() {
  const [hasresponse, setHasresponse] = useState(false);
  const [showsidebar, setShowsidebar] = useState(false); // toggles the side bar btn's state
  const [query, setQuery] = useState(""); // manages the query(DOM value)'s state
  const [displaysongs, setSonglist] = useState([]); // handles the songs array to display
  const [isresponseempty, setisResponseEmpty] = useState(false); // handles error state for empty result
  const [show_response, setShowresponse] = useState(false); // handles that if reponse should display or not
  const [central_songdata, setSongData] = useState({
    song_name: "",
    artist: "",
    poster: "",
    src: "",
  });

  // triggers on every change
  const Handlequery = (event) => {
    event.preventDefault();
    // sets the query on corresponding change in value
    setQuery(event.target.value);
  };

  // handles the final query and recieve response from server
  const HandleSubmit = (event) => {
    event.preventDefault();
    const URL_ENDPOINT = `http://127.0.0.1:7000/get_songs/${query}/`;
    console.log(URL_ENDPOINT);
    fetch(URL_ENDPOINT) // fetches the response
      .then((raw_data) => raw_data.json()) // handles succeed response !
      .then((res) => {
        console.log(res);
        const song_data = res.song_data;
        setSonglist(song_data);
        if (res.status_code !== 200) {
          setisResponseEmpty(true);
          setShowresponse(false);
        } else {
          setShowresponse(true);
          setisResponseEmpty(false);
          setHasresponse(true);
        }
      })
      // logs if any error occured !
      .catch((error) => {
        console.log("something went wrong !", error);
      });
  };

  const btn = () => {
    console.log("displaysongs:-", displaysongs);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-5 text-white">
      <div>
        {" "}
        {/* sidebar btn div */}
        <Sidebarbtn isShowbaractivate={showsidebar} />
      </div>
      <form onSubmit={HandleSubmit} className="p-5 flex justify-center ">
        {" "}
        {/* search bar div */}
        <input
          value={query}
          onChange={Handlequery}
          type="text"
          className=" outline-none bg-gray-700 md:w-1/2 lg:w-1/3 rounded-l-full p-2 w-full"
          placeholder="What do you want to listen?"
        />
        <SearchIcon
          onClick={HandleSubmit}
          className="bg-gray-700 h-13 w-13 p-2 rounded-r-full"
        />
      </form>
      <div className=" capitalize space-y-5 flex flex-col">
        {show_response
          ? displaysongs.map((element, index) => (
              // contains the song info and img div
              <div
                onClick={() =>
                  setSongData({
                    song_name: element["song_name"],
                    artist: element["artist"],
                    poster: element["poster"],
                    src: element["song_url"],
                  })
                }
                className=" gap-2 flex max-w-1/2 rounded-2xl p-2 bg-linear-to-r from bg-gray-700 via-gray-600 to-gray-800 space-y-5"
                key={index}
              >
                <div className="p-2 h-28 w-28">
                  {" "}
                  {/* contains the img */}
                  <img
                    className="rounded-2xl"
                    src={`http://127.0.0.1:7000/${element["poster"]}`}
                    alt=""
                  />
                </div>
                <div className="p-2">
                  {/* song info div */}
                  <h1 className="font-bold">{element.song_name}</h1>
                  <h1>{element.artist}</h1>
                </div>
              </div>
            ))
          : ""}
      </div>

      {/* ----- req btn and empty res err div */}
      <div className=" flex flex-col items-center gap-5 p-5">
        <h1
          className={` ${isresponseempty ? "text-red-500 text-center text-2xl" : "opacity-0"}`}
        >
          {" "}
          {isresponseempty ? "We could'nt find !" : ""}
        </h1>
        {isresponseempty && (
          <button className="bg-linear-to-r from bg-blue-700 via-blue-800 to-blue-950 p-2 rounded-2xl">
            Request this song !
          </button>
        )}
      </div>
      {/* ----- req btn and empty res err div */}

      {hasresponse ? <Playerdiv song_data={central_songdata} /> : ""}
    </div>
  );
}
