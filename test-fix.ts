// Simple test to verify the fix for the toggleForm function

import { useTimeEntries } from './client/src/hooks/useTimeEntries';

// Mock React hook environment
global.React = {
  useState: (initialValue: any) => [initialValue, jest.fn()]
};

// Test that the hook correctly returns the toggleForm function
function testTimeEntriesHook() {
  const { isFormOpen, toggleForm } = useTimeEntries();
  
  console.log('isFormOpen:', isFormOpen);
  console.log('toggleForm type:', typeof toggleForm);
  
  if (typeof toggleForm === 'function') {
    console.log('✅ toggleForm is correctly defined as a function');
    return true;
  } else {
    console.error('❌ toggleForm is not a function!');
    return false;
  }
}

// Run the test
testTimeEntriesHook(); 