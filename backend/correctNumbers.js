// Generate two correct numbers based on the current date
function getCorrectNumbers() {
    const today = new Date().toDateString();
    const hash = hashCode(today);
    const num1 = (hash % 100) + 1;
    const num2 = ((hash >> 8) % 100) + 1;
  
    // Ensure numbers are between 1 and 100 and not the same
    const correctNumbers = [num1, num2 === num1 ? (num2 + 1) % 100 + 1 : num2];
    return correctNumbers;
  }
  
  // Simple hash function for strings
  function hashCode(str) {
    let hash = 0,
      i,
      chr;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32-bit integer
    }
    return hash;
  }
  
  module.exports = getCorrectNumbers();
  
