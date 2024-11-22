import Swal from 'sweetalert2'

export const noInfo = () => {
    Swal.fire({
        title: '¡Oops!',
        text: 'Parece que no hay información.',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
}

export const errorRequest = () => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "No hubo respuesta por parte del servidor.",
    footer: '<a href="/">Volver a la página de inicio</a>',
  });
}

export const successLoad = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Tabla cargada corectamente",
    showConfirmButton: false,
    timer: 2800,
    width: '300px', 
    padding: '10px'
  });
}

export const failedLoad = () => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: "Hubo un error al cargar la tabla",
    showConfirmButton: false,
    timer: 2800,
    width: '300px', 
    padding: '10px'
  });
}