"use client";

import { useState } from "react";

export default function Home() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [animating, setAnimating] = useState(false);

  const generate = () => {
    if (min > max) return;

    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(value);
    setHistory((prev) => [value, ...prev].slice(0, 20));
    setAnimating(true);
    setTimeout(() => setAnimating(false), 150);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f1a] text-gray-200">
      <div className="w-full max-w-md px-5 text-center">
        <h1 className="mb-8 text-2xl font-bold text-white">랜덤 숫자 뽑기</h1>

        <div
          className={`mb-9 flex h-24 items-center justify-center text-7xl font-extrabold text-purple-400 transition-transform ${
            animating ? "scale-115" : ""
          }`}
        >
          {result ?? "?"}
        </div>

        <div className="mb-6 flex items-center justify-center gap-3">
          <div>
            <label className="text-xs text-gray-500">최소</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="w-24 rounded-lg border border-gray-700 bg-[#1a1a2e] p-2.5 text-center text-lg text-white outline-none focus:border-purple-500"
            />
          </div>
          <span className="mt-4 text-xl text-gray-600">~</span>
          <div>
            <label className="text-xs text-gray-500">최대</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="w-24 rounded-lg border border-gray-700 bg-[#1a1a2e] p-2.5 text-center text-lg text-white outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full rounded-xl bg-purple-600 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-purple-700 active:scale-[0.97]"
        >
          숫자 뽑기
        </button>

        {history.length > 0 && (
          <div className="mt-8 text-left">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm text-gray-500">히스토리</h2>
              <button
                onClick={() => setHistory([])}
                className="rounded-md bg-gray-800 px-2.5 py-1 text-xs text-gray-400 hover:bg-gray-700"
              >
                초기화
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((v, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-gray-700 bg-[#1a1a2e] px-3.5 py-1.5 text-sm font-medium text-purple-300"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
