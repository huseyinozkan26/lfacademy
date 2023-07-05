import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import * as categoryActions from '../../redux/actions/categoryActions'
import * as educationActions from '../../redux/actions/educationActions'


class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories()
  }
  selectCategory = (category) => {
    this.props.actions.changeCategory(category)
    this.props.actions.getEducations(category.id)
  }
  render() {
    return (
      <div>
        <ListGroup>
          {
            this.props.categories.map(category => (
              <ListGroupItem
                active={category.id === this.props.currentCategory.id}
                onClick={() => this.selectCategory(category)}
                key={category.id}>
                {category.name}
              </ListGroupItem>
            ))
          }

        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
      changeCategory: bindActionCreators(categoryActions.changeCategory, dispatch),
      getEducations: bindActionCreators(educationActions.getEducations, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);