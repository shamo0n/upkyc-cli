// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./WelcomeScreen.css";
// import AnimationComponent from "../../components/lottie-react/AnimationComponent";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import { Image } from "react-native";

// const slides = [
//   {
//     title: "Welcome to UPKYC",
//     description:
//       "Simplify your identity verification with secure, seamless digital onboarding.",
//   },
//   {
//     title: "Fast Document Upload",
//     description:
//       "Easily upload your KYC documents anytime, anywhere, using your phone or computer.",
//   },
//   {
//     title: "Instant Verification",
//     description:
//       "Get your identity verified quickly so you can start using services without delay.",
//   },
// ];

// const WelcomeScreen = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Slide auto-advance logic
//   useEffect(() => {
//     if (currentSlide >= slides.length - 1) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => prev + 1);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [currentSlide]);

//   // Auto move to login after last slide
//   useEffect(() => {
//     if (currentSlide === slides.length - 1) {
//       const timeout = setTimeout(() => {
//         setLoading(true);
//         setTimeout(() => {
//           localStorage.setItem("hasSeenWelcome", "true");
//           navigate("/login");
//         }, 1500); // loader duration
//       }, 5000); // wait after last slide
//       return () => clearTimeout(timeout);
//     }
//   }, [currentSlide, navigate]);

//   const handleSkip = () => {
//     setLoading(true);
//     setTimeout(() => {
//       localStorage.setItem("hasSeenWelcome", "true");
//       navigate("/login");
//     }, 2000);
//   };

//   const handleNext = () => {
//     setLoading(true);
//     setTimeout(() => {
//       localStorage.setItem("hasSeenWelcome", "true");
//       navigate("/login");
//     }, 2000);
//   };

//   // // Show loader full screen
//   // if (loading) {
//   //   return <LoadingSpinner />;
//   // }

//   return (
//     <div className="welcome-container">
//       {loading && <LoadingSpinner />}
//       <div className="slider-box">
//         <Image
//           src={require("../../assets/images/up-logo.png")}
//           alt="AML Logo"
//         />
//         <AnimationComponent />

//         <div className="slider-wrapper">
//           <div
//             className="slider"
//             style={{
//               transform: `translateX(-${currentSlide * 100}%)`,
//             }}
//           >
//             {slides.map((slide, index) => (
//               <div key={index} className="slide">
//                 <h2>{slide.title}</h2>
//                 <p>{slide.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Dots */}
//         <div className="dots-container">
//           {slides.map((_, index) => (
//             <span
//               key={index}
//               className={`dot ${index === currentSlide ? "active" : ""}`}
//             ></span>
//           ))}
//         </div>
//       </div>

//       <button
//         className="action-btn"
//         onClick={currentSlide === slides.length - 1 ? handleNext : handleSkip}
//         disabled={loading}
//       >
//         {currentSlide === slides.length - 1 ? (
//           <>
//             Next <span style={{ fontWeight: "bold" }}>&rarr;</span>
//           </>
//         ) : (
//           "Skip"
//         )}
//       </button>
//     </div>
//   );
// };

// export default WelcomeScreen;
