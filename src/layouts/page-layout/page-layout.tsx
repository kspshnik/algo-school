import React from 'react';
import { Link } from 'react-router-dom';
import { ReturnButton } from '../../ui';
import styles from './page-layout.module.css';
import { PageLayoutProps } from '../../types/prop.types';

const PageLayout : React.FC<PageLayoutProps> = ({
  extraClass = '',
  title,
  children,
}) => (
  <main className={`${styles.content} ${extraClass}`}>
    <div className={styles.titleBox}>
      <h1 className={`text text_type_h2 text_color_h1 ${styles.title}`}>
        МБОУ АЛГОСОШ
      </h1>
      <span
        className={`text text_type_fibonacci text_color_secondary ${styles.subtitle}`}>
        им. Фибоначчи
      </span>
    </div>
    <div className={styles.contentCard}>
      <Link className={styles.link} to='/'>
        <ReturnButton extraClass={styles.returnButton} />
      </Link>
      <h3 className={`text text_type_h3 text_color_h3 ${styles.cardTitle}`}>
        {title}
      </h3>
      {children}
    </div>
    <p
      className={`text text_type_column text_color_input mt-14 ${styles.copyright}`}>
      © Сделано в Практикуме.
    </p>
  </main>
);

export default PageLayout;
