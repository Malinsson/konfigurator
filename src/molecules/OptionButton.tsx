import { type OptionButtonProps } from '../components/Configurator/types';
import styles from './OptionButton.module.css';

/**
 * OptionButton Component
 *
 * A circular button for selecting options in the configurator.
 * No text display - styled with background colors/images based on option type.
 *
 * Props:
 * - label: Used for accessibility (aria-label), not displayed as text
 * - isSelected: Whether this option is currently selected
 * - onClick: Callback when the button is clicked
 *
 * Styling variants handled via CSS classes based on context:
 * - Material options: background images from assets/materials
 * - Color options: background fills using CSS variables (--gold, --silver, --black, --brown, --west-fill, --white)
 *
 * Usage:
 * <OptionButton
 *   label="Gold Metal"
 *   isSelected={selections.band.type === 'gold'}
 *   onClick={() => updateBandSelection('metal', 'gold')}
 * />
 */

interface OptionButtonWithClassProps extends OptionButtonProps {
  cssClass?: string;
}

export default function OptionButton({ label, isSelected, onClick, cssClass }: OptionButtonWithClassProps) {
  return (
    <button
      className={`${styles.button} ${cssClass || ''} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      aria-label={label}
      aria-pressed={isSelected}
      type="button"
    />
  );
}