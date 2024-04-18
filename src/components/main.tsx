import { Grid, OrbitControls } from "@react-three/drei";
import { LumaSplatsSemantics } from "@lumaai/luma-web";
import "@/lib/LumaSplatsReact";
import { Controllers, Hands, Interactive, useXR } from "@react-three/xr";
import { useState } from "react";

const forMS = (num: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, num));
};

export default function Main(props: { splatURL?: string }) {
  const { splatURL } = props;

  const gridConfig = {
    gridSize: [10.5, 10.5],
    cellSize: 0.6,
    cellThickness: 1,
    cellColor: "#6f6f6f",
    sectionSize: 3.3,
    sectionThickness: 1.5,
    sectionColor: "#c1c1c1",
    fadeDistance: 25,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };

  const session = useXR((s) => s.session);
  const hasSession = Boolean(session);

  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(2.8);
  const [scale, setScale] = useState<number>(1);

  const handleSqueezeStart = (e) => {
    console.log(`onSqueezeStart`, { e });
  };

  const handleSqueezEnd = (e) => {
    console.log(`onSqueezeEnd`, { e });
  };

  const handleOrbitStart = () => {
    setHasInteracted(true);
  };

  const handleOrbitEnd = async () => {
    await forMS(500);
    setHasInteracted(false);
  };

  return (
    <>
      <ambientLight intensity={0.5} /> <pointLight position={[5, 5, 5]} />
      {hasSession ? (
        <>
          <Controllers rayMaterial={{ visible: true }} />
          <Hands />
        </>
      ) : (
        <OrbitControls
          onStart={handleOrbitStart}
          onEnd={handleOrbitEnd}
          autoRotate={!hasInteracted}
        />
      )}
      {!splatURL && (
        <Grid
          position={[0, -1, 0]}
          args={[10.5, 10.5]}
          {...gridConfig}
          renderOrder={-1}
        />
      )}
      {splatURL && (
        <lumaSplats
          particleRevealEnabled={true}
          semanticsMask={LumaSplatsSemantics.ALL}
          source={splatURL}
          position={[0, 0, 0]}
          scale={scale}
          rotation={[0, rotation, 0]}
        />
      )}
    </>
  );
}
