import { Leva } from 'leva'
import { saveAs } from 'file-saver';
import { MeshExporter } from '../components/utilities/MeshExporter';
import Scene from '../components/Scene'
import Infobar from '../components/infobar/Infobar'

export default function Model({ mesh, text }) {
    const exporter = new MeshExporter()
    const options = { binary: true }

    function exportBlob() {
        let str = exporter.parse(mesh, options)
        let blob = new Blob([str], { type: 'text/plain' });
        saveAs( blob, 'shell.stl' );
    }
    return (
        <div className="flex flex-column md:flex-row w-screen">
            <div className="flex-1">
                <Scene>{mesh}</Scene>
            </div>
            <div className="flex-1 w-fill max-h-screen overflow-scroll">
                <Leva fill flat hideTitleBar />
                <button class="p-8" onClick={exportBlob}>Download STL (Experimental)</button>
                <Infobar text={text} />
            </div>
        </div>
    );
}