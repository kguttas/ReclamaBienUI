import cookie from 'react-cookies';

export const webConfig = {
    //domain: "localhost:3000",
    domain: "nempleos.cl",
    cookieNameAuth: "auth",
    siteName: "N Empleos",
    contactEmail: "contacto@nempleos.cl",
    supportEmail: "soporte@nempleos.cl",
    subFolderURL: "",

    // LOCAL
    //urlBaseAPI:        "https://localhost:44348",
    //urlImages:         "https://localhost:44348/api/Files/images",
    //urlImagesNotCache: "https://localhost:44348/api/Files/imagesNotCache",

    // PUBLIC
    //urlBaseAPI:        "https://api.nempleos.com",
    //urlImages:         "https://api.nempleos.com/api/Files/images",
    //urlImagesNotCache: "https://api.nempleos.com/api/Files/imagesNotCache",

    utcOffset: -5,

    // SEO
    title: "Portal de Empleos para Informáticos | N EMPLEOS",
    description: "N Empleos es un portal de empleos para informáticos que gracias a su algoritmo realiza un MATCH perfecto entre postulantes y ofertas de empleos para informáticos.",
    imageURL: "https://nempleos.cl/logo.png",
    url: "https://nempleos.cl",
}


if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    webConfig.urlBaseAPI = "https://localhost:7033";
    webConfig.urlImages = "https://localhost:44348/api/Files/images";
    webConfig.urlImagesNotCache = "https://localhost:44348/api/Files/imagesNotCache";
    console.log("DEVELOPMENT");

} else {
    // production code
    webConfig.urlBaseAPI = "https://cvautoscreening.tech/ReclamaBienApi";
    webConfig.urlImages = "https://cvautoscreening.tech/NEmpleosAPI/Files/images";
    webConfig.urlImagesNotCache = "https://cvautoscreening.tech/NEmpleosAPI/api/Files/imagesNotCache";
    webConfig.subFolderURL = "/ReclamaBienUI";
    console.log("PRODUCTION");
}

export let stateSite = {
    isAuthenticate: false,
    setLoading: false,
    percentageUpload: null,
    dataEmployer: null,
    postulant:null
}

export function GetToken(){
    return cookie.load(webConfig.cookieNameAuth);
}

export const urlAreaPortulant = "/area/postulante/dashboard";
export const urlAreaEmployer = "/area/empleador/dashboard";
export const urlAreaAdmin = "/area/admin/dashboard";
export const urlLoginPostulant = "/login/postulante";
export const urlLoginEmployer = "/login/empleador";
export const urlLoginAdmin = "/login/administrador";
export const urlRecoveryPassword = "/recuperarPassword";
export const urlChangePassword = "/cambiarPassword";

export const token = ""; // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlVzZXJ0ZXN0MkBtYWlsLmNvbSIsImVtYWlsIjoiVXNlcnRlc3QyQG1haWwuY29tIiwicm9sZSI6IlBvc3R1bGFudCIsIm5iZiI6MTU0Njk3NjcwOSwiZXhwIjoxNTQ3NTgxNTA5LCJpYXQiOjE1NDY5NzY3MDksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzQ3IiwiYXVkIjoiUG9ydGFsRW1wbGVvQVBJIn0.7yGLC2dbZcVdPdT1fP4ls3Z8C6vNxZI_Os_F0y_IQq4";
