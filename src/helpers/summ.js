export default function Summ(data) {
  let summ = 0;
  if (data) {
    data.forEach(({ meter }) => {
      summ += meter; // Qiymatni umumiy qiymatga qo'shish
    });
  }

  return summ;
}
