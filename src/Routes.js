import {Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PortadaView from './views/PortadaView'
import BuscarPedidoView from './views/BuscarPedidoView'
import VerPedidoRutaView from './views/VerPedidoRutaView'
import DistritosView from './views/DistritosView'
import ExistenciaView from './views/ExistenciaView'




export default function Routes() {
    return (
        <div>
            <Route path="/" exact component={PortadaView} />
            <ProtectedRoute path="/BuscarPedido" exact component={BuscarPedidoView} />
            <Route path="/VerPedidoRutaView/:token" exact component={VerPedidoRutaView} />
            <ProtectedRoute path="/Distritos" exact component={DistritosView} />
            <ProtectedRoute path="/Stock" exact component={ExistenciaView} />
            
        </div>
    )
}
