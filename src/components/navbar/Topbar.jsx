import Topnav from './Topnav'

export default function Topbar() {
    return (
        <div className="w-full flex-none z-50 bg-stone-400">
            <div className="max-w-8xl">
                <div className="relative flex flex-column md:flex-row items-center px-6 py-4">
                    <h1>Generative Organic Forms</h1>
                    <div className="relative flex ml-auto items-center">
                        <Topnav />
                    </div>
                </div>
            </div>
        </div>
    )
}