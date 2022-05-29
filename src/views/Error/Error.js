import React from 'react'
import { useNavigate } from "react-router-dom"
import { webConfig }  from '../../GlobalConfig'

import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Error = () => {
    
    const navigate = useNavigate();

    const coursesPage = () => {
        navigate(`${webConfig.subFolderURL}/`);
    }

    return (
        <div className="bg-light d-flex flex-row align-items-center" >
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <div className="clearfix">
                            <h1 className="float-start display-3 me-4">404</h1>
                            <h4 className="pt-3">Oops! estás perdido.</h4>
                            <p className="text-medium-emphasis float-start">
                                La página que buscas no se encuentra.
                            </p>
                            </div>
                            <CInputGroup className="input-prepend">
                        
                            <CButton color="info" onClick={(e) => coursesPage()}>Ir al home</CButton>
                        </CInputGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Error