/* Main container with full-screen background */
.welcome-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url('../../assets/images/mobilebg.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;

  font-family: "Montserrat", sans-serif;
  padding: 20px;
  overflow: hidden;
  position: relative;
}

/* Glassmorphic slider wrapper */
.slider-box {
  background: rgba(42, 71, 56, 0.82);
  backdrop-filter: blur(18px);
  border-radius: 18px;
  padding: 3rem 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  animation: fadeInUpDelayed 1s ease-out 0.6s forwards, glowBorder 3s infinite ease-in-out;
}

.slider-wrapper {
  overflow: hidden;
  width: 100%;
  height: auto;
}

.slider {
  display: flex;
  transition: transform 0.6s ease-in-out;
  width: 100%;
}

.slide {
  min-width: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  transition: opacity 0.5s ease;
}


.slide.active {
  opacity: 1;
}

/* Slide titles */
.slide h2 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
  text-shadow: 0px 0px 8px rgba(255, 255, 255, 0.4);
}

.slide p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
}

/* Slide image styling */
.slide-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 16px;
  animation: fadeInUpDelayed 0.8s ease-out;
}

/* Dot navigation */
.dots-container {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background-color: #ffffff;
  transform: scale(1.2);
  box-shadow: 0 0 8px #fff;
}
.action-btn {
  position: fixed;       /* fix position relative to viewport */
  bottom: 20px;          /* same vertical distance from bottom */
  right: 20px;           /* same horizontal distance from right */
  padding: 10px 20px;
  background-color: rgba(42, 71, 56, 0.82);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: background-color 0.3s ease;
}

.action-btn:hover {
  background-color: rgba(42, 71, 56, 0.82);
}

/* Animations */
@keyframes fadeInUpDelayed {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glowBorder {
  0%, 100% {
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 22px rgba(255, 255, 255, 0.4);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .welcome-container {
    background-image: url('../../assets/images/Tabbg.jpg');
    padding: 16px;
  }

  .slider-box {
    padding: 2rem;
  }

  .slide h2 {
    font-size: 1.4rem;
  }

  .slide p {
    font-size: 0.95rem;
  }

  .skip-btn {
    bottom: 20px;
    right: 20px;
    padding: 10px 18px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .welcome-container {
    background-image: url('../../assets/images/mobilebg.jpg');
    padding: 14px;
  }

  .slider-box {
    padding: 1.5rem;
  }

  .slide h2 {
    font-size: 1.2rem;
  }

  .slide p {
    font-size: 0.9rem;
  }

  .skip-btn {
    bottom: 16px;
    right: 16px;
    padding: 9px 16px;
    font-size: 12px;
  }
}
