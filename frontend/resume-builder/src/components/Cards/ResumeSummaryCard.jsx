import React, {useState, useEffect} from 'react'
import { getLightColorFromImage } from '../../utils/helper';

const ResumeSummaryCard = ({
  imgUrl,
  title,
  lastUpdated,
  onSelect
}) => {

  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    if(imgUrl){
      getLightColorFromImage(imgUrl)
      .then(color => {
        setBgColor(color)
      })
      .catch(()=>{
        setBgColor('#ffffff')
      })
    }
  }, [imgUrl]);


  return (
    <div className="h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer" 
    onClick={onSelect}
    style={{
      backgroundColor: bgColor
    }}
    >
      <div className="p-4">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="resume"
            className="w-[100%] h-[200px] rounded"
          />
        ) : (
          <div className=""></div>
        )}
      </div>

      <div className="w-full bg-white px-4 py-3">
        <h2 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">{title}</h2>
        <p className="text-xs font-medium text-gray-500 mt-0.5">Last Updated: {lastUpdated}</p>
      </div>
    </div>
  )
}

export default ResumeSummaryCard