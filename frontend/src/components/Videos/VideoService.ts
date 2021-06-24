//This file works to request petitions to backend   
import axios from 'axios';
import { Video } from './Video';

const API = 'http://localhost:4000'

export const getVideos = async () => {
    return await axios.get<Video[]>(`${API}/videos`); //connect to backend for get videos
}

export const createVideos = async (video: Video) => { //name Type of test
    return await axios.post(`${API}/videos`, video); //connect to backend
}

export const getVideo = async (id: string) => {
    return await axios.get<Video>(`${API}/videos/${id}`); //connect to backend for get a single video
}   

export const updateVideo = async (id: string, video: Video) => {
    return await axios.put<Video>(`${API}/videos/${id}`, video); //connect to backend for get a single video
} 

export const deleteVideo = async (id: string) => {
    return await axios.delete<Video>(`${API}/videos/${id}`); //connect to backend for get a single video
}  