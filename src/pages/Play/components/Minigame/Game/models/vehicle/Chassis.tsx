import debounce from 'lodash-es/debounce'
import clamp from 'lodash-es/clamp'
import { forwardRef, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { useBox } from '@react-three/cannon'
import { useGLTF, PositionalAudio } from '@react-three/drei'
import { Vector3 } from 'three'

import type { PropsWithChildren } from 'react'
import type { BoxProps } from '@react-three/cannon'
import type { GLTF } from 'three-stdlib'
// @ts-ignore
import type { BoxBufferGeometry, Group, MeshStandardMaterial, PositionalAudio as PositionalAudioImpl } from 'three'
import type { CollideEvent } from '@react-three/cannon'
import { Mesh } from 'three'

import { getState, setState, mutation, useStore } from '../../store'

interface ChassisGLTF extends GLTF {
  nodes: {
    Scene: Group
    Chassis: Group
    Chassis_1: Mesh
    Chassis_2: Mesh
    Chassis_3: Mesh
  }
  materials: {
    Car_Glass: MeshStandardMaterial
    Car_emission: MeshStandardMaterial
    Car_texture: MeshStandardMaterial
  }
}

type MaterialMesh = Mesh<BoxBufferGeometry, MeshStandardMaterial>

const gears = 10
const v = new Vector3()

export const Chassis = forwardRef<Group, PropsWithChildren<BoxProps>>(({ args = [2, 1.1, 4.7], mass = 500, children, ...props }, ref) => {
  const glass = useRef<MaterialMesh>(null)
  const brake = useRef<MaterialMesh>(null)
  const chassis_1 = useRef<MaterialMesh>(null)
  const crashAudio = useRef<PositionalAudioImpl>(null)
  const [maxSpeed] = useStore((s) => [s.vehicleConfig.maxSpeed])
  const { nodes: n, materials: m } = useGLTF('/models/chassis-draco.glb') as ChassisGLTF

  // Проверка загрузки модельки
  if (!n || !m) {
    console.error('Model nodes or materials are not loaded correctly')
    return null
  }

  useLayoutEffect(() => {
    if (m.Car_Glass) {
      m.Car_Glass.color.set('red'); // Устанавливаем красный цвет
      m.Car_Glass .emissive.set('red'); // Устанавливаем красный цвет для эмиссии
    }
  }, []);

  const onCollide = useCallback(
    debounce<(e: CollideEvent) => void>((e) => {
      if (e.body.userData.trigger || !getState().sound || !crashAudio.current) return
      crashAudio.current.setVolume(clamp(e.contact.impactVelocity / 10, 0.2, 1))
      if (!crashAudio.current.isPlaying) crashAudio.current.play()
    }, 200),
    [],
  )

  const [, api] = useBox(() => ({ mass, args, allowSleep: false, onCollide, ...props }), ref)

  useEffect(() => {
    setState({ api })
    return () => setState({ api: null })
  }, [api])

  useLayoutEffect(
    () =>
      api.velocity.subscribe((velocity) => {
        const speed = v.set(...velocity).length()
        const gearPosition = speed / (maxSpeed / gears)
        const rpmTarget = Math.max(((gearPosition % 1) + Math.log(gearPosition)) / 6, 0)
        Object.assign(mutation, { rpmTarget, speed, velocity })
      }),
    [maxSpeed],
  )

  // Фильтруем и возвращаем только узлы с геометрией типа Mesh
  const meshes = Object.entries(n).filter(
    ([, mesh]) => mesh instanceof Mesh && mesh.geometry
  ) as Array<[string, Mesh]>

  return (
    <group ref={ref} dispose={null}>
      <group position={[0, 0.1, -0.2]} rotation={[0, Math.PI, 0]}> {/* Настройка позиции и вращения */}
        {meshes.map(([key, mesh]) => {
          let material;
          if (mesh.name === 'Chassis_1') {
            material = m.Car_Glass; // Используем материал Car_Glass для Chassis_1
          } else if (mesh.name === 'Chassis_2') {
            material = m.Car_texture; // Используем материал Car_texture для Chassis_2
          } else if (mesh.name === 'Chassis_3') {
            material = m.Car_Glass; // Используем материал Car_emission для Chassis_3
          } else {
            material = m.Car_emission; // Можно указать материал по умолчанию
          }

          return (
            <mesh
              key={key}
              ref={mesh.name === 'Chassis_1' ? glass : mesh.name === 'Chassis_2' ? chassis_1 : brake}
              geometry={mesh.geometry}
              material={material}
              castShadow
              receiveShadow
            />
          )
        })}
      </group>
      {children}
      <PositionalAudio ref={crashAudio} url="/sounds/crash.mp3" loop={false} distance={5} />
    </group>
  )
})
