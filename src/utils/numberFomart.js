const numberFormat = (number) => parseFloat(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
export default numberFormat;