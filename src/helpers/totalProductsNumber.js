export default function countProductWordForms(totalAmount) {
  if (
    String(totalAmount) === '11'
    || String(totalAmount) === '12'
    || String(totalAmount) === '13'
    || String(totalAmount) === '14'
  ) {
    return `${totalAmount} товаров`;
  }
  if (String(totalAmount).endsWith('1')) {
    return `${totalAmount} товар`;
  }

  if (
    String(totalAmount).endsWith('2')
    || String(totalAmount).endsWith('3')
    || String(totalAmount).endsWith('4')
  ) {
    return `${totalAmount} товара`;
  }
  if (totalAmount === 0) {
    return 'Список товаров пуст';
  }
  return `${totalAmount} товаров`;
}
