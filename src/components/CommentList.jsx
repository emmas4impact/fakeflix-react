import React from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { render } from "@testing-library/react";

class CommentList extends React.Component{
  state = {
    comments:[]
  }


  componentDidMount = async () => {
      const username = 'user24';
      const password = '48D4vaVh6Ra3DD8w';

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

        const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
        const comments = await fetch(commentsUrl + this.props.id, {
          headers: headers,
        }).then((response) => response.json());
        this.setState({ comments });
      
}


render (){
  return(
    this.state.comments.map((comment)=>(
      <ListGroup key={comment._id}>
       <ListGroup.Item>
         <Badge pill variant="info" className="mr-3">
           {comment.rate}
         </Badge>
         {comment.comment}
       </ListGroup.Item>
     </ListGroup>
    ))
  )
}

}

export default CommentList;