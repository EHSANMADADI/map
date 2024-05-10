// import React, { useRef, useEffect } from 'react';
// import PANOLENS from 'panolens';
// import axios from 'axios';
// const Panorama = ({id}) => {
//   const [panoramaData, setPanoramaData] = useState(null);

//   useEffect(() => {
//     axios.post('https://195.191.45.56:9997/Elastic/image',{id})
//       .then(response => response.blob()).catch((err)=>console.log(err))
//       .then(blob => {
//         const objectURL = URL.createObjectURL(blob);
//         setPanoramaData(objectURL);
//       });
//   }, []);

//   if (!panoramaData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <PANOLENS.Panorama src={panoramaData} />
//     </div>
//   );
// };

// export default Panorama;



