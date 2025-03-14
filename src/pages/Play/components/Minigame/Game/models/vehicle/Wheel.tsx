import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCompoundBody } from '@react-three/cannon'
import { useStore } from '../../store'
import type { CylinderProps } from '@react-three/cannon'
import type { Group, Mesh, MeshStandardMaterial } from 'three'
import type { GLTF } from 'three-stdlib'

interface WheelGLTF extends GLTF {
  nodes: {
    Scene: Group
    Wheel: Group
    Wheel_1: Mesh
    Wheel_2: Mesh
  }
  materials: {
    Car_emission: MeshStandardMaterial
    Car_texture: MeshStandardMaterial
  }
}

interface WheelProps extends CylinderProps {
  leftSide?: boolean
}

export const Wheel = forwardRef<Group, WheelProps>(({ leftSide, ...props }, ref) => {
  const { radius } = useStore((state) => state.wheelInfo)
  const { nodes, materials } = useGLTF('/models/wheel-draco.glb') as WheelGLTF
  const scale = (radius / 0.34) * 6

  useCompoundBody(
    () => ({
      mass: 50,
      type: 'Kinematic',
      material: 'wheel',
      collisionFilterGroup: 0,
      shapes: [{ args: [radius, radius, 0.5, 16], rotation: [0, 0, -Math.PI / 2], type: 'Cylinder' }],
      ...props,
    }),
    ref,
    [radius],
  )

  return (
    <group ref={ref} dispose={null} rotation={[0, Math.PI / 2, 0]}>
      <group scale={scale}>
        <group scale={leftSide ? -1 : 1}>
          <mesh castShadow geometry={nodes.Wheel_1.geometry} material={materials.Car_emission} />
          <mesh castShadow geometry={nodes.Wheel_2.geometry} material={materials.Car_texture} />
        </group>
      </group>
    </group>
  )
})
