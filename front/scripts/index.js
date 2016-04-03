import React from 'react'
import ReactDOM from 'react-dom'

var SectionList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.id}><a href="">{item.title}</a></li>
    }
    return (
      <aside className="col-sm-2 col-md-2 sidebar">
        <ul className="nav nav-sidebar">
          {this.props.sections.map(createItem)}
        </ul>
      </aside>
    )
  },
})

const Sections = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      courseId: 0,
      sections: [],
      currentSection: 0,
    }
  },

  componentDidMount: function () {
    const self = this

    this.serverRequest = window.fetch('/courses/1/1')
      .then(function (res) {
        return res.text()
      })
      .then(function (body) {
        var bodyJson = JSON.parse(body)
        self.setState({
          username: bodyJson.username,
          courseId: bodyJson.courseId,
          sections: bodyJson.sections,
          currentSection: bodyJson.currentSection,
        })
      })
  },

  componentWillUnmount: function () {
    this.serverRequest.abort()
  },

  render: function () {
    return (
      <div className="row">
        <SectionList sections={this.state.sections} />
        <div className="col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 main">
          <h1 className="page-header">new course</h1>
          <p>New course with many stuff</p>
        </div>
        <div className="col-sm-2 col-md-2"></div>
      </div>
    )
  },
})

ReactDOM.render(<Sections />, document.getElementById('sectionView'))
