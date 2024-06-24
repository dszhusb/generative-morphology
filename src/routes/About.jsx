import Markdown from 'react-markdown'
import { useState, useEffect } from 'react'

import AboutText from '../markdown/About.md'

export default function About() {
    const [text, setText] = useState('')
    useEffect(() => {
        fetch(AboutText).then(res => res.text()).then(text => setText(text))
    })

    return (
        <div className="max-w-4xl mx-auto p-8 pt-8">
            <Markdown>
                {text}
            </Markdown>
        </div>
    )
}