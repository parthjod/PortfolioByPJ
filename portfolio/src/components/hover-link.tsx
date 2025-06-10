"use client";

import React from "react";
import { HoverPeek } from "@/components/ui/link-preview"

export const HoverPeekDemoPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-lg text-gray-800">
          <HoverPeek url="https://21st.dev/?tab=home">
            <a
              href="https://21st.dev/?tab=home"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800 hover:decoration-blue-600 hover:decoration-solid"
            >
              Eurasian
            </a>
          </HoverPeek>
        </p>
        
        <p className="text-lg text-gray-800">
          <HoverPeek url="https://github.com">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-purple-600 hover:text-purple-800 hover:decoration-purple-600 hover:decoration-solid"
            >
              ParthConnect
            </a>
          </HoverPeek>
        </p>
      </div>
    </div>
  );
};