import moment from "moment";
import html2canvas from 'html2canvas';

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (title) => {
  if (!title) return "";
  const words = title.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toLocaleUpperCase();
}

// get lighttest average color
export const getLightColorFromImage = async (imgUrl) =>{
  return new Promise((resolve, reject) => {
    // check is imageUrl is vaild
    if(!imgUrl || typeof imgUrl !== 'string') return reject(new Error('Invalid image url'));

    const img = new Image();

    // if not a base64 string, set crossOrgin (important fro cors)
    if(!imgUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    img.src = imgUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);


      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      
      let r = 0;
      let g = 0;
      let b = 0;
      let count = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const red = imageData[i];
        const green = imageData[i + 1];
        const blue = imageData[i + 2];
        const brightness = (red + green + blue) / 3;


        if (brightness > 180) {
          r += red;
          g += green;
          b += blue;
          count++;
        }
      }

      if(count === 0){
        resolve('#ffffff');
      }else{
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        const color = `rgb(${r}, ${g}, ${b})`;
        resolve(color);
      }
    };

    img.onerror = (e) => {
      console.error(e);
      reject(new Error('Failed to load image'));
    };

  })
}

// Eg. Mar 2025
export const formatYearMonth = (yearMonth) => {
  return yearMonth ? moment(yearMonth, 'YYYY-MM').format('MMM YYYY'): '';
}

export const fixTailwindColors = (element)=>{
  const elements = element.querySelectorAll('*');

  elements.forEach((el)=>{
    const style = window.getComputedStyle(el);

    ["color", "backgroundColor", "borderColor"].forEach((prop)=>{
      const value =  style[prop];
      if(value.includes("oklch")){
        el.style[prop] = "#000"; // or any safe fallback
      }
    });
  })
}

// convert components to image
export async function captureElementAsImage(element) {
  if(!element) throw new Error('Element not found');
  const canvas = await html2canvas(element);
  const dataUrl = canvas.toDataURL('image/png');
  return dataUrl;
}

//utility to convert base64 data URL to a File object
export const dataURLtoFile = (dataurl, fileName) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}
