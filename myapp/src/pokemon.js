import { useState } from "react"

export function Pokemon() {
    const [input, setInput] = useState("")
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [moreinfo, setmoreinfo] = useState(false)
    const [disabled, setDisabled] = useState(true)
     async function fetchpokemon() {
        try {
        const response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
        const json = await response.json()
        setData(json)
        setError("")
        console.log(data)
        setInput("") } catch(error) {
            setError("errore, riprova con un altro pokemon")
            setData([])
        }
    }
    function HandleInput(event) {
        setInput(event.target.value)
    }
    function HandleMoreInfo() {
        setmoreinfo(true)
    }
    
        <div>
            <input 
            value={input}
            placeholder="insert your pokemon"
            onChange={HandleInput}
            />
            <button onClick={fetchpokemon}>submit</button>
            {data && <p>{data.species?.name}</p>}
            {data && <p>{data.base_experience}</p>}
            {data.sprites && <img src={data.sprites?.front_default} alt={`Sprite ${data.species?.name}`}/>}
            <ul>
                {data.abilities && data.abilities.map(element => <li>{element.ability.name}</li>)}
            </ul>
            <button onClick={HandleMoreInfo} disabled={disabled}>More info</button>
            {moreinfo && <p>{data.types[0]?.type?.name} </p>}
            {error && <p>{error}</p>}
        </div>
    )
}