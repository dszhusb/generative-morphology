import Markdown from 'react-markdown'

export default function Infobar({ text }) {
    return (
        <div className="bg-stone-200 h-full overflow-scroll p-8 pt-8">
            <Markdown>
                {text}
            </Markdown>
        </div>
    )
}