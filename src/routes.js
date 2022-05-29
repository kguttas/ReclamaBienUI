import React from 'react';

import { 
  urlRecoveryPassword,
  urlChangePassword 
} from './GlobalConfig';

const Principal = React.lazy(() => 

	new Promise(resolve =>{
		
		setTimeout(() => {
			resolve(import('./views/Home/Content/Principal'))
		}, 0);
		
	})

);

const Error = React.lazy(() => import('./views/Error/Error'));

const ExperimentA = React.lazy(() => import('./views/Experiments/ExperimentA'));

// const CampaignCovid190001 = React.lazy(() => import('./views/Home/CaptureCampaign/Campaign-Covid19-0001'));

// const ValidateEmail = React.lazy(() => import('./views/ValidateEmail/ValidateEmail'));

// //const Register = React.lazy(() => import('./views/Home/Content/Register'));
// const DashboardPostulant = React.lazy(() => import('./views/Postulant/Dashboard'));
// const DashboardEmployer = React.lazy(() => import('./views/Employer/Dashboard'));
// const ChangePasswordPostulant = React.lazy(() => import('./views/Postulant/ChangePassword'));
// const PostulantProfile = React.lazy(() => import('./views/Postulant/PostulantProfile'));
// const ManagerCV = React.lazy(() => import('./views/Postulant/ManagerCV'));
// const JobOfferApplication = React.lazy(() => import('./views/Postulant/JobOfferApplication'));
// const JobApplication = React.lazy(() => import('./views/Postulant/jobApplications'));

