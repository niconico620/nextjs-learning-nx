import classes from './event-content.module.css';

export function EventContent(props: any) {
  return <section className={classes.content}>{props.children}</section>;
}
