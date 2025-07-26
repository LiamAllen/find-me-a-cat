function VideoFrame(video_id) {

  return (
    <>
        <div id="video-container">
            <iframe 
            id="video-frame"
            width="1324" 
            height="745" 
            src="https://www.youtube.com/embed/${video_id}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen></iframe>
        </div>
    </>
  )
}

export default VideoFrame