// const RecoveryPassword= React.lazy(() => import('./views/RecoveryPassword/RecoveryPassword'));
// const ChangePassword= React.lazy(() => import('./views/Home/Content/ChangePassword'));
// const RegisterPostulant = React.lazy(() => import('./views/Home/Content/RegisterPostulant'));
// const RegisterEmployer = React.lazy(() => import('./views/Home/Content/RegisterEmployer'));
// const ChangePasswordEmployer = React.lazy(() => import('./views/Employer/ChangePassword'));
// const CompanyProfile = React.lazy(() => import('./views/Employer/CompanyProfile'));
// const ManagerJobs = React.lazy(() => import('./views/Employer/ManagerJobs'));
// const CreaterJobOffer = React.lazy(() => import('./views/Employer/CreaterJobOffer'));
// const JobApplicationEmployer = React.lazy(() => import('./views/Employer/jobApplications'));
// const JobOffer = React.lazy(() => import('./views/Home/Content/JobOffer'));
// const JobsOffers = React.lazy(() => import('./views/Home/Content/JobsOffers'));
// // Admin
// const DashboardAdmin = React.lazy(() => import('./views/Admin/Dashboard'));
// const ChangePasswordAdmin = React.lazy(() => import('./views/Admin/ChangePassword'));
// const ManagerJobsAdmin = React.lazy(() => import('./views/Admin/ManagerJobs'));
// const EditJobOfferAdmin = React.lazy(() => import('./views/Admin/CreaterJobOffer'));
// const JobApplicationAdmin = React.lazy(() => import('./views/Admin/jobApplications'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config 
const routes = [
  { path: '/', exact: true, layout: ['home'], name: 'Home', element: Principal },
  { path: '/ExperimentoA', exact: true, layout: ['home'], name: 'ExperimentA', element: ExperimentA },
  { path: '*', exact: true, layout: ['error'],  name: 'Home', element: Error },
  // { path: '/lecturas/Como-Encontrar-Trabajo-por-Internet', exact: true, layout: ['home'],  name: 'Como Encontrar Empleo Durante la Pandemia Covid19', component: CampaignCovid190001 }, 
  // { path: '/buscador/oferta/:idJobOffer', exact: true, layout:['home'], name: 'Oferta de Trabajo', component:JobOffer},
  // { path: '/buscador', exact: true, layout:['home'], name: 'Buscador', component:JobsOffers},
  // { path: '/validarEmail', exact: true, layout: ['home'], name: 'Validar Email', component: ValidateEmail },
  // { path: urlRecoveryPassword, exact: true, layout: ['home'], name: 'Recuperar Password', component: RecoveryPassword },
  // { path: urlChangePassword, exact: true, layout: ['home'], name: 'Cambiar Password', component: ChangePassword },
  // { path: '/registrarse/postulante', exact: true, layout: ['home'], name: 'Registro de Postulante', component: RegisterPostulant },
  // { path: '/registrarse/empleador', exact: true, layout: ['home'], name: 'Registro de Empleador', component: RegisterEmployer },
  // { path: '/area/postulante/dashboard', exact: true, layout: ['DefaultLayoutPostulant'], name: 'Dashboard Postulante', component: DashboardPostulant },
  // { path: '/area/empleador/dashboard', exact: true, layout: ['DefaultLayoutEmployer'], name: 'Dashboard Empleador', component: DashboardEmployer },
  // { path: '/area/empleador/cambiarPassword', exact: true, layout:['DefaultLayoutEmployer'], name: 'Cambiar Password', component:ChangePasswordEmployer},
  // { path: '/area/empleador/perfilEmpresa', exact: true, layout:['DefaultLayoutEmployer'], name: 'Perfil Empresa', component:CompanyProfile},
  // { path: '/area/empleador/ofertas', exact: true, layout:['DefaultLayoutEmployer'], name: 'Ofertas Laborales', component:ManagerJobs},
  // { path: '/area/empleador/ofertas/postulaciones/:idJobOffer', exact: true, layout:['DefaultLayoutEmployer'], name: 'Postulaciones', component:JobApplicationEmployer},
  // { path: '/area/empleador/ofertas/crearOferta/:idJobOffer', exact: true, layout:['DefaultLayoutEmployer'], name: 'Crear Oferta', component:CreaterJobOffer},
  // { path: '/area/postulante/cambiarPassword', exact: true, layout:['DefaultLayoutPostulant'], name: 'Cambiar Password', component: ChangePasswordPostulant},
  // { path: '/area/postulante/perfil', exact: true, layout:['DefaultLayoutPostulant'], name: 'Perfil Postulante', component: PostulantProfile},
  // { path: '/area/postulante/miCV', exact: true, layout:['DefaultLayoutPostulant'], name: 'Mi Currículum', component: ManagerCV},
  // { path: '/area/postulante/ofertas', exact: true, layout:['DefaultLayoutPostulant'], name: 'Ofertas de Empleos', component: JobsOffers, params: {pageSize: 10  , urlViewJobOffer: "/area/postulante/ofertas/"}},
  // { path: '/area/postulante/ofertas/:idJobOffer', exact: true, layout:['DefaultLayoutPostulant'], name: 'Oferta de Empleo', component: JobOffer},
  // { path: '/area/postulante/ofertas/:idJobOffer/postular/', exact: true, layout: ['DefaultLayoutPostulant'], name: 'Postulación a la Oferta de Empleo', component: JobOfferApplication },
  // { path: '/area/postulante/postulaciones', exact: true, layout: ['DefaultLayoutPostulant'], name: 'Postulaciones a Ofertas de Empleo', component: JobApplication },
  // // Admin
  // { path: '/area/admin/dashboard', exact: true, layout: ['DefaultLayoutAdmin'], name: 'Dashboard Administrador', component: DashboardAdmin },
  // { path: '/area/admin/cambiarPassword', exact: true, layout:['DefaultLayoutAdmin'], name: 'Cambiar Password', component:ChangePasswordAdmin},
  // { path: '/area/admin/ofertas', exact: true, layout:['DefaultLayoutAdmin'], name: 'Ofertas Laborales', component:ManagerJobsAdmin},
  // { path: '/area/admin/ofertas/editarOferta/:idJobOffer', exact: true, layout:['DefaultLayoutAdmin'], name: 'Editar Ofertas Laborales', component:EditJobOfferAdmin},
  // { path: '/area/admin/ofertas/postulaciones/:idJobOffer', exact: true, layout:['DefaultLayoutAdmin'], name: 'Postulaciones', component:JobApplicationAdmin},
];

export default routes;
