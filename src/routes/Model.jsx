import { Leva } from 'leva'
import Scene from '../components/Scene'
import Infobar from '../components/infobar/Infobar'

export default function Model({ mesh, text }) {
    return (
        <div className="flex flex-column md:flex-row w-screen">
            <div className="flex-1">
                <Scene>
                    {mesh}
                </Scene>
            </div>
            <div className="flex-1 w-fill max-h-screen overflow-scroll">
                <Leva fill flat hideTitleBar />
                <Infobar text={text} />
            </div>
        </div>
    );
}