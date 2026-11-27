import { useState } from 'react'

const emptyForm = { type: '', category: '', amount: '' }
const typeLabels = { income: '수입', expense: '지출' }
const amountFormat = new Intl.NumberFormat('ko-KR') // 숫자를 어떻게 표현할 것인지 방식 정하기

// 등록한 금액을 받아와 금액+원으로 반환하는 함수
function formatAmount(amount) {
  return `${amountFormat.format(amount)}원` // 변환하기
}

// 등록 중에 작성하는 금액을 받아와 뒤에서 세번째 자리마다 ','를 붙이는 함수
// amountFormat : 못 쓰는 이유는 소수점이 붙으면 없애버리기 때문에 이에 맞는 경고를 띄울 수 없기 때문임
function formatAmountInput(value) {
  return value.replaceAll(',', '').replace(/^[+-]?\d+/, (digits) =>
    digits.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  )
}

function BudgetTracker() {
  // state
  const [transactions, setTransactions] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('')

  const category = form.category.trim()
  const rawAmount = form.amount.replaceAll(',', '')
  const amount = Number(rawAmount)
  let amountError = ''
  if (/^-?(?:\d+\.\d*|\.\d+)$/.test(rawAmount)) {
    amountError = '정수로 입력해주세요'
  } else if (rawAmount && !/^-?\d+$/.test(rawAmount)) {
    amountError = '금액은 숫자로 입력해 주세요.'
  } else if (rawAmount && amount <= 0) {
    amountError = '금액은 0보다 커야 해요.'
  } else if (rawAmount && !Number.isSafeInteger(amount)) {
    amountError = '입력한 금액이 너무 커서 등록할 수 없어요.'
  }
  const canSubmit =
    Object.hasOwn(typeLabels, form.type) &&
    category !== '' &&
    rawAmount !== '' &&
    amountError === ''

  const categories = [...new Set(transactions.map(({ category }) => category))]
  const selectedCategory = categories.includes(categoryFilter) ? categoryFilter : ''
  const visibleTransactions = transactions.filter(
    (transaction) =>
      (typeFilter === 'all' || transaction.type === typeFilter) &&
      (!selectedCategory || transaction.category === selectedCategory),
  )

  const { income, expense } = transactions.reduce(
    (totals, { type, amount }) => ({
      ...totals,
      [type]: totals[type] + amount,
    }),
    { income: 0, expense: 0 },
  )
  const balance = income - expense

  function handleChange(event) {
    const { name, value } = event.target
    const nextValue = name === 'amount' ? formatAmountInput(value) : value
    setForm((current) => ({ ...current, [name]: nextValue }))
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit) return

    if (editingId === null) {
      const registeredAt = Date.now()
      setTransactions((current) => {
        const maxId = current.reduce((max, transaction) => Math.max(max, transaction.id), 0)
        const id = Math.max(registeredAt, maxId + 1)
        const transaction = { id, type: form.type, category, amount }
        return [...current, transaction]
      })
    } else {
      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === editingId
            ? { ...transaction, type: form.type, category, amount }
            : transaction,
        ),
      )
    }
    resetForm()
  }

  function handleEdit({ id, type, category, amount }) {
    setEditingId(id)
    setForm({ type, category, amount: formatAmountInput(String(amount)) })
  }

  function handleDelete(id) {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
    if (id === editingId) resetForm()
  }

  return (
    <section>
      <h2>예산 관리</h2>
      <p>
        총수입 <strong>{formatAmount(income)}</strong> · 총지출{' '}
        <strong>{formatAmount(expense)}</strong> · 잔액 <strong>{formatAmount(balance)}</strong>
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 8 }}
      >
        <label>
          유형{' '}
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="">유형 선택</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
          </select>
        </label>
        <label>
          카테고리{' '}
          <input name="category" value={form.category} onChange={handleChange} required />
        </label>
        <label>
          금액{' '}
          <input
            type="text"
            name="amount"
            inputMode="numeric"
            value={form.amount}
            onChange={handleChange}
            aria-invalid={Boolean(amountError)}
            aria-describedby={amountError ? 'budget-amount-error' : undefined}
            required
          />
          {amountError && (
            <small id="budget-amount-error" style={{ display: 'block', color: 'crimson' }}>
              {amountError}
            </small>
          )}
        </label>
        <button type="submit" disabled={!canSubmit}>
          {editingId === null ? '등록' : '수정 저장'}
        </button>
        {editingId !== null && (
          <button type="button" onClick={resetForm}>수정 취소</button>
        )}
      </form>

      <h3>거래 내역</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <label>
          유형 필터{' '}
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="all">전체</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
          </select>
        </label>
        <label>
          카테고리 필터{' '}
          <select
            value={selectedCategory}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="">전체</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      {visibleTransactions.length === 0 ? (
        <p>표시할 거래가 없습니다.</p>
      ) : (
        <ul>
          {visibleTransactions.map((transaction) => (
            <li key={transaction.id} style={{ marginBottom: 8 }}>
              {typeLabels[transaction.type]} · {transaction.category} ·{' '}
              {formatAmount(transaction.amount)}{' '}
              <button type="button" onClick={() => handleEdit(transaction)}>수정</button>{' '}
              <button type="button" onClick={() => handleDelete(transaction.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function MyTodo() {
  return <BudgetTracker />
}
