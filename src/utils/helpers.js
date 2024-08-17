let num = 1;
const generateCode = (type) => {
  const formattedNum = String(num).padStart(2, "0");
  const code = `${type}${formattedNum}`;

  num += 1; // Tăng giá trị của num cho lần gọi tiếp theo

  return code; // Trả về mã đã tạo
};
module.exports = { generateCode };
