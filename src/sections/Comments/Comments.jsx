// import "./Comments.css";
// import { useState, useEffect } from "react";
// import axios from "axios";
// // import  { useRef, } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';


// // import required modules
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// export default function Comments() {
//     const [comments, setComments] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API
//     axios
//       .get("https://academy-backend-pq91.onrender.com/allcomments")
//       .then((response) => {
//         setComments(response.data); // Store the fetched data in the state
//       })
//       .catch((error) => {
//         console.error("Error fetching the comments:", error);
//       });
//   }, []); 
//   return (
//     <>
//       <div className="container">
//         <h1></h1>
//         {/* <ul className="comments">
//         {comments.map((comment) => (
//           <li className="Larger shadow " key={comment.id}>
//             <p><strong>Name:</strong> {comment.name}</p>
//             <p><strong>Country:</strong> {comment.country}</p>
//             <p className="main_comment"><strong>Comment:</strong> {comment.comment}</p>
//           </li>
//         ))}
//       </ul> */}
//       <Swiper
//         spaceBetween={30}
//         centeredSlides={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="mySwiper"
//       >
//         <SwiperSlide> <ul className="comments">
//         {comments.map((comment) => (
//           <li className="Larger shadow " key={comment.id}>
//             <p><strong>Name:</strong> {comment.name}</p>
//             <p><strong>Country:</strong> {comment.country}</p>
//             <p className="main_comment"><strong>Comment:</strong> {comment.comment}</p>
//           </li>
//         ))}
//       </ul></SwiperSlide>

//       </Swiper>
//       </div>
//     </>
//   );
// }
import "./Comments.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Comments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get("https://academy-backend-pq91.onrender.com/allcomments")
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching the comments:", error);
            });
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="text-center fw-bold mt-5 mb-5">من آراء الأهالي الكرام في أكاديمية اللغة العربية</h1>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    slidesPerView={3} // عرض 3 شرائح في نفس الوقت
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {comments.map((comment) => (
                        <SwiperSlide className="comments" key={comment.id}>
                            <li>
                                <p className="main_comment shadow"> {comment.comment}</p>
                                <p className="country">{comment.country}</p>
                                <p className="name">{comment.name}</p>
                            </li>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
