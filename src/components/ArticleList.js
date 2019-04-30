import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';

class ArticleList extends Component {

  constructor(props){
    super(props)

    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    axios.get(this.props.url_api).then(response => {
      this.setState({data : response.data})
      console.log(response.data)
    })
  }

  renderArticles() {
    return _.map(this.state.data.results, book => {
      return (
        <li className="list-group-item">
          <div className="row">
            <div className="col s3"/>
            <div className="col s6">
              <div className="card yellow darken-4">
                <div className="card-content white-text">
                  <span className="card-title">{book.title}.</span>
                    {book.abstract}<br/>
                </div>
                <div class="card-action">
                  <a href={book.url}>link to the Article</a>
                </div>
              </div>
            </div>
          </div>         
        </li>
      )
    })
  }

  render(){
    return (
      <div>
        <ul className="list-group">
          {this.renderArticles()}
        </ul>
      </div>
    )
  }
}

export default ArticleList