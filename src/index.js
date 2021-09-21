import { render } from 'react-dom'
import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { useProgress, Html } from '@react-three/drei'
import { HashRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom'

import Clock from 'react-live-clock'

import Scene1 from './Scene1'
import Scene2 from './Scene2'
import Scene3 from './Scene3'

import './base.css'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <span style={{ color: '#FFFFFF' }}>{progress} % loaded</span>
    </Html>
  )
}

function App(props) {
  const { scene = 1 } = props
  return (
    <Canvas concurrent shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
      <color attach="background" args={['#000']} />
      <Suspense fallback={<Loader />}>
        <Scene1 />
      </Suspense>
      <ambientLight intensity={0.4} />
    </Canvas>
  )
}

function Body() {
  return (
    <Router>
      <main>
        <div className="frame">
          <div className="frame__title-wrap">
            <p className="frame__title">PARIS&nbsp;&nbsp;</p>
            <Clock
              format={'h:mm a'}
              ticking={true}
              timezone={'CET'}
              style={{ FontFace: 'NeueHaasGroteskDisplay' }}
            />
          </div>
          <div className="frame__links">
            <p className="frame__title">SYDNEY&nbsp;&nbsp;</p>
            <Clock
              format={'h:mm a'}
              ticking={true}
              timezone={'Australia/Sydney'}
              style={{ FontFace: 'NeueHaasGroteskDisplay' }}
            />
          </div>
          <div className="frame__bureau">DIAGONAL THINKERS</div>
          <div className="frame__demos">
            <a href="mailto:numero@noir.ooo">NUMERO@NOIR.OOO</a>
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route exact>
              <App scene={1} />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  )
}

render(<Body />, document.querySelector('#root'))
