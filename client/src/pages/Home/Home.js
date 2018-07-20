import React, { Component } from "react";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import Jumbotron from '../../components/Jumbotron';
import SearchForm from '../../components/SearchForm';
import Results from '../../components/Results';
import ListItem from '../../components/ListItem';
import api from "../../utils/API";
import SavedArticles from '../../components/SavedArticles';


class Home extends Component {
  state = {
      query: "",
      begin: "",
      end: "",
      articles: [],
      results: [],
      error: "",
  };

  getSavedArticles = () => {
    api.getSavedArticles()
        .then((res) => {
            this.setState({ articles: res.data });
        });
}

  handleTopicChange = (event) => {
      this.setState({ query: event.target.value });
  }

  handleStartYearChange = (event) => {
      this.setState({ begin: event.target.value });
  }

  handleEndYearChange = (event) => {
      this.setState({ end: event.target.value });
  }

  handleSaveButton = id => {
      const article = this.state.articles.find(article => article._id === id);
      api.saveArticle(article).then(res => this.getSavedArticles());
  }
  
  handleFormSubmit = event => {
      event.preventDefault();
      api.getArticles(this.state.query, this.state.begin, this.state.end)
          .then((res) => {
              this.setState({ articles: res.data.response.docs });
          });

  };

  render() {
    return (
        <div>
            <Jumbotron />
            <div className="main-content-section">
                <Container style={{ marginTop: 30 }}>
                  <Row>
                      <Col size="md-12">
                          <SearchForm 
                              handleFormSubmit={this.handleFormSubmit}
                              handleTopicChange={this.handleTopicChange}
                              handleStartYearChange={this.handleStartYearChange}
                              handleEndYearChange={this.handleEndYearChange}/>
                      </Col>
                  </Row>

                  <Row>
                      <Col size="md-12">
                          <Results>
                              {this.state.articles.map(article => {
                                  return (
                                      <ListItem
                                          _id={article._id}
                                          key={article._id}
                                          title={article.headline.main}
                                          date={article.pub_date}
                                          url={article.web_url}
                                          snippet={article.snippet}
                                          handleSaveButton={this.handleSaveButton}
                                      />
                                  );
                              })}
                          </Results>
                      </Col>
                  </Row>
                  
                  <Row>
                    <Col size="md-12">
                      <SavedArticles />
                    </Col>
                  </Row>
                </Container>
            </div>
        </div>
    );
}
}

export default Home;



