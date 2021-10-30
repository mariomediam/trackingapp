import {Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PortadaView from './views/PortadaView'
import BuscarPedidoView from './views/BuscarPedidoView'
import VerPedidoRutaView from './views/VerPedidoRutaView'
import DistritosView from './views/DistritosView'
import ExistenciaView from './views/ExistenciaView'
import PedidosView from './views/PedidosView'
import Servicios from './views/ServiciosView'
import Contactos from './views/ContactosView'
import EstadisticaDistritosView from './views/EstadisticaDistritoView'
import EstadisticaProductosView from './views/EstadisticaProductoView'
import EstadisticaClienteView from './views/EstadisticaClienteView'




export default function Routes() {
    return (
        <div>
            <Route path="/" exact component={PortadaView} />
            <Route path="/Servicios" exact component={Servicios} />
            <Route path="/Contactos" exact component={Contactos} />
            <ProtectedRoute path="/BuscarPedido" exact component={BuscarPedidoView} />
            <Route path="/VerPedidoRutaView/:token" exact component={VerPedidoRutaView} />
            <ProtectedRoute path="/Distritos" exact component={DistritosView} />
            <ProtectedRoute path="/Stock" exact component={ExistenciaView} />
            <ProtectedRoute path="/Pedidos" exact component={PedidosView} />
            <ProtectedRoute path="/EstadisticaDistritos" exact component={EstadisticaDistritosView} />
            <ProtectedRoute path="/EstadisticaProductos" exact component={EstadisticaProductosView} />
            <ProtectedRoute path="/EstadisticaClientes" exact component={EstadisticaClienteView} />
            
            
        </div>
    )
}
