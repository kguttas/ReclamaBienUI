import React, { Suspense } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import { 
  webConfig
} from '../../GlobalConfig'
// routes config
import routes from '../../routes'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path={`*`} element={<Navigate to="/Error" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)