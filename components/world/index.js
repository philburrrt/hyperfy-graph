import React from 'react'
import Request from './Request'

export default function Main() {
  return (
    <environment>
      <hdr src="sky.hdr" />
      <background color={0x10141d} />
      <skysphere src="sky.png" encoding="srgb" />
      <Request />
      <climbing />
      <gliding />
      <flying />
      <rigidbody>
        <model src="world.glb" />
      </rigidbody>
      <spawn />
    </environment>
  )
}
