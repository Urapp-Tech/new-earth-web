export const formatNumberWithCommas = (number: number | any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  type SortOrder = 'asc' | 'desc';
  export function sortArrayByKey<T>(
    arr: T[],
    key: keyof T,
    order: SortOrder = 'asc'
  ): T[] {
    try {
      if (
        !Array.isArray(arr) ||
        typeof key !== 'string' ||
        !['asc', 'desc'].includes(order)
      ) {
        return Array.isArray(arr) ? arr : [];
      }
  
      return arr.slice().sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
  
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }
  
        const aStr = String(aValue);
        const bStr = String(bValue);
  
        // Extract numbers from strings like "Day 01"
        const aNum = parseInt(aStr.match(/\d+/)?.[0] || '0', 10);
        const bNum = parseInt(bStr.match(/\d+/)?.[0] || '0', 10);
  
        if (order === 'asc') {
          return aNum - bNum;
        }
        return bNum - aNum;
      });
    } catch (error) {
      console.error('An error occurred while sorting:', error);
      return arr;
    }
  }
  