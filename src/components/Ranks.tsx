import { useState } from 'react';

interface Props {
  date: string;
  update: () => Promise<void>;
  onUpdating: () => () => void;
}

export const Ranks = ({ date, update, onUpdating }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateClick = () => {
    const onUpdateEnd = onUpdating();
    setIsUpdating(true);
    update().finally(() => {
      setIsUpdating(false);
      onUpdateEnd();
    });
  };

  return (
    <div style={{ padding: '0.2rem' }}>
      Ranks updated: {new Date(date).toLocaleString()}{' '}
      <button onClick={handleUpdateClick} disabled={isUpdating}>
        {isUpdating
          ? 'Updating, please wait...'
          : 'Update ranks from boardgamegeek.com'}
      </button>
    </div>
  );
};
