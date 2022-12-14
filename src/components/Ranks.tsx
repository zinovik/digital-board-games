import { useState } from 'react';

interface Props {
  date: string;
  update: () => Promise<void>;
}

export const Ranks = ({ date, update }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateClick = () => {
    setIsUpdating(true);
    update().finally(() => {
      setIsUpdating(false);
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
