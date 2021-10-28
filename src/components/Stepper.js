import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  editarPedidoRuta,
  obtenerPedidoRutaPorPedidoId,
} from "../services/pedidoRutaService";
import Swal from "sweetalert2"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function VerticalLinearStepper({ rutaSeleccionada, editable }) {
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState([]);
  //let steps = [];
  const [ruta, setRuta] = React.useState([]);

  //const controlStep = React.useRef();

  const handleNext = async (e) => {
    //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    try {
      let rutasTmp = [];
      let rutasSeleccionadasTmp = [];
      let pedidoRutaTmp = ruta[activeStep];
      pedidoRutaTmp.pedidoRuta_Recib = true;
      let fecha = new Date();
      
      pedidoRutaTmp.pedidoRuta_fecReal = fecha;
      await editarPedidoRuta(pedidoRutaTmp, pedidoRutaTmp.pedidoRuta_id);
      rutasTmp = await obtenerPedidoRutaPorPedidoId(pedidoRutaTmp.pedido_id);
      
      if (rutasTmp.length > 0) {
        rutasSeleccionadasTmp = rutasTmp.filter(
          (item) => item.almacen_id_origen === pedidoRutaTmp.almacen_id_origen
        );
      }
    
      setRuta(rutasSeleccionadasTmp);
      await Swal.fire({
        icon:'success',
        title:"Se grabo con exito",
        showConfirmButton:true,        
        confirmButtonText:'Aceptar'        
    })
    } catch (error) {
      
    }
  };
/*
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
*/
  function getSteps() {
    let pasos = [];
    let texto = "";
    let ultPaso = 0;
  try {
    ruta.forEach((element, i) => {
      texto = element.ruta_pasoTipo;
      let convertedDate = "";
      if (element.pedidoRuta_Recib) {
        convertedDate = new Date(element.pedidoRuta_fecReal)
          .toLocaleDateString("PE")
          .replaceAll("/", "-");
        texto = texto + " el " + convertedDate;
        ultPaso = i + 1;
      } else {
        convertedDate = new Date(element.pedidoRuta_fecEst)
          .toLocaleDateString("PE")
          .replaceAll("/", "-");
          texto = texto + ", fecha estimada: " + convertedDate;
      }

      pasos.push(texto);
    });
    
  } catch (error) {
    
  } finally {
    return [pasos, ultPaso];
  }

    
  }

  function getStepContent(step) {
    /*
    switch (step) {
      case 0:
        return `<h2>For each ad</h2> campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
    */
    return ruta[step].ruta_paso_desc;
  }

  React.useEffect(() => {
    try {
      setRuta(rutaSeleccionada);  
    } catch (error) {
      
    }
    
  }, [rutaSeleccionada]);

  React.useEffect(() => {
    let stepsTmp = getSteps();

    setSteps(stepsTmp[0]);
    try {
      /*if (stepsTmp[0].length -1 === stepsTmp[1]){
        stepsTmp[1]++
      }*/
      setActiveStep(stepsTmp[1]);
    } catch (error) {}
  },);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  {editable ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        handleNext(e);
                      }}
                      className={classes.button}
                      data-value={index}
                    >
                      {activeStep === steps.length - 1
                        ? "Finalizar entrega"
                        : "Siguente"}
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Pedido finalizado</Typography>
          {/*}
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
          */}
        </Paper>
      )}

    </div>
  );
}
