import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [partita, setPartita]= useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showForm, setShowForm]= useState(false);
  const [number, setNumber] = useState();
  const [risultato, setRisultato] = useState({});


  const InputHandle = (e) => {
    
    setNumber(e.target.value);
    console.log(number)
  }



  async function Send (){
    const response = await fetch(`http://localhost:8080/partita/${partita.id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        numero: number,
      }),
      
    });

    const r= await response.json();
    setRisultato(r)
  }




  async function start(){
    setLoading(true);

 

    const response = await fetch("http://localhost:8080/partita", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    }); 


    const r = await response.json();
    setPartita(r);
    setLoading(false);
    setShowForm(true);
  }



  return (
    <div className="App">

      <h1>Guess the number</h1>

      <button onClick={start}>Start New Game</button> 
      {showForm && 
      <div>
      <p><br/> <br/>
      Tentativi: {risultato.tentativi||partita.tentativi}</p>
      <p>Inserisci numero da 1 a 100
      <input type='number' onChange={InputHandle}  placeholder="Inserisci"></input>
      <button onClick= {Send}>Send</button>
      </p>
      </div>
      }
        {risultato.risultato === 0 && 
        <p>You guessed the number in {risultato.tentativi}</p>}
        {risultato.risultato === 1 && 
        <p>You are above the hidden number try again</p>}
        {risultato.risultato === -1 &&
        <p>You are below the hidden number try again</p>}




        {isLoading ? <p>Loading</p> :<><span>ID:</span> {partita.id}</> } 
    </div>
  );
}

export default App;
