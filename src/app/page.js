import HandDetector from '@/components/HandDetector';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Hand Gesture AI
          </h1>
          <p className="text-gray-400">
            Real-time recognition using TensorFlow.js and your webcam.
          </p>
        </header>

        {/* The Machine Learning Component */}
        <div className="w-full flex justify-center bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700">
          <HandDetector />
        </div>

        {/* Footer / Instructions */}
        <footer className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-gray-500">
          <div className="p-4 border border-gray-800 rounded-xl">
            <span className="block font-bold text-gray-300 mb-1">Step 1</span>
            Allow camera access in your browser.
          </div>
          <div className="p-4 border border-gray-800 rounded-xl">
            <span className="block font-bold text-gray-300 mb-1">Step 2</span>
            Position your hand clearly in the frame.
          </div>
          <div className="p-4 border border-gray-800 rounded-xl">
            <span className="block font-bold text-gray-300 mb-1">Step 3</span>
            Try gestures like Palm, Fist, or OK.
          </div>
        </footer>

      </div>
    </main>
  );
}