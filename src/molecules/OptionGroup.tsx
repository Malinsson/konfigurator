import { type Option } from '../components/Configurator/types';
import OptionButton from './OptionButton';
import styles from './OptionGroup.module.css';

/**
 * OptionGroup Component
 *
 * Displays a group of selectable options with an optional label.
 *
 * Props:
 * - label: Title for the option group (e.g., "Material", "Color")
 * - options: Array of Option objects to display
 * - currentSelection: Currently selected option id
 * - onSelect: Callback when an option is selected, receives the selected option id
 * - cssClassPrefix: (optional) Prefix for CSS classes applied to buttons
 *
 * Usage:
 * <OptionGroup
 *   label="Material"
 *   options={BAND_OPTIONS.options}
 *   currentSelection={selectedCategory}
 *   onSelect={handleMaterialSelect}
 *   cssClassPrefix=""
 * />
 */

interface OptionGroupProps {
  label: string;
  options: Option[];
  currentSelection?: string | null;
  onSelect: (selection: string) => void;
  cssClassPrefix?: string;
}

export default function OptionGroup({
  label,
  options,
  currentSelection,
  onSelect,
  cssClassPrefix,
}: OptionGroupProps) {
  const handleOptionSelect = (optionId: string) => {
    onSelect(optionId);
  };

  // Get the label of the currently selected option for subtext
  const selectedOptionLabel = options.find(
    (opt: Option) => opt.id === currentSelection
  )?.label;

  return (
    <fieldset className={styles.container}>
      <legend className={styles.label}>{label}</legend>
      {selectedOptionLabel && (
        <span className={styles.subtext}>{selectedOptionLabel}</span>
      )}

      <div className={styles.optionsGrid}>
        {options.map((option: Option) => {
          const isSelected = option.id === currentSelection;

          // Build CSS class name for styling (e.g., "steel-silver", "leather-black")
          const cssClass = cssClassPrefix
            ? `${cssClassPrefix}-${option.id}`
            : option.id;

          return (
            <div key={option.id} className={styles.optionButtonWrapper}>
              <OptionButton
                label={option.label}
                isSelected={isSelected}
                onClick={() => handleOptionSelect(option.id)}
                cssClass={cssClass}
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
