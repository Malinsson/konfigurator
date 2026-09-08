import styles from './Button.module.css'
// Props:
// `buttonName` (string): visible label
// `buttonColor` (string): maps to CSS color classes (e.g. `gold`, `silver`)
// `variant` (string): maps to variant/modifier classes (e.g. `circleOutline`)
// `ariaLabel` (string): accessible label for screen readers
// `type` ("button" | "submit" | "reset"): button type, defaults to "button"
// `...buttonProps`: any other native button props (onClick, disabled, title, data-*) are forwarded

interface ButtonProps {
  buttonName: string;
  buttonColor: string;
  variant: string;
  //   iconSrc?: string | undefined;
  //   iconLeft?: boolean; || removing icon code for now, can add later if needed
  ariaLabel: string;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}

export default function Button({
  buttonName,
  buttonColor,
  variant,
  ariaLabel,
  type = "button",
  ...buttonProps
}: ButtonProps) {

    const colorClass = buttonColor ? (styles[buttonColor] ?? "") : "";
    const variantClass = variant ? (styles[variant] ?? "") : "";
    // const textClass = variant ? (styles[`${variant}Text`] ?? "") : ""; || textClass used for different fonts for text if needed. 
    // const icons = { arrowRight, arrowRightWhite, checkmark, arrow45, profileIcon }; || add back in with relevant icons if needed

    // let icon;
    // if (iconSrc) {
    //     icon =
    //     typeof iconSrc === "string" && icons[iconSrc] ? icons[iconSrc] : iconSrc;
    // } || add back in later if needed

    // ${icon ? (iconLeft ? styles.hasIconLeft : styles.hasIconRight) : ""} || add back in after ${styles.button} if needed
  return (
    <button
      {...buttonProps}
      className={`${styles.button} ${colorClass} ${variantClass}`.trim()}
      type={type}
      aria-label={ariaLabel}
    >
      {buttonName}
    </button>
  )
}

/* Use Cases:

   Gold button:
   <Button buttonName="Claim Prize" buttonColor="gold" onClick={handleClaim} />

   Silver button:
   <Button buttonName="Skip" buttonColor="silver" onClick={handleSkip} />

   Circle outline button (icon or symbol):
   <Button buttonName="✓" variant="circleOutline" ariaLabel="Confirm" onClick={handleConfirm} />

   Combine color + variant:
   <Button buttonName="+" buttonColor="gold" variant="circleOutline" ariaLabel="Add" />
*/

