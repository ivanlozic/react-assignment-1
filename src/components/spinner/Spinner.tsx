import HelloComponent from '../hoc/helloComponent/HelloComponent';
import { Oval } from 'react-loader-spinner';
import styles from './Spinner.module.scss';
import { ovalSpinner } from '../../constants/constants';

const Spinner = (): JSX.Element => {
  return (
    <div className={styles.spinnerWrapper}>
      <Oval
        height={ovalSpinner.height}
        width={ovalSpinner.width}
        color={ovalSpinner.color}
        visible
        ariaLabel={ovalSpinner.ariaLabel}
        secondaryColor={ovalSpinner.secondaryColor}
        strokeWidth={ovalSpinner.strokeWidth}
        strokeWidthSecondary={ovalSpinner.strokeWidthSecondary}
      />
    </div>
  );
};

export default HelloComponent(Spinner);
