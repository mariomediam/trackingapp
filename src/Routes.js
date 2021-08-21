import {Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PortadaView from './views/PortadaView'
import BuscarPedidoView from './views/BuscarPedidoView'
import VerPedidoRutaView from './views/VerPedidoRutaView'



export default function Routes() {
    return (
        <div>
            <Route path="/" exact component={PortadaView} />
            <ProtectedRoute path="/BuscarPedido" exact component={BuscarPedidoView} />
            <Route path="/VerPedidoRutaView/:token" exact component={VerPedidoRutaView} />
            
        </div>
    )
}
