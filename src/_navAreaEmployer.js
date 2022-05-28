export default {
    items: [
      {
        name: 'Dashboard',
        url: '/area/empleador/dashboard',
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
        name: 'Empresa',
        url: '/area/empleador/empresa',
        icon: 'fa fa-building',
        children: [
          {
            name: 'Cambiar Password',
            url: '/area/empleador/cambiarPassword',
            icon: 'fa fa-lock',
          },
          {
            name: 'Perfil Empresa',
            url: '/area/empleador/perfilEmpresa',
            icon: 'fa fa-book',
          }
        ]
      },
      /*{
        name: 'Reclutadores',
        url: '/area/empleador/reclutadores',
        icon: 'fa fa-users',
        badge: {
          variant: 'danger',
          text: '🚧',
        },
        children: [
          {
            name: 'Gestionar',
            url: '/area/empleador/reclutadores/gestionar',
            icon: 'fa fa-user-plus',
            attributes: { disabled: true }
          },
          {
            name: 'Estadísticas',
            url: '/area/empleador/reclutadores/estadisticas',
            icon: 'fa fa-line-chart',
            attributes: { disabled: true }
          }
        ]
      },*/
      {
        name: 'Ofertas Laborales',
        url: '/area/empleador/ofertas',
        icon: 'fa fa-briefcase',
      },
      /*{
        name: 'Candidatos',
        url: '/area/empleador/candidatos',
        icon: 'fa fa-id-badge',
        badge: {
          variant: 'danger',
          text: '🚧',
        },
        children: [
          {
            name: 'Mis Búsquedas',
            url: '/area/empleador/candidatos/misBusquedas',
            icon: 'fa fa-search',
            attributes: { disabled: true }
          },
          {
            name: 'Preferidos',
            url: '/area/empleador/candidatos/preferidos',
            icon: 'fa fa-check',
            attributes: { disabled: true }
          }
        ]
      },*/
      /*{
        name: 'Configuración',
        url: '/area/empleador/configuracion',
        icon: 'fa fa-cog fa-spin',
      }*/
    ],
  };
  