
const Resume = () => {
    return (
        <div
            className='w-300 h-200 flex items-center justify-center bg-gray-800 text-white'
        >
            <iframe src="https://drive.google.com/file/d/1ds5cxl9DYlokm0r2M5V3nzEnJcKyUhke/preview"
                className='w-full h-full'
                frameBorder="0"
                scrolling="no"
                title="Resume"
                sandbox="allow-same-origin allow-scripts allow-presentation"
                loading="lazy"
            ></iframe>
        </div>
    )
}

export default Resume