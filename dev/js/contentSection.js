//var ContentData = function(){
//  this.get = function() {
//    return this.data;
//  }
//}

var Content = require('../models/content.js');

$(document).ready(function() {
  React.render(
      React.createElement(ContentBox, {url: "api/content"}), //pollInterval={2000}
      document.getElementById('test-content')
      );
});

var ContentBox = React.createClass({displayName: 'ContentBox',
  loadContentFromServer: function() {
  	$.ajax({
  		url: this.props.url,
  		dataType: 'json',
  		success: function(data) {
  			this.setState({data: data});
  		}.bind(this),
  		error: function(xhr, status, err) {
  			console.error(this.props.url, status, err.toString());
  		}.bind(this)
  	});
  },
  getInitialState: function() {
  	return {data: [{id:"test",text:"test content"}]};
  }, 
  //componentDidMount: function() {
  //	this.loadContentFromServer();
  //	// setInterval(this.loadCommentsFromServer,this.props.pollInterval);
  //},
  render: function() {
    return (
        React.createElement(ContentWrapper, {data: this.state.data})

        //<div className="content-wrapper">
        //  <div id="center-content">
        //  </div>
        //  <div id="left-content">
        //  </div>
        //  <div id="right-content">
        //  </div>
        //</div>
        );
  }
});

//<h3>Comments</h3>
//<CommentForm onCommentSubmit={this.handleCommentSubmit} />
//<CommentList data={this.state.data} />

var ContentWrapper = React.createClass({displayName: 'ContentWrapper',
	render: function() {
		var contentNodes = this.props.data.map(function(content) {
			 return (
				React.createElement(Content, {identifier: content.id}, 
					content.text
				)	
			);
		});
		return (
		React.createElement("div", {className: "content-wrapper"}, contentNodes)
		);
	}
});
//
//var CommentForm = React.createClass({displayName: 'CommentForm',
// 	 handleSubmit: function(e) {
//    		e.preventDefault();
//    		var author = this.refs.author.getDOMNode().value.trim();
//    		var text = this.refs.text.getDOMNode().value.trim();
//    		if (!text || !author) {
//      			return;
//    		}
//			this.props.onCommentSubmit({author: author, text: text}); 
//        	this.refs.author.getDOMNode().value = '';
//        	this.refs.text.getDOMNode().value = '';
//    },
//	render: function() {
//		return (
//		<div className="commentForm">
//      		<form className="commentForm" onSubmit={this.handleSubmit}>
//        		<input type="text" placeholder="Your name" ref="author" />
//        		<input type="text" placeholder="Say something..." ref="text" />
//        		<input type="submit" value="Post" />
//      		</form>
//		</div>
//		);
//	}
//});

var Content = React.createClass({displayName: 'Content',
  render: function() { 
    return (
        React.createElement("div", {id: this.props.identifier}, 
          React.createElement("p", null, this.props.children.toString())
        )
        );
  }
});