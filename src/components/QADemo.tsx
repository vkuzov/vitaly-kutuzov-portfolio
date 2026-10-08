import { useState } from 'react';
import { TargetArea } from './Effects';

const rubles = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;

export default function QADemo() {
  const [amount, setAmount] = useState(600);
  const [buggy, setBuggy] = useState(false);
  const free = buggy ? amount > 600 : amount >= 600;
  const delivery = free ? 0 : 150;
  const mismatch = buggy && amount === 600;
  return <TargetArea><div className="qa-demo">
    <div className="demo-top"><span className="eyebrow">ИНТЕРАКТИВНЫЙ ПРИМЕР</span><span className="demo-live">Можно менять значения</span></div>
    <fieldset className="amount-field"><legend>Сумма товаров</legend><div className="amount-options">
      {[599, 600, 601].map(value => <button key={value} type="button" aria-pressed={amount === value} onClick={() => setAmount(value)}>{rubles(value)}<small>{value === 599 ? 'до границы' : value === 600 ? 'на границе' : 'после границы'}</small></button>)}
    </div></fieldset>
    <div className="condition"><span>Условие бесплатной доставки</span><code>сумма {buggy ? '>' : '≥'} 600 ₽</code></div>
    <div className={`receipt ${mismatch ? 'receipt-error' : ''}`} role="status" aria-live="polite" aria-atomic="true">
      <div><span>Товары</span><strong>{rubles(amount)}</strong></div>
      <div><span>Доставка</span><strong className={free ? 'accent' : ''}>{rubles(delivery)}</strong></div>
      <div className="receipt-total"><span>Итого</span><strong>{rubles(amount + delivery)}</strong></div>
      <p className="receipt-status">{mismatch ? 'Обнаружено расхождение: ожидается доставка 0 ₽' : free ? 'Порог достигнут · доставка бесплатная' : 'До бесплатной доставки не хватает 1 ₽'}</p>
    </div>
    <label className="bug-toggle"><input type="checkbox" checked={buggy} onChange={e => setBuggy(e.target.checked)} /><span>Показать искусственную ошибку «больше 600»</span></label>
    <p className="fine-print">Учебные данные, не актуальные тарифы кафе. Ошибка придумана для демонстрации и не является найденным дефектом Starfood.</p>
    <details><summary>Почему проверяю три значения?<span aria-hidden="true">+</span></summary><div className="details-body"><p>Граничные значения помогают заметить разницу между «больше» и «не меньше». Одного значения выше порога недостаточно.</p><ul><li>599 ₽ → доставка 150 ₽, итог 749 ₽.</li><li>600 ₽ → доставка 0 ₽, итог 600 ₽.</li><li>601 ₽ → доставка 0 ₽, итог 601 ₽.</li></ul><p>Искусственное условие «больше 600» ошибается ровно на границе: начисляет 150 ₽ доставки при сумме 600 ₽.</p></div></details>
  </div></TargetArea>;
}
