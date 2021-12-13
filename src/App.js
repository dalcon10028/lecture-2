import React, { useState, useEffect, Suspense, lazy } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import InfoTable from "./components/InfoTable";
import SurveyChart from "./components/SurveyChart";
import Footer from "./components/Footer";

const lazyWithPreload = (importFunction) => {
  const Component = lazy(importFunction);
  Component.preload = importFunction;
  return Component;
};

const LazyImageModal = lazyWithPreload(() => import("./components/ImageModal"));
const preloadImageSource =
  "https://stillmed.olympic.org/media/Photos/2016/08/…en-01.jpg?interpolation=lanczos-none&resize=*:800";

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    LazyImageModal.preload();
    const img = new Image();
    img.src = preloadImageSource;
  }, []);

  return (
    <div className="App">
      <Header />
      <InfoTable />
      <ButtonModal
        onClick={() => {
          setShowModal(true);
        }}
      >
        올림픽 사진 보기
      </ButtonModal>
      <SurveyChart />
      <Footer />
      <Suspense fallback={null}>
        {showModal ? (
          <LazyImageModal
            closeModal={() => {
              setShowModal(false);
            }}
          />
        ) : null}
      </Suspense>
    </div>
  );
}

const ButtonModal = styled.button`
  border-radius: 30px;
  border: 1px solid #999;
  padding: 12px 30px;
  background: none;
  font-size: 1.1em;
  color: #555;
  outline: none;
  cursor: pointer;
`;

export default App;
