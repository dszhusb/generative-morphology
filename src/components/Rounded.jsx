//Rounded Bounding Box Style

export default function Rounded({ children }) {
    return (
        <div className="border-solid border-1 border-stone-600 rounded-md shadow-lg shadow-stone-500 w-full h-full">
            {children}
        </div>
    )
}