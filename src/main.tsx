import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root.tsx';
import { useGLTF, useTexture } from '@react-three/drei'
import 'inter-ui'

import './index.scss';

const rootElement = document.getElementById('root')!;

useTexture.preload('/textures/heightmap_2048.png')
useGLTF.preload('/models/track-draco.glb')
useGLTF.preload('/models/chassis-draco.glb')
useGLTF.preload('/models/wheel-draco.glb')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
