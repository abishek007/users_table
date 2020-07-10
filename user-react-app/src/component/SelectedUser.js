import React, { Component, Fragment } from "react"
import Container from "../container"
import "./styles.css"

class SelectedUser extends Component {
  state = {}

  componentDidMount() {
    const { getUserByIdRequest, match } = this.props
    const { id } = match.params
    getUserByIdRequest(id)
  }
  
  render() {
    const { selectedUserObj } = this.props
    const { name, address, company, phone, username, website, email } = selectedUserObj || {}
    const { street, suite, zipcode, city } = address || {}
    const { name: companyName, catchPhrase, bs } = company || {}

    return (
      <Fragment>
        <div className="selected-user-table">
        <p className="user-heading">User Information</p>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="data-bold">Name:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td className="data-bold">UserName:</td>
              <td>{username}</td>
            </tr>
            <tr>
              <td className="data-bold">Phone:</td>
              <td>{phone}</td>
            </tr>
            <tr>
              <td className="data-bold">Email:</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td className="data-bold" rowspan="4">Address:</td>
              <td><span className="data-bold">Street: </span>{street}</td>
            </tr>
            <tr>
              <td><span className="data-bold">Suite: </span>{suite}</td>
            </tr>
            <tr>
              <td><span className="data-bold">City: </span>{city}</td>
            </tr>
            <tr>
              <td><span className="data-bold">ZipCode: </span>{zipcode}</td>
            </tr>
            <tr>
              <td className="data-bold" rowspan="3">Company:</td>
              <td><span className="data-bold">Name: </span>{companyName}</td>
            </tr>
            <tr>
              <td><span className="data-bold">Catch Phrase: </span>{catchPhrase}</td>
            </tr>
            <tr>
              <td><span className="data-bold">bs: </span>{bs}</td>
            </tr>
            <tr>
              <td className="data-bold">Website:</td>
              <td>{website}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </Fragment>
    )
  }
}

export default Container(SelectedUser)