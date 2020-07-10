import React, { Component, Fragment } from "react"
import Container from "../container"
import "./styles.css"

class UserInfo extends Component {
  state = {
    sortBy: "",
    sortedUserArr: [],
    sortedUserPageArr: [],
    rowPerPage: "Select",
    pageNo: 1,
    noOfPage: 1,
  }

  //Call the initial Api to get the User Data
  componentDidMount() {
    const { getUserInfoRequest } = this.props
    getUserInfoRequest()
  }
  
  handleSelectedUser = (id) => {
    const { history } = this.props
    history.push(`/users/${id}`)
  }

  // Sort by Name or Email
  handleSort = (event) => {
    const selectedRadioBtn = event.target.value
    const { userDataArr } = this.props 
    const { sortedUserArr } = this.state
    const tempUserArr = (sortedUserArr && sortedUserArr.length > 0) ? JSON.parse(JSON.stringify(sortedUserArr)) : JSON.parse(JSON.stringify(userDataArr))
    if (selectedRadioBtn === "sortByName") {
      tempUserArr.sort((a, b) => {
        const nameOne = a.name.toUpperCase()
        const nameTwo = b.name.toUpperCase()
        let comparison = 0
        if (nameOne > nameTwo) {
          comparison = 1
        } else if (nameOne < nameTwo) {
          comparison = -1
        }
        return comparison
      })
    } else if (selectedRadioBtn === "sortByEmail") {
      tempUserArr.sort((a, b) => {
        const emailOne = a.email.toUpperCase()
        const emailTwo = b.email.toUpperCase()
        let comparison = 0
        if (emailOne > emailTwo) {
          comparison = 1
        } else if (emailOne < emailTwo) {
          comparison = -1
        }
        return comparison
      })
    }
    this.setState({
      sortBy: event.target.value,
      sortedUserArr: tempUserArr,
      sortedUserPageArr: tempUserArr
    })
  }

  handleArrayValue = (userDataArr, sortedUserArr) => {
    let temp = []
    if (sortedUserArr && sortedUserArr.length > 0) {
      temp =  sortedUserArr
    } else if (userDataArr && userDataArr.length > 0) {
      temp = userDataArr
    }
    return temp
  }

  // Delete the Selected Element
  handleDelete = (userData, id) => {
    const updatedUserData = JSON.parse(JSON.stringify(userData))
    this.setState({ sortedUserArr: updatedUserData.filter((element) => element.id !== id) })
  }

  // Function to handle the No of Row Per Page
  handleRowPerPage = (event, userData) => {
    const eventValue = event.target.value
    const { userDataArr } = this.props
    const totalLength = userDataArr.length
    const pageCount = Math.ceil(totalLength/eventValue)
    const emptyUserData = []
    
    for (let index = 0; index < eventValue; index += 1) {
      emptyUserData.push(userDataArr[index])
    }

    this.setState({
      rowPerPage: eventValue,
      noOfPage: pageCount,
      pageNo: 1,
      sortedUserArr: emptyUserData
    })
  }

  // Function to handle the Selected Page Number
  handlePageNo = (page) => {
    const { rowPerPage } = this.state
    const { userDataArr, sortedUserPageArr } = this.props
    const startIndex = (rowPerPage * page) - rowPerPage
    const emptyUserData = []
    const updatedUserData = (sortedUserPageArr && sortedUserPageArr.length > 0) ? sortedUserPageArr : userDataArr
    const endIndex = (userDataArr && userDataArr.length < rowPerPage * page) ? userDataArr.length : rowPerPage * page
    for (let index = startIndex; index < endIndex; index += 1) {
      emptyUserData.push(updatedUserData[index])
    }
    this.setState({ sortedUserArr: emptyUserData, pageNo: page, sortBy: "" })
  }

  render() {
    const { userDataArr } = this.props
    const { sortBy, sortedUserArr, rowPerPage, noOfPage, pageNo } = this.state
    const userArrayValue = this.handleArrayValue(userDataArr, sortedUserArr)

    return (
      <Fragment>
      <div className="container">
        <p className="main-heading">User Details</p>
        <div className="radio-container">
          <select
            className="drop-down-wrapper" 
            value={rowPerPage} 
            onChange={(event) => this.handleRowPerPage(event, userArrayValue)} 
          >
            <option value="Select">Select</option>
            {userDataArr && userDataArr.map((element, index) => (
               <option value={index + 1} key={element.email}>{index + 1}</option>
            ))}
          </select>
          <span className="radio-text">Row Per Page</span>
          <div className="radio-wrapper">
            <input type="radio" value="sortByName" checked={(sortBy === "sortByName")} onChange={this.handleSort}/>
            <span className="radio-text">Sort By Name</span>
          </div>
          <div className="radio-wrapper">
            <input type="radio" value="sortByEmail" checked={(sortBy === "sortByEmail")} onChange={this.handleSort}/>
            <span className="radio-text">Sort By Email</span>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>UserName</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Company</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userArrayValue && userArrayValue.length > 0 && userArrayValue.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td className="address-sec">
                  <div className="address-container">
                    <div className="address-item">Street: </div>
                    <div className="text-left">{user.address.street}</div>
                  </div>
                  <div className="address-container">
                    <div className="address-item">Suite: </div>
                    <div className="text-left">{user.address.suite}</div>
                  </div>
                  <div className="address-container">
                    <div className="address-item">City: </div>
                    <div className="text-left">{user.address.city}</div>
                  </div>
                  <div className="address-container">
                    <div className="address-item">Zipcode: </div>
                    <div className="text-left">{user.address.zipcode}</div>
                  </div>
                </td>
                <td className="company-sec">
                  <div className="address-container">
                    <div className="address-item">Name: </div>
                    <div className="text-left">{user.company.name}</div>
                  </div>
                  <div className="address-container">
                    <div className="address-item text-left">Catchphrase: </div>
                    <div className="text-left">{user.company.catchPhrase}</div>
                  </div>
                  <div className="address-container">
                    <div className="address-item">bs: </div>
                    <div className="text-left">{user.company.bs}</div>
                  </div>
                </td>
                <td>{user.website}</td>
                <td className="button-sec">
                  <button className="open-btn" onClick={() => this.handleSelectedUser(user.id)}>OPEN</button>
                  <button className="delete-btn" onClick={() => this.handleDelete(userArrayValue, user.id)}>DELETE</button>
                </td>
              </tr>
            ))}
            
          </tbody>
          </table>
      </div>
      <div>
        {<ul className="pagination">
          <li className="page-link prev-button">Prev</li>
          {Array(noOfPage).fill(1).map((element, index) => (
            <li
              key={(index + 1).toString()}
              className={`page-link ${(index + 1 === pageNo) ? "selected-page" : ""}`}
              onClick={() => this.handlePageNo(index + 1)}
            >
              { index + 1 }
            </li>
          ))}
          <li className="page-link next-button">Next</li>
          </ul>}
      </div>
      </Fragment>
    )
  }
}

export default Container(UserInfo)