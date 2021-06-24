import React, { ChangeEvent, useState, useEffect } from "react";
import { Video } from "./Video";
import * as videoService from './VideoService';
import {toast} from 'react-toastify';
import {useHistory, useParams} from 'react-router-dom';

type InputChange = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

interface Params {
  id: string;
}

const VideoForm = () => {

  const history = useHistory()
  const params = useParams<Params>();
  console.log(params);

  const initialState = {
    title: "",
    description: "",
    url: "",
  }

  const [video, setVideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange ) => {
      setVideo({...video, [e.target.name]: e.target.value}) //"..." mean to rest of elements [name]:value
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!params.id) {
        await videoService.createVideos(video);
        toast.success('New video added')
        setVideo(initialState);
      } else {
        await videoService.updateVideo(params.id, video)
      }

      history.push('/') //One time new video added redirect to route '/'
      
    }

  const getVideo = async (id: string) => {
    const res = await videoService.getVideo(id);
    const { title, description, url } = res.data;
    setVideo({title, description, url}) 
  }  

  useEffect(() => {
    if (params.id) getVideo(params.id);
  }, [])

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Write a title for this video"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.title}
                  autoFocus
                />
              </div>

              <div className="form-group mb-3">
                <input
                  type="text"
                  name="url"
                  placeholder="https://somesite.com"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url}
                />
              </div>

              <div className="form-group mb-3">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="Write a description"
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>

              {
                params.id ?
                <button className="btn btn-info">Updated Video</button>
                :
                <button className="btn btn-primary">Create Video</button>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
