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

export const successLoad = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: `${message}`,
    showConfirmButton: false,
    timer: 1800,
    width: '300px', 
    padding: '10px'
  });
}

export const failedLoad = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: `${message}`,
    showConfirmButton: false,
    timer: 2800,
    width: '300px', 
    padding: '10px'
  });
}

export const errorGenerate = () => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Hubo un error al generar el informe",
  });
}