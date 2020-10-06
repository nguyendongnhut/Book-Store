const Price = function number_to_price(v) {
  if (v == 0) {
    return "0,00";
  }
  v = parseFloat(v);
  v = v.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  v = v.split(".").join("*").split(",").join(".").split("*").join(",");
  return v;
};

export { Price };
