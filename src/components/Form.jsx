import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Tabs from "./Tabs";
import {API_KEY} from "../../env.js";
import getVideoUrl from './getVideoUrl.js'

function form() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [basicInfo, setBasicInfo] = useState({
        title: '',
        thumbnail: '',
        related_videos: []
    })

    // resolutions: '',
    // size: '',
    // downloadLink: '',
    const [videoInfo, setVideoInfo] = useState([])

    //file
    // size
    // downloadLink 
    const [audioInfo, setAudioInfo] = useState([])

    const [loading, setLoading] = useState(false)

    const getVideoInfo = async (videoUrl) => {
        try {

            let url = encodeURIComponent(videoUrl)
            setLoading(true)

            let res = await axios.get(`http://localhost:4000/api/file-info/${url}`)
            setLoading(false)
            setBasicInfo(res.data.fileInfo)
            setVideoInfo(res.data.videoInfo)
            setAudioInfo(res.data.audioInfo)
        } catch (error) {
            console.log(error.response.data.message);
            setLoading(false)
        }
    }

    const handleVideoUrl = async (title) => {
        setLoading(true)
        let videoUrl = await getVideoUrl(title, API_KEY)
        setLoading(false)
        await getVideoInfo(videoUrl)
    }


    const onSubmit = async (data) => {
        console.log(data);
        try {
            await getVideoInfo(data.videoUrl)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (!loading ?
        <div className="tablet:w-[50vw] w-[90vw] my-[10vh]">
            <div className="tablet:h-[30vw]  h-[60vw] w-full  mb-2 rounded-md overflow-hidden">
                <img src={basicInfo.thumbnail} alt="" className="h-full w-full " />
            </div>
            <h1 className="text-[20px] my-2">{basicInfo.title}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-7">
                <div className="flex tablet:w-[50vw] w-[90vw] overflow-x-hidden rounded ">
                    <input {...register('videoUrl', { required: true })} type="url" placeholder="paste your url here" className="w-full outline-none bg-transparent focus:border-red-600 border border-zinc-600 shadow-lg p-2 " />
                    <button type="submit" className="bg-indigo-500 p-1 max-tablet:text-[3vw]">Download</button>
                </div>
            </form>
            <Tabs audioInfo={audioInfo} videoInfo={videoInfo} />

            <div className="flex gap-2 flex-wrap my-[5vh]">
                {
                    basicInfo.related_videos.map((video) => (
                        <div key={video.title} className="flex justify-between gap-[2vw]" onClick={()=>handleVideoUrl(video.title)}>
                            <div className="h-[200px] w-[200px] border ">
                                <img src={video.thumbnail} alt="" className="h-full w-full" />
                            </div>
                            <h1 className="sm:text-[1.7vw] text-[2.5vw] text-wrap">{video.title}</h1>
                        </div>
                    ))
                }
            </div>
        </div> :
        <h1 className="text-[30px] font-bold">...Loading</h1>
    )
}

export default form
