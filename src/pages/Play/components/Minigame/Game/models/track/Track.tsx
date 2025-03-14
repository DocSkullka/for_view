import { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';

import type { GLTF } from 'three-stdlib';
import type { Mesh, Material } from 'three';

import { levelLayer } from '../../store';

interface TrackGLTF extends GLTF {
  nodes: {
    [key: string]: Mesh | undefined;
  };
  materials: {
    [key: string]: Material | undefined;
  };
}

export function Track(): JSX.Element {
  const { nodes: n, materials: m } = useGLTF('/models/track-draco.glb') as TrackGLTF;

  // Применение слоев для рендера всех узлов
  useLayoutEffect(() => {
    Object.values(n).forEach((mesh) => {
      if (mesh) {
        mesh.layers.enable(levelLayer);
      }
    });
  }, []);

  // Вспомогательная функция для получения имени материала
  const getMaterialName = (material: Material | Material[]): string => {
    if (Array.isArray(material)) {
      return material[0]?.name || ''; // Если массив, берем имя первого материала
    }
    return material.name || ''; // Если одиночный материал
  };

  // Фильтруем и возвращаем только узлы с геометрией
  const meshes = Object.entries(n).filter(
    ([, mesh]) => mesh?.geometry
  ) as Array<[string, Mesh]>;

  return (
    <group dispose={null}>
      {meshes.map(([key, mesh]) => (
        <mesh
          key={key}
          geometry={mesh.geometry}
          material={m[getMaterialName(mesh.material)]}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
}
