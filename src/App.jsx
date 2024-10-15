import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Conversor from './conversor'

function App() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [logueado, setlogueado] = useState(false)

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }

  async function Ingresar() {
    const peticion = await fetch ('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave, {credentials:'include'})
    if (peticion.ok){
      setlogueado(true)
    } else {
      alert("Usuario o clave incorrectos")
    }

    // if (usuario == 'admin' && clave == 'admin'){
    // alert('Ingresaste')
    //  setlogueado(true)
    // } else {
    //  alert('Credenciales Incorrectas')
    // }
  }

  async function validar () {
    const peticion = await fetch ('http://localhost:3000/validar', {credentials:'include'})
    if (peticion.ok){
      setlogueado(true)
    }
  }

  useEffect(()=>{
    validar()
  }, [])


  if (logueado) {
    return <Conversor />
  }

  return (
    <>
    <h1>Inicio de Sesión</h1>
      <input placeholder="Usuario" type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario}/>
      <input placeholder="Contraseña" type="password" name="clave" id="clave" value={clave} onChange={cambiarClave}/>
      <button onClick={Ingresar}>Ingresar</button>
    </>
  )
}

export default App