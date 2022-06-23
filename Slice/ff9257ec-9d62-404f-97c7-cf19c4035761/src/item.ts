import { ApeShit } from "src/data"
import { SmokeSource, ThrowSmoke } from '../../src/modules/smokeSource'
import { SmokeSystem } from '../../src/modules/smoke'
import { smokeSpawner } from '../../src/modules/smokeSource'


export type Props = {
  onClick?: Actions
  onOpen?: Actions
  onClose?: Actions
  onClickText?: string
}

export default class Button implements IScript<Props> {
  openClip = new AudioClip('ff9257ec-9d62-404f-97c7-cf19c4035761/sounds/open.mp3')
  closeClip = new AudioClip('ff9257ec-9d62-404f-97c7-cf19c4035761/sounds/close.mp3')
  active: Record<string, boolean> = {}

  init() {}

  toggle(entity: Entity, value: boolean, playSound = true) {
    if (this.active[entity.name] === value) return

    if (playSound) {
      const source = new AudioSource(value ? this.openClip : this.closeClip )
      entity.addComponentOrReplace(source)
      source.playing = true
    }

    const animator = entity.getComponent(Animator)
    const openClip = animator.getClip('open')
    const closeClip = animator.getClip('close')
    openClip.stop()
    closeClip.stop()
    const clip = value ? openClip : closeClip
    clip.play()

    this.active[entity.name] = value
  }

  spawn(host: Entity, props: Props, channel: IChannel) {
    const door = new Entity(host.name + '-button')
    door.setParent(host)

    const animator = new Animator()
    const closeClip = new AnimationState('close', { looping: false })
    const openClip = new AnimationState('open', { looping: false })
    animator.addClip(closeClip)
    animator.addClip(openClip)
    door.addComponent(animator)
    openClip.stop()

    door.addComponent(new GLTFShape('ff9257ec-9d62-404f-97c7-cf19c4035761/models/Chest_Fantasy.glb'))
 
//ADDING SMOKE SOURCE
door.addComponent(new SmokeSource(0.4))
engine.addEntity(door)

    
    door.addComponent(
      new OnPointerDown(
        () => {
          channel.sendActions(props.onClick)
          engine.addSystem(new ThrowSmoke())
          engine.addSystem(new SmokeSystem())
        },        
        {
          button: ActionButton.POINTER,
          hoverText: 'Gold "Bars"',
          distance: 6
        }
      )
    )

    this.active[door.name] = false

    // handle actions
    channel.handleAction('open', ({ sender }) => {

      if (!this.active[door.name]) {
        this.toggle(door, true)
      }      

      if (sender === channel.id) {

          channel.sendActions(props.onOpen)

      }    
    })

    channel.handleAction('close', ({ sender }) => {
      if (this.active[door.name]) {
        
        this.toggle(door, false)

      }
      if (sender === channel.id) {
        channel.sendActions(props.onClose)
        //smoke
      }
    })

    channel.handleAction('toggle', ({ sender }) => {
      const newValue = !this.active[door.name]
      this.toggle(door, newValue)
      // engine.removeSystem(new ThrowSmoke())
      // engine.removeSystem(new SmokeSystem())
      // smokeSpawner.MAX_POOL_SIZE = 0

      if (sender === channel.id) {
        channel.sendActions(newValue ? props.onOpen : props.onClose)
      }
    })

    // sync initial values
    channel.request<boolean>('isOpen', isOpen =>
      this.toggle(door, isOpen, false)
    )
    channel.reply<boolean>('isOpen', () => this.active[door.name])
  }
}
