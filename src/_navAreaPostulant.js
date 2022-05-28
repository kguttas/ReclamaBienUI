export default {
    items: [
      {
        name: 'Dashboard',
        url: '/area/postulante/dashboard',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
          text: 'RESUMEN',
        },
      },
      {
        title: true,
        name: 'Opciones',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Mi Cuenta',
        url: '/area/postulate/miCuenta',
        icon: 'fa fa-user',
        children: [
          {
            name: 'Cambiar Clave',
            url: '/area/postulante/cambiarPassword',
            icon: 'fa fa-lock',
          },
          {
            name: 'Datos Personales',
            url: '/area/postulante/perfil',
            icon: 'fa fa-address-card',
          }
        ]
      },
      {
        name: 'Mi CV',
        url: '/area/postulante/miCV',
        icon: 'fa fa-file-text',
      },
      {
        name: 'Ofertas',
        url: '/area/postulante/ofertas',
        icon: 'fa fa-briefcase',
      },
      {
        name: 'Postulaciones',
        url: '/area/postulante/postulaciones',
        icon: 'fa fa-check-square',
      },
     
     /* {
        name: 'Mis Búsquedas',
        url: '/area/postulante/busquedas',
        icon: 'fa fa-search',
      },
      {
        name: 'Configuración',
        url: '/area/postulante/configuracion',
        icon: 'fa fa-cog fa-spin',
      },*/
    ],
  };
  