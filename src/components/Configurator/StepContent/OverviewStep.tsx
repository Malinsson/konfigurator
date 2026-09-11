import { useWatchConfig } from '../../../context/WatchConfigContext';
import { BAND_OPTIONS, DIAL_COLOR_OPTIONS, DIAL_DETAILS_OPTIONS } from '../types';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import styles from './OverviewStep.module.css';

/**
 * OverviewStep Component
 *
 * Final step of the watch configurator.
 * Displays a summary of all user selections and allows them to add to cart.
 *
 * Shows:
 * - Selected band material and color
 * - Selected dial color
 * - Selected dial details (index and background)
 * - Total price
 */

export default function OverviewStep() {
  const { selections } = useWatchConfig();

  // Get labels for selections
  const bandMaterialLabel = BAND_OPTIONS.options.find(
    (opt) => opt.id === selections.band.category
  )?.label;

  const bandColorLabel = selections.band.category
    ? BAND_OPTIONS.subOptions?.[selections.band.category]?.find(
        (opt) => opt.id === selections.band.type
      )?.label
    : null;

  const dialColorLabel = DIAL_COLOR_OPTIONS.find(
    (opt) => opt.id === selections.dialColor
  )?.label;

  const dialBackgroundLabel = DIAL_DETAILS_OPTIONS.background.find(
    (opt) => opt.id === selections.dialDetails?.background
  )?.label;

  const indexYesNo = selections.dialDetails?.index === 'with' ? 'Yes' : 'No';

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.overviewSection}>
            <div className={styles.header}>
            <h1>Your Configuration Overview</h1>
            </div>

            {/* Strap Section */}
            <div className={styles.optionsSection}>
            <h2>1. Strap</h2>
            <div className={styles.sectionContent}>
                <p>
                Material: {bandMaterialLabel || '—'}
                </p>
                <p>
                Color: {bandColorLabel || '—'}
                </p>
            </div>
            </div>

            {/* Dial Color Section */}
            <div className={styles.optionsSection}>
            <h2>2. Dial Color</h2>
            <div className={styles.sectionContent}>
                <p>
                Color: {dialColorLabel || '—'}
                </p>
            </div>
            </div>

            {/* Dial Style & Details Section */}
            <div className={styles.optionsSection}>
            <h2>3. Dial Style & Details</h2>
            <div className={styles.sectionContent}>
                <p>
                Index: {indexYesNo}
                </p>
                <p>
                Color: {dialBackgroundLabel || '—'}
                </p>
            </div>
            </div>
        </div>

        {/* Price and Cart Section */}
        <div className={`${styles.optionsSection} ${styles.priceSection}`}>
          <p className={styles.priceText}>
            Total Price: <span className={styles.priceAmount}>2500kr</span>
          </p>
          <button
            className={styles.addToCartButton}
            onClick={() => console.log('Add to cart:', selections)}
          >
            Add to Cart
            <ChevronRightIcon className={styles.addToCartIcon} />
          </button>
        </div>
      </div>

    </div>
  );
}
