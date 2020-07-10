import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import UserInfo from "../index"
import SelectedUser from "../SelectedUser"

const UserRoutes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={UserInfo} />
        <Route path="/users/:id" exact component={SelectedUser} />
      </Switch>
    </BrowserRouter>
  )
}

export default UserRoutes