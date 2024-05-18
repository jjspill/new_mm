import Image from 'next/image';
import styles from './styles.module.css';
import mountains from '/public/images/mountains1.jpg';

const BackgroundPage = () => (
  <div className="pt-16">
    <div className={styles.bgWrap}>
      <Image
        alt="Mountains"
        src={mountains}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
    <p className={styles.bgText}>
      Image Component
      <br />
      as a Background
    </p>
  </div>
);

export default BackgroundPage;
