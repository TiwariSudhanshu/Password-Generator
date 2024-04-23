import { useCallback, useEffect, useState, useRef } from 'react';
import "./App.css"
function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()~?><|}{[]";

    for ( let i = 0; i<length; i++){
      let charInd = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(charInd);
    }

    setPassword(pass);

  }, [ length, numAllowed, charAllowed, setPassword]);
  
    const copyPasswordToClipboard = useCallback( ()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password);
    }, [password])

  useEffect(()=>{
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='main'>
        <h1>Password Generator</h1>
        <div className="inner">
          <input type="text" 
          value={password}
          className='pass-input'
          placeholder='password'
          readOnly
          ref = {passwordRef}
          />
          <button id='bt'
          onClick = {copyPasswordToClipboard}
          >Copy</button>
          <br />
          <input type= "range" 
          value = {length}
          min={8}
          max={50}
          id= 'length-range'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label htmlFor="length-range">Length : {length}</label>
          <input type="checkbox" id='numallow' 
          defaultChecked ={numAllowed}
          onChange= {()=>{
            setNumAllowed((prev)=> !prev);
          }}
          />
          <label htmlFor="numallow">Number</label>
          <input type="checkbox" id='charallow' 
          defaultChecked = {charAllowed}
          onChange= {()=>{
            setCharAllowed((prev)=> !prev);
          }}
          />
          <label htmlFor="charallow">Character</label>
        </div>
      </div>
    </>
  )
}

export default App
