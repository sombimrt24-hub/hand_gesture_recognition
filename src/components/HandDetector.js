"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const GESTURE_LABELS = [
  'Palm', 'L Shape', 'Fist', 'Fist Moved', 'Thumb', 
  'Index', 'OK Sign', 'Palm Moved', 'C Shape', 'Down'
];

export default function HandDetector() {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [gesture, setGesture] = useState("Initializing...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModel() {
      try {
        await tf.ready();
        const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
        setModel(loadedModel);
        setLoading(false);
        setGesture("Show your hand");
      } catch (err) {
        console.error("Model failed to load:", err);
        setGesture("Error loading model");
      }
    }
    loadModel();
  }, []);

  const detect = async () => {
    if (model && videoRef.current && videoRef.current.readyState === 4) {
      const video = videoRef.current;
      
      const prediction = tf.tidy(() => {
        const img = tf.browser.fromPixels(video)
          .resizeNearestNeighbor([64, 64])
          .mean(2)
          .expandDims(0)
          .expandDims(-1)
          .div(255.0);
        return model.predict(img);
      });

      const predictionData = await prediction.data();
      const maxIndex = prediction.argMax(1).dataSync()[0];
      const confidence = Math.round(predictionData[maxIndex] * 100);

      if (confidence > 70) {
        setGesture(GESTURE_LABELS[maxIndex]);
      } else {
        setGesture("Scanning...");
      }
      prediction.dispose();
    }
    requestAnimationFrame(detect);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <div className="mb-6 px-8 py-3 bg-blue-600/20 border border-blue-500/50 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        <span className="text-xl font-mono font-bold text-blue-400 tracking-widest uppercase">
          {gesture}
        </span>
      </div>

      <div className="relative group">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-2xl z-10 border border-gray-700">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onLoadedData={detect}
          className="rounded-2xl border border-gray-700 shadow-2xl w-full h-auto bg-black scale-x-[-1]" 
        />
        
        {!loading && (
          <div className="absolute inset-x-0 top-0 h-0.5 bg-blue-500/50 shadow-[0_0_10px_#3b82f6] animate-scan z-20 pointer-events-none"></div>
        )}
      </div>

      <p className="mt-4 text-gray-500 text-sm italic">
        Tip: Keep your hand centered and use good lighting.
      </p>
    </div>
  );
}