// src/pages/NotFound.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader"; // หรือคอมโพเนนต์ที่ต้องการ

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ล่าช้า 1 วินาทีเพื่อให้ผู้ใช้เห็นข้อความ NotFound ก่อนทำการนำทางย้อนกลับ
    const timer = setTimeout(() => {
      navigate(-1); // ย้อนกลับไปยังเส้นทางก่อนหน้า
    }, 1000);

    return () => clearTimeout(timer); // ทำความสะอาดเมื่อคอมโพเนนต์ไม่ถูกใช้งาน
  }, [navigate]);

  return <Loader open={true} onClose={() => {}} />; // เปลี่ยนเป็น UI ที่ต้องการแสดง
};

export default NotFound;

// import { Box, Typography } from "@mui/material";

// const NotFound = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//       }}
//     >
//       <Typography variant="h3" component="h1" color="error">
//         404 - Not Found
//       </Typography>
//       <Typography variant="h6" component="p">
//         The page you are looking for does not exist.
//       </Typography>
//     </Box>
//   );
// };

// export default NotFound;
