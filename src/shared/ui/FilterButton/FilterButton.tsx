import type { ReactNode } from 'react';
import styles from './FilterButton.module.css';

type Props = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function FilterButton({ active, onClick, children }: Props) {
  return (
    <button type="button" className={active ? styles.active : styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
