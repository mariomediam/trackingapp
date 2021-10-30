import {Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PortadaView from './views/PortadaView'
import BuscarPedidoView from './views/BuscarPedidoView'
import VerPedidoRutaView from './views/VerPedidoRutaView'
import DistritosView from './views/DistritosView'
import ExistenciaView from './views/ExistenciaView'
import PedidosView from './views/PedidosView'
<<<<<<< HEAD
import EstadisticaDistritosView from './views/EstadisticaDistritoView'
import EstadisticaProductosView from './views/EstadisticaProductoView'
import EstadisticaClienteView from './views/EstadisticaClienteView'
=======
import Servicios from './views/ServiciosView'
>>>>>>> 015be15cc4507a6630327af90b4aa8973e8e562c




export default function Routes() {
    return (
        <div>
            <Route path="/" exact component={PortadaView} />
            <Route path="/Servicios" exact component={Servicios} />
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
