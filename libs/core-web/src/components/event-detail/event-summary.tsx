import classes from './event-summary.module.css';

type Props = {
  title: string;
};

export function EventSummary(props: Props) {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}
