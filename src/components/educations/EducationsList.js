import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Badge, Button, Table } from 'reactstrap'
import {Link} from 'react-router-dom'
import * as educationActions from '../../redux/actions/educationActions'

class EducationsList extends Component {

  componentDidMount() {
    this.props.actions.getEducations();
  }

  render() {
    return (
      <div>
        <h3><Badge color="primary">{this.props.currentCategory.name} Eğitimleri</Badge></h3>

        <Table
          hover
          responsive
        >
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Ders
              </th>
              <th>
                Açıklama
              </th>
              <th>

              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.educations.map(edu => (
              <tr key={edu.id}>
                <td>
                  {edu.id}
                </td>
                <td>
                  {edu.name}
                </td>
                <td>
                  {edu.desc}
                </td>
                <td>
                  <Link className='btn btn-warning' to="/lesson/web" >Derse Git</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    educations: state.educationListReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getEducations: bindActionCreators(educationActions.getEducations, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EducationsList)