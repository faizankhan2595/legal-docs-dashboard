import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { ADMIN_PREFIX_PATH } from 'configs/AppConfig'

export const AdminViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${ADMIN_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${ADMIN_PREFIX_PATH}/document-single/:id`} component={lazy(() => import(`./document-single`))} />
        <Route path={`${ADMIN_PREFIX_PATH}/document`} component={lazy(() => import(`./document`))} />
        <Route path={`${ADMIN_PREFIX_PATH}/users`} component={lazy(() => import(`./users`))} />
        <Route path={`${ADMIN_PREFIX_PATH}/profile`} component={lazy(() => import(`./profile`))} />
        <Redirect from={`${ADMIN_PREFIX_PATH}`} to={`${ADMIN_PREFIX_PATH}/home`} />
      </Switch> 
    </Suspense>
  ) 
}
 
export default React.memo(AdminViews); 