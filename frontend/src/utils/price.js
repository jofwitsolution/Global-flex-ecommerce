export function percentageReduction(originalPrice, discountPrice) {
  if (originalPrice > discountPrice) {
    let value = originalPrice - discountPrice;
    value = Math.round((value / originalPrice) * 100);

    return `-${value}%`;
  }

  return null;
}
