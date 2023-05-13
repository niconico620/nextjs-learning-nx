import classes from './comment-list.module.css';

export function CommentList(props: any) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {items.map((item: any) => (
        <li key={item._id}>
          <p>{item.comment}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}
