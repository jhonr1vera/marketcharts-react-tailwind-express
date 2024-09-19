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
    footer: '<a href="/">Volver a la página principal</a>'
  });
}