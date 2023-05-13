import { useEffect, useState } from 'react';

import { CommentList } from './comment-list';
import { NewComment } from './new-comment';
import classes from './comments.module.css';

export function Comments(props: any) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentItems, setCommentItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setCommentItems(data.comments);
          setIsLoading(false);
        });
    }
  }, [eventId, showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: any) {
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setCommentItems([...commentItems, data.addedComment]));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {isLoading && <p>Loading...</p>}
      {showComments && commentItems.length !== 0 && (
        <CommentList items={commentItems} />
      )}
    </section>
  );
}

export default Comments;
