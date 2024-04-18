"use client";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import Main from "@/components/main";
import { VRButton, XR } from "@react-three/xr";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [inputVal, setInputVal] = useState<string | undefined>();
  const [splatURL, setSplatURL] = useState<string | undefined>();

  return (
    <main className="absolute inset-0">
      {!splatURL && (
        <div className="z-10 absolute inset-12 w-80 mx-auto py-20">
          <Card className="p-4 space-y-4">
            <CardTitle>Enter URL to splat</CardTitle>
            <Input
              type="url"
              placeholder="https://lumalabs.ai/capture/83b1cec3-c5e4-4418-9b3b-42a3261e55f4"
              onChange={(e) => setInputVal(e.target.value)}
            />
            <Button
              className="w-full"
              disabled={!inputVal}
              onClick={() => setSplatURL(inputVal)}
            >
              Submit
            </Button>
          </Card>
        </div>
      )}
      {splatURL && (
        <VRButton
          sessionInit={{ optionalFeatures: ["unbounded", "hand-tracking"] }}
        />
      )}
      <Canvas className="min-h-screen w-screen">
        <XR foveation={0.5}>
          <Main splatURL={splatURL} />
        </XR>
      </Canvas>
    </main>
  );
}
