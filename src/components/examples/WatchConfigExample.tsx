import { useWatchConfig } from '../../context/WatchConfigContext';

/**
 * EXAMPLE: How to use the WatchConfigContext in your components
 *
 * This shows you:
 * 1. How to import the hook
 * 2. How to access data from the context
 * 3. How to call the action functions
 *
 * Delete this file once you understand the pattern!
 */

export function WatchConfigExample() {
  // Step 1: Get the context using the custom hook
  const { currentStep, selections, isStarted, updateBandSelection, goToNextStep } = useWatchConfig();

  return (
    <div style={{ padding: '20px', border: '1px solid blue' }}>
      <h2>Watch Config Example</h2>

      {/* Show current state */}
      <p>Current Step: <strong>{currentStep}</strong></p>
      <p>Is Started: <strong>{isStarted ? 'Yes' : 'No'}</strong></p>

      {/* Show current selections */}
      <h3>Current Selections:</h3>
      <pre style={{ background: '#f0f0f0', padding: '10px' }}>
        {JSON.stringify(selections, null, 2)}
      </pre>

      {/* Example: Update band selection */}
      <h3>Band Selection Buttons:</h3>
      <button onClick={() => updateBandSelection('steel', 'gold')}>
        Select Gold Steel
      </button>
      <button onClick={() => updateBandSelection('leather', 'brown')}>
        Select Brown Leather
      </button>

      {/* Example: Navigation */}
      <h3>Navigation:</h3>
      <button onClick={goToNextStep} style={{ padding: '10px 20px' }}>
        Go to Next Step →
      </button>

      {/* Show what band is selected */}
      {selections.band.category && (
        <p style={{ color: 'green' }}>
          ✓ Selected: {selections.band.type} {selections.band.category}
        </p>
      )}
    </div>
  );
}
