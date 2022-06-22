import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import Script1 from "../ff9257ec-9d62-404f-97c7-cf19c4035761/src/item"
import * as utils from '@dcl/ecs-scene-utils'
import { hud } from 'dcl-builder-hud'


const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(_scene)
const gltfShape = new GLTFShape("6b33f46e-9667-45e5-bd90-85f372ee2490/CityTile.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity.addComponentOrReplace(transform2)

const lastSlicePizzaBox = new Entity('lastSlicePizzaBox')
engine.addEntity(lastSlicePizzaBox)
lastSlicePizzaBox.setParent(_scene)
const transform3 = new Transform({
  position: new Vector3(8.4, 0.03, 5.9),
  rotation: new Quaternion(0.2, 0.20526227355003357, 0.6766590476036072, 0.6766590476036072),
  scale: new Vector3(0.415, 0.25, 0.27)
})
lastSlicePizzaBox.addComponentOrReplace(transform3)
hud.attachToEntity(lastSlicePizzaBox)


const gltfShape2 = new GLTFShape("4d5ab1ac-99b6-4a4f-8317-4f3f8e8df33a/last_slice_pizza_box.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
lastSlicePizzaBox.addComponentOrReplace(gltfShape2)

const neatDRotating = new Entity('neatDRotating')
engine.addEntity(neatDRotating)
neatDRotating.setParent(_scene)
const transform4 = new Transform({
  position: new Vector3(13, 2.65, 3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2499998807907104, 1.25, 1.500000238418579)
})
neatDRotating.addComponentOrReplace(transform4)
hud.attachToEntity(neatDRotating)
const gltfShape3 = new GLTFShape("43b77ce0-07eb-493f-8c21-c091815984c7/NEAT_3D_rotating.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
neatDRotating.addComponentOrReplace(gltfShape3)

const neatDRotating2 = new Entity('neatDRotating2')
engine.addEntity(neatDRotating2)
neatDRotating2.setParent(_scene)
const transform6 = new Transform({
  position: new Vector3(3, 2.65, 3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.2499998807907104, 1.25, 1.500000238418579)
})
neatDRotating2.addComponentOrReplace(transform6)
hud.attachToEntity(neatDRotating2)
const gltfShape5 = new GLTFShape("43b77ce0-07eb-493f-8c21-c091815984c7/NEAT_3D_rotating.glb")
gltfShape5.withCollisions = true
gltfShape5.isPointerBlocker = true
gltfShape5.visible = true
neatDRotating2.addComponentOrReplace(gltfShape5)

const fantasyChest = new Entity('fantasyChest')
engine.addEntity(fantasyChest)
fantasyChest.setParent(_scene)
const transform5 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0,180,NaN),
  scale: new Vector3(1.000000238418579, 1, 1.000000238418579)
})
fantasyChest.addComponentOrReplace(transform5)
hud.attachToEntity(fantasyChest)

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }

const script1 = new Script1()
script1.init()
script1.spawn(fantasyChest, {"onClickText":"Open/Close","onClick":[{"entityName":"fantasyChest","actionId":"toggle","values":{}}]}, createChannel(channelId, fantasyChest, channelBus))

