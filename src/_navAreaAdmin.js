export default {
    items: [
      {
        name: 'Dashboard',
        url: '/area/admin/dashboard',
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
        name: 'Administrador',
        url: '/area/admin/perfil',
        icon: 'fa fa-building',
        children: [
          {
            name: 'Cambiar Password',
            url: '/area/admin/cambiarPassword',
            icon: 'fa fa-lock',
          }
        ]
      },
      {
        name: 'Ofertas Laborales',
        url: '/area/admin/ofertas',
        icon: 'fa fa-briefcase',
      },
      {
        name: 'Configuración',
        url: '/area/admin/configuracion',
        icon: 'fa fa-cog fa-spin',
      }
    ],
  };
  