import { Link } from 'react-router-dom'
import { useState } from 'react'
const structure = require('./navigation.json')

export default function Topnav() {
    return (
        <nav className="flex flex-row items-center">
            <Categories structure={structure} />
            <Link className="mx-4 text-xl" to="About">About</Link>
        </nav>
    )
}

function Categories({ structure }) {
    return (
        Object.entries(structure).map(([key, value]) => {
            return (
                <Category key={key} k={key} v={value} />
            )
        })
    )
}

function Category({ k, v }) {
    const [clicked, setClick] = useState(false)
    return (
        <div key={k + "-category"} onClick={() => setClick(!clicked)} className="h-full items-center">
            <div className="flex flex-row w-fit items-center">
                <h2 className='mx-4'>{k}</h2>
                {clicked ?
                    <>
                        <div>|</div>
                        <ul className="flex flex-row mx-2">
                            {parseModels(v.models)}
                        </ul>
                    </>
                    : null}
            </div>
        </div>
    )
}

function parseModels(models) {
    return (
        Object.entries(models).map(([key, value]) => {
            return (
                <li key={key} className="mx-2 hover:text-stone-200">
                    <Link to={value}>{key}</Link>
                </li>
            )
        })
    )
}