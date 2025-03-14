import { Layers } from 'three'
import { Canvas } from '@react-three/fiber'
import { Physics, Debug } from '@react-three/cannon'
import {Environment, PerspectiveCamera, OrbitControls, Stats, Sky } from '@react-three/drei'
import './styles.css'


import type { DirectionalLight } from 'three'

import { HideMouse, Keyboard } from './controls'
import { Cameras } from './effects'
import { Track, Vehicle, Goal, Heightmap } from './models'
import { angularVelocity, levelLayer, position, rotation, useStore } from './store'
import { Checkpoint, Editor, LeaderBoard, Finished, PickColor } from './ui'
import { useToggle } from './useToggle'
import { useState, useEffect} from 'react'


const layers = new Layers()
layers.enable(levelLayer)

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function App(): JSX.Element {
  const [light, setLight] = useState<DirectionalLight | null>(null)
  const [actions, dpr, editor, shadows] = useStore((s) => [s.actions, s.dpr, s.editor, s.shadows])
  const { onCheckpoint, onFinish, onStart } = actions


  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const [setForward, setBackward, setLeft, setRight] = useStore((state) => [
    state.actions.forward,
    state.actions.backward,
    state.actions.left,
    state.actions.right,
  ]);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  // Обработчики нажатий кнопок
  const handlePress = (action: (v: boolean) => void) => () => {
    action(true);
  };

  const handleRelease = (action: (v: boolean) => void) => () => {
    action(false);
  };
 

  const ToggledCheckpoint = useToggle(Checkpoint, 'checkpoint')
  const ToggledDebug = useToggle(Debug, 'debug')
  const ToggledEditor = useToggle(Editor, 'editor')
  const ToggledFinished = useToggle(Finished, 'finished')
  // const ToggledMap = useToggle(Minimap, 'map')
  const ToggledOrbitControls = useToggle(OrbitControls, 'editor')
  const ToggledStats = useToggle(Stats, 'stats')

  return (
    <>
      <Canvas key={`${dpr}${shadows}`} dpr={[1, dpr]} shadows={shadows} camera={{ position: [0, 5, 15], fov: 50 }}>
        <ambientLight layers={layers} intensity={0.1} />
        <directionalLight
          ref={setLight}
          layers={layers}
          position={[0, 150, 150]}
          intensity={1}
          shadow-bias={-0.001}
          shadow-mapSize={[4096, 4096]}
          shadow-camera-left={-150}
          shadow-camera-right={150}
          shadow-camera-top={150}
          shadow-camera-bottom={-150}
          castShadow
        />
        <PerspectiveCamera makeDefault={editor} fov={75} position={[0, 20, 20]} />
        <Physics allowSleep broadphase="SAP" defaultContactMaterial={{contactEquationStiffness: 1e6, contactEquationRelaxation: 4, friction: 1e-3 }}>
          <ToggledDebug scale={1.0001} color="white">
            <Vehicle angularVelocity={[...angularVelocity]} position={[...position]} rotation={[...rotation]}>
              {light && <primitive object={light.target} />}
              <Cameras />
            </Vehicle>
            {/* <Train /> */}
            {/* <Ramp args={[30, 6, 8]} position={[2, -1, 168.55]} rotation={[0, 0.49, Math.PI / 15]} /> */}
            <Heightmap elementSize={0.302} position={[309, -15, -309]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
            <Goal args={[0.00001, 10, 18]} onCollideBegin={onStart} rotation={[0, 1, 0]} position={[-205, -15, 210]} />
            <Goal args={[0.001, 10, 18]} onCollideBegin={onFinish} rotation={[0, 0, 0]} position={[254, -15,-224]} />
            <Goal args={[0.001, 10, 18]} onCollideBegin={onCheckpoint} rotation={[0, -0.5, 0]} position={[-50, 1, -5]} />
            {/* <BoundingBox {...{ depth: 512, height: 100, position: [0, 40, 0], width: 512 }} /> */}
          </ToggledDebug>
        </Physics>
        <Track />
        <Sky/>
        <Environment files="textures/dikhololo_night_1k.hdr" />
        {/* <ToggledMap /> */}
        <ToggledOrbitControls />
      </Canvas>
      {isMobileDevice && (
        <>
          <div className="mobile-controls">
            <div className="controls-column">
              <button
                className="control-btn"
                onTouchStart={handlePress(setForward)}
                onTouchEnd={handleRelease(setForward)}
              >
                ↑
              </button>
              <button
                className="control-btn"
                onTouchStart={handlePress(setBackward)}
                onTouchEnd={handleRelease(setBackward)}
              >
                ↓
              </button>
            </div>

            <div className="controls-row">
              <button
                className="control-btn"
                onTouchStart={handlePress(setLeft)}
                onTouchEnd={handleRelease(setLeft)}
              >
                ←
              </button>
              <button
                className="control-btn"
                onTouchStart={handlePress(setRight)}
                onTouchEnd={handleRelease(setRight)}
              >
                →
              </button>
            </div>
          </div>
        </>
      )}
      {/* <Clock /> */}
      <ToggledEditor />
      <ToggledFinished />
      {/* <Help /> */}
      {/* <Speed /> */}
      <ToggledStats />
      <ToggledCheckpoint />
      <LeaderBoard />
      <PickColor />
      <HideMouse />
      <Keyboard />
    </>
  )
}
