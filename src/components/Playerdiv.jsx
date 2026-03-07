import React, { useRef, useState } from "react";
import laapata from '../../src/assets/laapata.jpg'
import { useNavigate } from "react-router-dom";
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForward, Codesandbox, } from "lucide-react";
import { useEffect } from "react";
export default function Playerdiv(props) {
    const [currentindex, setIndex] = useState(0)
    const [time, setTime] = useState(0) // tracks the state for the seek bar
    const navigate = useNavigate()
    const [play, setPlay] = useState(false)
    const Audioref = useRef("") // audio el
    const current_time_stamp = useRef(0)    // current time stamp
    const duration_stamp = useRef(0)    //duration stamp
    const Seek_bar = useRef(0) // seek bar 
    const song_name_section = useRef("")    // song name sec
    const artist_name_section = useRef("")  //artist name sec
    const Poster_ref = useRef("")   // poster 
    const student_id = localStorage.getItem("student_id")
    const [hasloggedin, sethasLoggedIn] = useState(false)

    const TogglePlayer = () => {    // handles the player controls 
        if (play === false) {
            if (student_id) {
                setPlay(true)
                Audioref.current.play()
                console.log("you are allowed")
            }
            else {
                console.log("you are not allowed !")
                sethasLoggedIn(true)
                alert("Your are not logged in ")
                setTimeout(() => {
                    navigate("/login")
                }, [2000])
            }
        }
        else {
            setPlay(false)
            Audioref.current.pause()
        }
    }

    const Format_time = () => { // formates the time
        const min = Math.floor(Audioref.current.duration / 60)
        const sec = Math.floor(Audioref.current.duration % 60)
        duration_stamp.current.textContent = `${min}:${sec < 10 ? "0" + sec : sec}` // updates the duration
        const current_time_min = Math.floor(Audioref.current.currentTime / 60)
        const current_time_sec = Math.floor(Audioref.current.currentTime % 60)

        // updates the current time
        current_time_stamp.current.textContent = `${current_time_min}:${current_time_sec < 10 ? "0" + current_time_sec : current_time_sec}`
        setTime(Audioref.current.currentTime)
        setTime(Audioref.current.currentTime)
    }

    useEffect(() => {   // excutes on time changes
        Seek_bar.current.value = Audioref.current.currentTime
    }, [time])

    const SeekBar = () => { // controls the seek bar logic !
        Audioref.current.currentTime = Seek_bar.current.value
        // Seek_bar.current.max = Audioref.current.duration
        console.log("working perfectly...")
    }

    const ForwardSong = () => {
        // forwards/skip the song
        if (currentindex >= props.popular_songs.length) {   // checks if index is > response's length
            setIndex(0)
        }
        else {  // forwards the song
            setIndex(currentindex + 1)
            song_name_section.current.textContent = (props.popular_songs[currentindex].song_name)
            artist_name_section.current.textContent = (props.popular_songs[currentindex].artist)
            Poster_ref.current.src = `http://127.0.0.1:7000/${props.popular_songs[currentindex].poster}`
            Audioref.current.src = `http://127.0.0.1:7000/${props.popular_songs[currentindex].song_path}`
        }
    }

    const BackwardSong = () => {

        // backwards the song
        if (currentindex === 0) {   // checks if index is =< 0 
            console.log("Can not decrease !")
        }
        else {  // skips songs to backwards
            setIndex(currentindex - 1)
            song_name_section.current.textContent = (props.popular_songs[currentindex].song_name)
            artist_name_section.current.textContent = (props.popular_songs[currentindex].artist)
            Poster_ref.current.src = `http://127.0.0.1:7000/${props.popular_songs[currentindex].poster}`
            Audioref.current.src = `http://127.0.0.1:7000/${props.popular_songs[currentindex].song_path}`
        }
    }

    // plays next song if the current song is ended !
    const HandleEnd = () => {
        ForwardSong()

    }

    return (
        <div className="bottom-0 w-full left-0 fixed gap-10 bg-black md:flex md:items-center" >   {/* contains everything */}
            <div className="flex items-center gap-2  w-full " > {/** poster and song data div */}
                <div className="p-2" >  {/* img div */}
                    <img ref={Poster_ref} src={`http://127.0.0.1:7000${props.song_data.poster}/`} className="h-12 w-14 rounded-lg" alt="poster" />
                </div>

                <div className="  capitalize " >   {/* song info div */}
                    <h1 ref={song_name_section} className="text-white text-[14px]" >{props.song_data.song_name ? props.song_data.song_name : "song name"}</h1>
                    <h1 ref={artist_name_section} className="text-gray-400 text-[12px]" >{props.song_data.artist ? props.song_data.artist : "artist name"}</h1>
                </div>

            </div>

            <div className="  p-2 w-full" >   {/** seek bar and controller's div */}
                {/* audio tag */}
                <audio onEnded={HandleEnd} onTimeUpdate={Format_time} onLoadedMetadata={Format_time} ref={Audioref} src={`http://127.0.0.1:7000/${props.song_data.src}/` ? `http://127.0.0.1:7000/${props.song_data.src}/` : ""}></audio>
                <div className=" cursor-pointer flex items-center justify-center gap-5 " >   {/* controllers */}
                    <SkipBackIcon onClick={BackwardSong} className=" text-white h-6 w-6" />
                    {/* <PlayIcon onClick={TogglePlayer} className={''} /> */}
                    {
                        play ? < PauseIcon className=" text-white h-6 w-6" onClick={TogglePlayer} /> : < PlayIcon className=" text-white h-6 w-6" onClick={TogglePlayer} />
                    }
                    <SkipForward onClick={ForwardSong} className=" text-white h-6 w-6" />
                </div>

                <div className=" flex text-white gap-2 p-2  justify-center " >{/* seek bar div */}
                    <h1 ref={current_time_stamp} className="text-[12px]" >0:00</h1>   {/* duration */}
                    <input ref={Seek_bar} onChange={SeekBar} type="range" max={Audioref.current.duration} className="range w-100" />
                    <h1 ref={duration_stamp} className="text-[12px]" >0:00</h1>   {/* current time */}
                </div>
            </div>
        </div>
    )
}