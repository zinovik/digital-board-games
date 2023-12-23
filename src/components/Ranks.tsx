interface Props {
  date: string;
}

export const Ranks = ({ date }: Props) => {
  return (
    <div style={{ padding: '0.2rem' }}>
      Ranks updated: {new Date(date).toLocaleString()}{' '}
    </div>
  );
};
